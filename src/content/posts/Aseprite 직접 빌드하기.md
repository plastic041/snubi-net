---
title: 'Aseprite 직접 빌드하기'
description: '오픈소스 프로그램인 Aseprite를 직접 빌드하는 방법'
id: 21283
createdAt: 2021-08-20
---

참조 링크: [https://github.com/aseprite/aseprite/blob/main/INSTALL.md](https://github.com/aseprite/aseprite/blob/main/INSTALL.md)

[**Aeprite**](https://www.aseprite.org)는 픽셀 아트를 그리는 프로그램으로, [스팀](https://store.steampowered.com/app/431730/Aseprite)에서 20,500원에 판매하고 있습니다. 2001년 ASE(Allegro Sprite Editor)라는 이름으로 공개되어 20년 동안 오픈 소스로 개발되고 있습니다. 오픈 소스 프로그램이므로 직접 빌드해서 사용할 수 있으며 빌드한 Aseprite는 판매되는 Aseprite와 똑같이 개인적/상업적 용도 모두에 사용할 수 있습니다([Aseprite fnq](https://www.aseprite.org/faq/#can-i-sell-graphics-created-with-aseprite)). 빌드한 Asprite를 재배포(redistribute)하는 것만 금지됩니다.

이 글에서는 윈도우10에서 Aseprite를 빌드하는 방법에 대해 다룹니다. 맥과 리눅스는 링크를 참조하시기 바랍니다.

## 소스 코드와 라이브러리 다운로드

1. 소스 코드 다운로드

  - git이 설치된 경우 `git clone --recursive https://github.com/aseprite/aseprite.git`

  - git이 설치되지 않은 경우 [Release 페이지](https://github.com/aseprite/aseprite/releases/)에서 최신 소스 파일을 다운로드

2. [cmake](https://cmake.org) 설치

3. [ninja](https://ninja-build.org) 설치 (3.14버전 이상)

4. [skia 라이브러리](https://github.com/aseprite/skia/releases/) 다운로드. 직접 빌드할 필요는 없고, Aseprite 제작자가 미리 빌드해놓았으니 다운로드만 받으면 됩니다.

5. [비주얼 스튜디오 커뮤니티 2022](https://visualstudio.microsoft.com/vs/community/) 설치

6. Visual Studio Community 2022 Installer에서 **C++을 사용한 데스크톱 개발**을 설치([https://imgur.com/a/7zs51IT](https://imgur.com/a/7zs51IT))

## 빌드

1. 1-1에서 다운로드한 코드를 `C:/aseprite`에 위치

2. 1-3의 `ninja.exe`를 `C:/aseprite/build/ninja.exe`에 위치

3. 1-4의 Skia 파일을 `C:/deps/skia`에 위치

4. **Developer Command Prompt for VS 2022**를 실행한 다음 다음 커맨드들을 하나씩 실행

    MinGW가 설치되어 있으면 컴파일러 문제로 오류가 발생합니다. 환경 변수에서 `C:\MinGW\bin`을 없애거나 `CMAKE_IGNORE_PATH` 변수를 사용하면 된다고는 나와있는데, 꼬이는 경우가 있어 컴파일하는 동안에 `C:\MinGW`을 삭제해 두는 게 편합니다.

    ```bash
    call "C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat" -arch=x64
    # 비주얼 스튜디오를 다른 위치에 설치했다면 경로도 변경해야 합니다.
  
    cd c:\aseprite
    mkdir build
    cd build
  
    chcp 65001
    # 인코딩을 utf-8로 변경합니다. 안 하면 한국어 윈도우에서는 코드 문제로 컴파일이 안 됩니다.
  
    cmake -DCMAKE_BUILD_TYPE=RelWithDebInfo -DLAF_BACKEND=skia -DSKIA_DIR=C:\deps\skia -DSKIA_LIBRARY_DIR=C:\deps\skia\out\Release-x64 -DSKIA_LIBRARY=C:\deps\skia\out\Release-x64\skia.lib -G Ninja ..
  
    ninja aseprite
    ```
