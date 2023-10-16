---
title: Next.js 13 마이그레이션
description: Next.js 12로 만든 블로그를 Next.js 13의 App Route로 마이그레이션하기
id: 143
createdAt: 2022-03-20
---

기존 Next.js의 `pages` 기능으로 만든 블로그를 `App Route` 방식으로 마이그레이션했다.

사실은 Next.js@13.0.0이 나왔을 때 하려고 했는데, 그땐 나온지 얼마 되지 않아 버그가 많아서 하다가 그만뒀었다. Tailwind도 안 됐었고.

@13.2.4쯤 되니 슬슬 안정된 것 같아 마이그레이션을 시도했고, 버그를 좀 마주쳤긴 했지만 그럭저럭 해결할 수 있었다.

## 폴더 구조

```
기존 pages 폴더 방식은 파일명을 라우팅 주소로 사용했다.
pages\
  index.tsx           폴더명 주소에서 렌더링할 페이지. 이 경우는 / 주소에 매칭됨.
  _app.tsx            app 컴포넌트
  _document.tsx       document 컴포넌트(head를 수정할 때 썼다)
  works/
    destiny-card.tsx  /works/destiny-card
    index.tsx         /works 페이지
  works.tsx           /works 페이지(위의 works/index.tsx와 같은 기능. 둘 다 쓰면 오류)
  posts.tsx           /posts 페이지
  posts/
    [id].tsx          id를 갖는 동적 루트

같은 주소의 페이지를 works/index.tsx라고 쓸 수도 있고 works.tsx라고 쓸 수도 있다.

새로운 app 폴더 방식은 폴더명을 라우팅 주소로 사용한다.
app
  page.tsx            폴더명 주소에서 렌더링할 페이지.
  layout.tsx          폴더의 레이아웃. page.tsx를 children으로 받는다.
  not-found.tsx       notFound()를 실행하면 not-found 페이지를 보여준다.
  loading.tsx         page.tsx를 불러오는 중에 보여줄 컴포넌트
  header.tsx          컴포넌트. page나 layout 등 특별한 이름이 아닌 컴포넌트는
                        라우팅에서 제외되므로, page에서 import할 컴포넌트를
                        같은 폴더에 위치시킬 수 있다.
  works/
    destiny-card/
      page.tsx        /works/destiny-card 페이지
    page.tsx          /works 페이지
  posts/
    page.tsx          /posts 페이지
    [id]/
      page.tsx        id를 갖는 동적 루트

```

## 서버 컴포넌트

서버 컴포넌트는 서버에서 컴포넌트를 실행하고, 그 결과를 클라이언트에게 보내준다.

`app` 폴더 안의 `tsx` 파일들은 기본적으로 서버 컴포넌트로 취급된다.

### 클라이언트 컴포넌트를 사용해야 할 때

#### 주소 사용하기

서버에서 렌더링하므로, 클라이언트의 페이지 주소를 알 수는 없다. 따라서 주소를 가지고 뭘 하려면 클라이언트 컴포넌트로 전환해야 한다.

다행히 클라이언트 컴포넌트로 바꾸는 건 간단하다. 컴포넌트 `tsx` 파일 맨 윗줄에 `"use client";`만 적어주면 된다. strict mode를 쓸 때 `"use strict";`를 써주는 것처럼.

