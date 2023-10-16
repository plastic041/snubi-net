---
title: Tauri + sqlite + diesel + r2d2 pool
description: 데스크탑 앱 개발 프레임워크 tauri와 rust ORM diesel을 r2d2 pool과 함께 사용하는 방법을 정리했다.
id: 136
createdAt: 2022-03-19
---

데스크탑 앱 개발 프레임워크 [tauri](https://tauri.app/)와 rust ORM [diesel](https://diesel.rs/)을 r2d2 pool과 함께 사용하는 방법을 정리했다. 로컬 db로 사용하기 위해서 sqlite를 사용했지만 다른 db에도 적용 가능할 것이다.

## Tauri 프로젝트 생성

`yarn create tauri-app` 을 사용해 프로젝트를 생성했다. `cargo create-tauri-app` 으로 생성하면 웹 프레임워크를 선택할 수 없고 vanilla js로만 만들어진다.

~~**주의:** `yarn create tauri-app` 의 `svelte` 나 `svelte-ts` 는 sveltekit이 아니라 그냥 svelte 프로젝트다. 그래서 `yarn create svelte@latest` 로 sveltekit 프로젝트를 생성하고 tauri를 따로 설치해주었다. 자세한 과정은 [tauri 문서](https://tauri.app/v1/guides/getting-started/setup/sveltekit)에 설명되어 있다.~~

[2022년 10월 5일부터 create-tauri-app이 Sveltekit도 지원한다.](https://github.com/tauri-apps/create-tauri-app/pull/200) 그래서 `yarn create tauri-app`을 쓰면 된다.

## Diesel

diesel은 rust를 위한 ORM이다. sql에 알맞은 타입을 생성해주어 컴파일 타임에 sql 오류를 잡을 수 있다.

diesel이 sql에서 타입을 추론해야 하는 만큼 sql도 직접 작성해야 하고 migration도 해줘야 하고 diesel_cli도 설치해야 해서 과정이 꽤 복잡하다. sqlite dll 문제도 있어서 한참 헤맸다.

### diesel 설치

[https://crates.io/crates/diesel](https://crates.io/crates/diesel) 의 diesel crate를 `cargo.toml` 에 추가한다. 이때 `features` 에 `"sqlite"` 와 `"r2d2"` 를 명시해주어야 한다. 그리고 diesel이 사용할 `DATABASE_URL` 환경 변수를 설정해주어야 하므로 [dotenvy](https://crates.io/crates/dotenvy) 라이브러리도 설치해준다.

```toml
[dependencies]
# tauri, serde 등 tauri 프로젝트 생성하면 설치되는 라이브러리 생략
diesel = { version = "2.0.0", features = ["sqlite", "r2d2"] }
dotenvy = "0.15.5"
```

2022년 9월 기준 버전이다.

**r2d2** db 커넥션 풀 라이브러리. 요청이 들어올 때마다 db에 새로 연결하는 대신, 한 번만 연결해두고 그 연결을 반복해서 사용할 수 있도록 하는 것.. 정도로 이해하고 있다.

### diesel_cli 설치

diesel과는 별개로 sql을 rust 타입으로 바꾸기 위해서 diesel_cli를 설치해야 한다. 그런데 공식문서대로 `cargo install diesel` 를 실행해봤지만 계속 실패했다. sqlite만 설치하기 위해서 `cargo install diesel_cli --no-default-features --features sqlite` 도 해봤고 `choco install sqlite` 도 해봤지만 안 됐다.

[Installing diesel_cli on Windows : some assembly required · Issue #487 · diesel-rs/diesel](https://github.com/diesel-rs/diesel/issues/487#issuecomment-432136835)

그러다가 이 이슈를 발견했다. 결론은 `cargo install diesel_cli --no-default-features --features "sqlite-bundled"` 를 실행하면 된다. sqlite dll을 함께 다운로드하는 옵션이다.

## diesel 설정

이제 [공식문서](https://diesel.rs/guides/getting-started#setup-diesel-for-your-project)대로 진행하면 된다. 다만 주의할 점은 [sqlite는 primary key가 null일 수도 있다는 점](https://sqlite.org/lang_createtable.html#the_primary_key)이다. 이거 때문에 id가 `Option` 이 돼서 한참 헤맸다. 그러니 `id PRIMARY KEY NOT NULL` 이라고 써 줘야 한다.

`diesel migration run` 까지 공식문서를 따른다.

### `models.rs`

tauri와 통신하기 위해 `Serialize` 를 derive해야 한다.

```rust
use diesel::prelude::*;
use serde::Serialize;

#[derive(Queryable, Serialize)]
pub struct Post {
    pub id: i32,
    pub title: String,
}
```

### `establish_connection`

rd2d pool을 사용하기 위해서 다음과 같이 써야 한다.

```rust
// src-tauri/src/lib.rs

use diesel::r2d2::{ConnectionManager, Pool, PooledConnection};
use diesel::sqlite::SqliteConnection;
use dotenvy::dotenv;
use std::env;

pub mod models;
// src/models.rs를 공식문서대로 만들어준다
pub mod schema;

pub type SqlitePool = Pool<ConnectionManager<SqliteConnection>>;
pub type SqlitePooledConnection = PooledConnection<ConnectionManager<SqliteConnection>>;

pub fn establish_connection() -> SqlitePool {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let manager = ConnectionManager::<SqliteConnection>::new(&database_url);
    Pool::builder()
        .build(manager)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}
```

### `show_posts.rs`

tauri의 [managed state] 기능을 사용할 수 있도록 Pool을 사용한다.

```rust
use crate::models::Post; // src/models.rs
use crate::schema::posts::dsl::*; // src/schema.rs
use crate::SqlitePool; // src/lib.rs의 SqlitePool
use diesel::prelude::*;

#[tauri::command]
pub fn show_posts(state: tauri::State<SqlitePool>) -> Vec<Post> {
    posts
        .load::<Post>(&mut *state.get().unwrap()) // 이 부분이 다르다
        .expect("Error loading posts")
}
```

### `main.rs`

`manage` 를 통해 connection을 managed state로 만들어준다.

```rust
use app::posts::show_posts::show_posts; src/posts/show_posts.rs
use app::__cmd__show_posts; // src/posts/show_posts.rs에서 tauri::command 함수를 use 했더니 이렇게 됐다.
use app::establish_connection; // src/lib.rs

fn main() {
    let connection = establish_connection();
    tauri::Builder::default()
        .manage(connection) // 여기서 managed state로 만든다
        .invoke_handler(tauri::generate_handler![show_posts])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

이제 rust 부분은 끝났다.

## 프론트엔드에서 rust 호출

[tauri 공식문서](https://tauri.app/v1/guides/features/command#basic-example)대로 따라하면 된다. 예시는 svelte지만 react든 뭐든 거의 비슷할 것이다.

```tsx
let posts = [];
invoke('show_posts').then((res) => posts = res);
// {#await}을 사용하려면
// $: posts = invoke('show_posts'); 로 사용하면 된다

<ul>
	{each posts as post}
		<li>{post.title}</li>
	{/each}
</ul>
```

끝!
