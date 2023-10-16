---
title: Next.js 13.4의 Server Actions
description: Next.js 13.4에 소개된 Server Actions 정리
id: 154
createdAt: 2022-05-07
---

2023년 5월 1일부터 5일간 진행된 [Vercel Ship](https://vercel.com/ship)에서 공개된 기능 중 하나. 1일 Vercel Postgres의 코드 예시에서 처음으로 등장했고 4일에 정식 공개되었다.

[Data Fetching: Server Actions | Next.js Using App Router Features available in /app nextjs.org](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)

## 소개

Next.js 13에서 App router가 도입되었다. App router 내에서는 서버 컴포넌트와 클라이언트 컴포넌트를 구별해서 사용한다. 그간 클라이언트 컴포넌트 내에서 서버 기능을 사용하기 위해서는 api route 파일(`route.ts`)에서 REST api를 만들고 그것과 통신하는 코드를 작성해야만 했다. Server Actions를 사용하면 그럴 필요 없이 서버 컴포넌트나 클라이언트 컴포넌트 내에서 fetch하는 코드를 작성하고 호출할 수 있다.

Vercel이 React 개발에 너무 관여하는 것 아니냐는 비판도 있지만, 개인적으로는 클라이언트에서 Node.js API 사용이 간단해져서 좋다.

`<form>`을 submit할 때 사용하는 것을 중점으로 두고 있지만 form이 아닌 일반 button의 `onClick`에서도 사용할 수는 있다. 그러나 자바스크립트가 로드(하이드레이션)되지 않았을 때는 작동하지 않으므로 주의해야 한다.

2023년 5월 7일 기준 알파 상태이므로 `next.config.js`에서 `serverActions` 플래그를 활성화해줘야 사용할 수 있다.

## 생성

```ts
async function myAction() {
  "use server";
  // 서버 코드 작성.
  // 서버 컴포넌트 내에서 사용하는 경우
}

// 혹은

("use server");

export async function myAction() {
  // 서버 코드 작성.
  // 클라이언트 컴포넌트 내에서 사용해야 할 경우
}
```

## 호출

### `action`

`<form>` 태그의 `action` 프로퍼티에 함수를 넘겨준다. 함수는 form이 submit될 때 실행된다.

```tsx
<form action={serverAction}> ... </form>
```

### `formAction`

`<button type="submit" />`, `<input type="submit" />`, `<input type="image" />` 등에 사용. 마찬가지로 form이 submit될 때 실행되나 해당 버튼이 눌릴 때 실행된다(세 태그 모두 `onsubmit` 이벤트를 호출한다).

### `startTransition`

form을 사용하지 않고 서버 액션을 호출하고 싶을 때 사용한다. 그러나 페이지에서 자바스크립트 파일을 불러오기 전에는 실행되지 않으므로 주의해야 한다. 즉 하이드레이션이 완전히 끝나야 함수를 호출할 수 있다.

서버 데이터를 사용하는 페이지에서 `startTransition`을 사용한 경우, 페이지의 서버 데이터를 업데이트하도록 `revalidatePath`를 호출해야 한다.

```ts
// src/_components/client-component.tsx
"use client";

import { useTransition } from "react";
import { addItem } from "../_actions"; // 서버 액션

function ClientComponent({ id }) {
  let [isPending, startTransition] = useTransition();

  return <div onClick={() => startTransition(addItem(id))}>Add To Cart</div>;
}
```

```ts
// src/_actions.ts
"use server";

async function addItem(id) {
  await addItemToDb(id);
  revalidatePath(`/product/${id}`);
  // `/product/[id]` 페이지의 데이터를 업데이트한다
}
```

### 서버 데이터를 업데이트할 필요가 없는 경우

서버 데이터를 업데이트할 필요가 없다면, `startTransition`을 사용할 필요 없이 함수를 컴포넌트의 props로 넘겨서 실행할 수 있다.

```ts
// src/[id]/page.tsx
import { LikeButton } from "./like-button";

export default function Page({ params }) {
  async function like() {
    "use server";
    await db.update(params.id);
  }

  return <LikeButton like={like} />;
}
```

```ts
// src/[id]/like-button.tsx
export function LikeButton({ like }) {
  return (
    <button
      onClick={async () => {
        await like();
      }}
    >
      Like
    </button>
  );
}
```

## 클라이언트 헤더

호출한 클라이언트의 헤더 정보를 알 수 있다.

```ts
import { cookies } from "next/headers";

async function addItem(data) {
  "use server";

  const cartId = cookies().get("cartId")?.value;
  // 헤더 읽기

  await saveToDb({ cartId, data });

  cookies().set("cartId", cart.id);
  // 헤더 쓰기
}
```

옵티미스틱 UI를 위한 `useOptimistic`, `<form>`의 데이터 전송 중 상태를 가져오는 `useFormStatus` 등도 소개되었으나 둘은 아직 experimental 단계이므로 지금 소개하는 것은 이른 것 같다. 옵티미스틱 UI에 꼭 필요한 '실패 시 행동'이 아직 없는 것 같다. [Experimental Features 링크](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#enhancements)
