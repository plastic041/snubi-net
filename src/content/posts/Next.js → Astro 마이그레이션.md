---
title: Next.js → Astro 마이그레이션
description: Next.js 13으로 만든 블로그를 Astro로 마이그레이션하기
id: 200
createdAt: 2023-10-16
---

[https://snubi-net.vercel.app](https://snubi-net.vercel.app/) 는 Next.js를 잘 써왔었는데, 크게 복잡하지 않은 사이트니 Astro를 써보는 것도 좋을 것 같아 바꿔봤다.

Astro는 기본적으로 SSG고, 선택적으로 페이지별 SSR을 적용할 수 있다. 또한 여러 웹 프레임워크를 붙여 쓸 수도 있다. 즉 조그만 기능 몇 개 붙은 블로그 만들기에 좋다. 

## 데이터 가져오기

Next.js의 App router와 비슷하게 Astro 컴포넌트에서 fetch를 사용할 수 있다. top level await도 지원한다.

```jsx
---
const resp = await fetch("....");
const { title } = await resp.json();
---

<h1>{title}</h1>
```

## 로컬 파일 읽기

아주 간단하게 소스 폴더 내의 여러 파일을 `Astro.glob()` API로 읽을 수 있다.

```jsx
---
const posts = await Astro.glob("../content/posts/*.md");
---

{posts.map(post => (
  <h2>{post.frontmatter.title}</h2>
)}
```
