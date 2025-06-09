---
title: Claude Code
description: Anthropic의 클로드 코드 잠깐 사용해본 후기
id: 993
createdAt: 2022-03-19
---

먼저 가장 중요한 점: 돈이 많이 든다. `/init` 명령(클로드가 사용할 코드베이스 요약 생성) 세 번 했는데 약 0.5달러가 나갔다. 클로드 맥스(월 100달러)나 프로(월 9달러)를 구독하면 클로드 코드를 가성비 좋게 이용할 수 있다(고 한다).

설치는 매우 간단하다.

```bash
npm i -g @anthropic-ai/claude-code
```

끝. 이제 `claude`로 실행한다.

```bash
╭───────────────────────────────────────────────────╮
│ ✻ Welcome to Claude Code!                         │
│                                                   │
│   /help for help, /status for your current setup  │
│                                                   │
│   cwd: /Users/jaewoo/coding/jw-portfolio          │
╰───────────────────────────────────────────────────╯
```

CLI인데 상당히 디자인에 공을 들였다. `/init`을 실행해서 코드베이스 요약을 만들면, 앞으로 클로드가 참고할 수 있다.

```
> /init is analyzing your codebase…

⏺ I'll analyze the codebase and create a CLAUDE.md file with the essential
  information for future Claude Code instances.

⏺ Read(README.md)
  ⎿  Read 49 lines (ctrl+r to expand)

⏺ Read(package.json)
  ⎿  Read 21 lines (ctrl+r to expand)

⏺ Read(astro.config.mjs)
  ⎿  Read 9 lines (ctrl+r to expand)

⏺ Read(vitest.config.ts)
  ⎿  Read 9 lines (ctrl+r to expand)

⏺ Read(src/pages/index.astro)
  ⎿  Read 26 lines (ctrl+r to expand)

⏺ Read(src/layouts/Layout.astro)
  ⎿  Read 14 lines (ctrl+r to expand)

⏺ Read(src/__tests__/index.test.ts)
  ⎿  Read 11 lines (ctrl+r to expand)

⏺ Read(src/styles/global.css)
  ⎿  Read 108 lines (ctrl+r to expand)

⏺ Write(CLAUDE.md)
  ⎿  Wrote 54 lines to CLAUDE.md
     # CLAUDE.md
     This file provides guidance to Claude Code (claude.ai/code) when working
     with code in this repository.
     ## Project Overview
     This is a (프로젝트 설명. 편집함.)
     ## Technology Stack
     … +44 lines (ctrl+r to expand)

⏺ Created CLAUDE.md with (프로젝트 요약).
```

이제 클로드 코드가 실행될 때마다 CLAUDE.md를 참고할 것이다. 이 문서는 프로젝트 구조 요약이므로 개발자가 읽어보기에도 좋다.

```
⏺ Update Todos
  ⎿  ☐ Add component rendering tests for all main components
     ☐ Add layout and accessibility tests
     ☐ Add UI component tests (H2)
     ☐ Add content validation tests
```
테스트를 추가하라고 하니까 TODO 목록을 만들어서 하나씩 실행하기 시작했다.

```

✻ Thinking…

  Now I'll create content validation tests to ensure key information is present
  and correctly formatted.

⏺ Write(src/__tests__/content.test.ts)

╭─────────────────────────────────────────────────────────────────────────────────╮
│ Create file                                                                     │
│ ╭─────────────────────────────────────────────────────────────────────────────╮ │
│ │ src/__tests__/content.test.ts                                               │ │
│ │                                                                             │ │
│ │ import { experimental_AstroContainer as AstroContainer } from               │ │
│ │ "astro/container";                                                          │ │
│ │ import { test, expect } from "vitest";                                      │ │
│ │                                                                             │ │
│ │ import Index from "../pages/index.astro";                                   │ │
│ │ import Info from "../components/Info.astro";                                │ │
│ │                                                                             │ │
│ │ test("메인 페이지 GitHub 링크 유효성", async () => {                        │ │
│ │   const container = await AstroContainer.create();                          │ │
│ │   const result = await container.renderToString(Index);                     │ │
│ │                                                                             │ │
│ │   expect(result).toContain("https://github.com/plastic041");                │ │
│ │   expect(result).toMatch(/href="https:\/\/github\.com\/plastic041"/g);      │ │
│ │ });                                                                         │ │
│ │                                                                             │ │
│ ╰─────────────────────────────────────────────────────────────────────────────╯ │
│ Do you want to create content.test.ts?                                          │
│ ❯ 1. Yes                                                                        │
│   2. Yes, and don't ask again this session (shift+tab)                          │
│   3. No, and tell Claude what to do differently (esc)                           │
│                                                                                 │
╰─────────────────────────────────────────────────────────────────────────────────╯
```

내용 변경이나 셸 명령 실행 전에 미리 물어본다. 

```
Total cost:            $0.4789
Total duration (API):  5m 16.8s
Total duration (wall): 17m 22.5s
Total code changes:    229 lines added, 1 line removed
Token usage by model:
    claude-3-5-haiku:  18.4k input, 750 output, 0 cache read, 0 cache write
       claude-sonnet:  197 input, 7.6k output, 489.9k cache read, 53.0k cache write
```

Ctrl+C를 두 번 눌러 종료하면 통계가 나온다. 몇 번 안 했는데 0.5달러를 썼다. 캐시 사용이 많으니, 사용할 거면 오래 사용하는 것이 가성비가 좋을 것 같다(캐시는 처음 쓸 때만 비싸고, 이후 사용할 때는 매우 싸다).