그러면 `next/navigation`에서 [`usePathname`](https://nextjs.org/docs/app/api-reference/functions/use-pathname) 이나 [`useRouter`](https://nextjs.org/docs/app/api-reference/functions/use-params) 를 import해서 쓸 수 있다. 나는 “작업” 과 “글” 중 어느 페이지에 접속하고 있는 지 표시하기 위해 `usePathname`을 사용했다.

#### state가 필요한 경우

서버 컴포넌트는 클라이언트 페이지의 state를 다룰 수 없다. 따라서 `useState`나 `useEffect`등 state hook이 필요할 때는 클라이언트 컴포넌트를 써야 한다.

#### 주의사항

서버 컴포넌트 안에서는 클라이언트 컴포넌트를 import해서 쓸 수 있지만, 클라이언트 컴포넌트 안에서 서버 컴포넌트를 import할 수는 없다. 그래서 클라이언트 컴포넌트 안에 서버 컴포넌트를 넣으려면, 클라이언트 컴포넌트에 `children`을 준 뒤 서버 컴포넌트에서 임포트해서 사용해야 한다.

```tsx
// client-component.jsx
"use client";

export function ClientComponent({ children }) {
  useEffect(() => ...);
  return <>{children}</>
}

// server-component.jsx
import { ClientComponent } from "./client-component";

function ServerComponent() {
  return (
    <ClientComponent>
      <h1>title</h1>
    </ClientComponent>
  )
}
```

@tanstack/react-query처럼 `Provider`로 앱 전체를 감싸줘야 하는 경우도 마찬가지다. provider는 클라이언트 컴포넌트이므로 별도의 파일을 만들고, `layout.tsx`에서 import해줘야 한다.

```tsx
// query-client-provider.jsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function Provider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

// layout.jsx
import { Provider } from "./query-client-provider";

function ServerComponent() {
  return (
    <Provider>
      <h1>title</h1>
    </Provider>
  );
}
```

## Revalidate

서버 렌더링 페이지나 서버 컴포넌트에서 데이터를 다시 fetch할 주기를 설정하는 것.

### `fetch`의 revalidate

`fetch` 의 revalidate 시간을 조정할 수 있다. Next.js는 자바스크립트 API인 `fetch`에 revalidate 기능을 추가한다.

```tsx
async function Component() {
  const response = await fetch(
    "https://example.com",
    {
      next: {
        revalidate: 초 단위 시간
      }
    }
  );
}
```

근데 `http status === 204` 이고 body가 없는 경우 에러가 발생한다. undici에서 빈 body를 제대로 처리하지 못하는 듯. 이것 때문에 스포티파이 api에서 현재 재생중인 음악 정보를 받아오는 데서 계속 에러가 났다. 결국 fetch 대신 [`got`](https://github.com/sindresorhus/got) 라이브러리를 사용했다.

### 페이지 단위 revalidate

`app` 폴더 내의 `page.tsx`에서 `export const revalidate = 초 단위 시간`을 써준다.

## 동적 라우팅

`[id]/page.tsx`라는 page는 `id: string`의 `params`를 가진다.

```tsx
export default async function Page({ params }: { params: { id: string } }) {
  const page = await getPage(params.id);
}
```

## 메타데이터

`page.tsx`에서 메타데이터를 넣어줄 수 있다.

### 정적 메타데이터

`export const metadata = {}`를 쓰면 된다.

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "제목",
  description: "설명입니다.",
  openGraph: {
    images: "https://example.com/example.png",
    url: `https://example.com/`,
  },
};
```

### 동적 메타데이터

`generateMetadata`를 쓰면 동적으로 메타데이터를 head에 넣어줄 수 있다. 위의 동적 라우팅처럼 `params`를 받는다.

```tsx
import { type Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const page = await getPage(params.id);

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      images: "https://example.com/example.png",
      url: `https://example.com/posts/${page.id}`,
    },
  };
};
```

## 마크다운

Next.js가 마크다운 기능을 지원하긴 하는데(https://nextjs.org/docs/app/building-your-application/configuring/mdx#remark-and-rehype-plugins), 폴더 내의 마크다운 파일들을 목록 형태로 불러오는 기능이 없어서 이것만으로는 마크다운 블로그를 만들기 어렵다.

따라서 깃허브의 issue로 글을 관리하기로 정했다. CMS를 써야 할 만큼 글이 많은 것도 아니고... `posts` label이 달린 글을 깃허브 api로 받아 보여주는 방식이다. 마크다운 파싱과 html 변환은 [`next-mdx-remote`](https://github.com/hashicorp/next-mdx-remote)를 사용하고 있다. 서버 컴포넌트를 지원한다.

~~플러그인으로는 `remark-gfm`과 `rehype-highlight`를 사용중이다. 원래는 [`remark-shiki-twoslash`](https://github.com/shikijs/twoslash/tree/main/packages/remark-shiki-twoslash)를 썼었는데, 오류가 나서 바꿨다.~~

~~플러그인 문제: 공식 beta 문서의 mdx에서는 `next.config.mjs`에서 `mdxRs: true`인 상태로 rehype, remark 플러그인을 쓸 수 있는 것처럼 쓰였다. 하지만 아직 mdxRs가 플러그인을 지원하지 않기 때문에 플러그인을 쓰려면 `mdxRs: false`로 설정해야 한다. 참고: https://github.com/vercel/next.js/issues/46659~~

## 2023-09-30 업데이트

1. unified 생태계가 대규모 업데이트되며 `remark-gfm`의 메이저 버전이 4.0.0으로 올라갔는데, `next-mdx-remote`가 아직 해당 버전을 지원하지 않아 오류가 발생한다. 그래서 3.0.1으로 고정해서 쓰고 있다. https://github.com/remarkjs/remark-gfm/issues/57
2. mdxRs가 플러그인을 지원하는 것 같다. https://github.com/vercel/next.js/issues/46659#issuecomment-1535794260
3. `rehype-highlight` 대신 [`rehype-shikiji`](https://github.com/antfu/shikiji/tree/main/packages/rehype-shikiji)를 써보고 있다.
