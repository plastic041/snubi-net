---
title: Tanstack Router
description: 라우터에 있어야 할 것들이 다 있다
id: 1381
createdAt: 2024-01-04
---

Next.js + Vercel에서 캐시 invalidate 문제가 계속 발생해서 Vite로 바꿨다. 평소처럼 간단하게 [Wouter](https://github.com/molefrog/wouter)를 쓰려다가 Tanstack Router 추천 글을 보고 한번 써보기로 했다. 

[TanStack Router | React Router, Solid Router, Svelte Router, Vue Router](https://tanstack.com/router/v1)

## API

특이하다. 라우팅 주소마다 객체를 만든 뒤 route tree에 합쳐준다. router object 하나에 모든 router를 설정하던 React Router나 jsx만 사용하던 Wouter에 비해 새롭다.

```tsx
const rootRoute = new RootRoute({
  component: () => (
    <>
	  <Link to="/" className="[&.active]:font-bold">
	    Home
	  </Link>
      <Outlet /> // 하위 루트를 렌더링하는 위치
    </>
  ),
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute, // 상위 루트를 지정해야 함.
  path: '/',
  component: function Index() {
    return (
      <h3>Welcome Home!</h3>
    )
  },
})

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute])

const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
```

가장 좋고 새로운 건 마지막의 타입 처리다. Next.js(`getserversideprops`)든, React Router든 loader는 있는데 정작 props나 `useLoaderData` 에서 타입 처리가 자동으로 안 돼서 assert를 해줘야 했다. 하지만 Tanstack Router는 라우터에서 사용하는 모든 타입이 자동으로 처리된다. 게다가 라이브러리의 타입에 주입하므로 `router` 객체에 직접 접근하지 않는 `useParams` 같은 함수에서도 타입 검사가 지원된다.

![`@tanstack/react-router`에서 import한 `Link` 컴포넌트에서도 타입 검사가 지원됨.](https://github.com/plastic041/snubi-net/assets/17811025/04f426c8-584f-4386-b342-a8244ba273b4)
`@tanstack/react-router`에서 import한 `Link` 컴포넌트에서도 타입 검사를 지원하는 모습.

## 데이터 불러오기

`getServerSideProps`, `loader` 같은 페이지 데이터 로딩 기능이 당연히 있다.

```tsx
const postRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/$id', // $id로 동적 루트를 만든다.
  component: PostPage,
    loader: async ({
      params: { id }, // id가 자동완성된다. 넘 편함
      abortController,
    }) => {
      const post = await fetch(...);
      return { post }
      
      // 기본적으로 loader의 promise가 resolve된 후 페이지가 렌더된다.
      // 페이지를 먼저 렌더하려면 defer를 사용해 promise를 반환해야 한다.
      // import { defer } from "@tanstack/react-router";
      // return { postPromise: defer(post) }
    }
})

function PostPage() {
  const { post } = postRoute.useLoaderData(); // 여기도 post가 자동완성된다
  return <p>{post}</p>;
  
  // import { Suspense } from "react"; // defer를 사용할 때
  // import { Await } from "@tanstack/react-router";
  // const { postPromise } = postRoute.useLoaderData(); 
  // return (
  //   <Suspense fallback={<span>loading...</span>}>
  //     <Await promise={postPromise}>
  //       {(post) => <p>{post}</p>}
  //     </Await>
  //   </Suspense>
  // )
}
```

search parameter를 사용하려면 `loaderDeps`에 `loader`와 관련된 search parameters를 직접 정의해야 한다. 모든 search parameter가 데이터와 관련있지는 않기 때문에 이렇게 api를 만들었다고 한다.

## 마치며

search parameter를 zod나 valibot을 써 검증하는 등 좋은 기능이 많다. 다만 `useLoaderData()`에 대한 설명이 없는 등 문서가 아직 부족한 감이 있다. 1.0이 나온지 얼마 안 돼서 그런 듯. React Router가 사실상 React의 모든 라우터를 지배하고 있는 라우터 생태계에 아주 좋은 라이브러리가 등장해서 너무 좋다. 아무리 문서가 부실해도 React Router 문서보다 3000배는 낫기도 하고…
