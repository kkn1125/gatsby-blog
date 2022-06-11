---
slug: "/javascript-game-sachunsung"
layout: post
modified: 2022-03-14 00:09:35 +0900
date:   2021-09-06 14:25:12 +0900
title:  "[JAVASCRIPT] 사천성 게임 만들기"
author: Kimson
categories: [ javascript ]
tags: [ sachunsung, 사천성, 그림맞추기, til ]
image: assets/images/post/sachunsung/sa06.png
description: "사천성 게임 만들기

미리 사과말씀 드리자면 사천성이라기보다 같은 그림을 맞추는 기능을 구현했습니다. 아직 실력 부족으로 사천성의 룰을 구현하지는 못했습니다. 그래서 이번에는 구현한 코드를 보여드리면서 아래에 파일을 올리려 합니다.

모바일에서 터치가 잘 안 먹히는 것 같아 소스파일로만 올린 점 양해바랍니다."
featured: false
hidden: false
rating: 4.5
toc: true
profile: false
keysum: false
keywords: ""
published: true
---

# 사천성 게임 만들기

미리 사과말씀 드리자면 사천성이라기보다 같은 그림을 맞추는 기능을 구현했습니다. 아직 실력 부족으로 사천성의 룰을 구현하지는 못했습니다. 그래서 이번에는 구현한 코드를 보여드리면서 아래에 파일을 올리려 합니다.

모바일에서 터치가 잘 안 먹히는 것 같아 소스파일로만 올린 점 양해바랍니다.

## 기능 구성

게임의 특성을 이야기하자니 제가 게임을 개발하는 사람이 아니기에 제가 생각한 게임적 요소를 생각해봤습니다.

조작감, 점수, 제한시간 이렇게 세가지를 꼽았습니다. 슈퍼마리오의 경우 코인(목숨), 조작, 점수가 핵심 요소인 것으로 봤습니다. 그래서 사천성을 구현 못할 바에 시간제한과 랭킹을 두고자 했습니다.

1. 조작
    - 클릭한 패를 selected에 담아 선택된 패의 내용을 대조합니다.
2. 점수
    - 맞으면 점수가 100점 올라갑니다. 틀리면 selected를 비우고, 새로 패를 받습니다.
3. 제한시간
    - 테스트용으로 대략 얼마나 걸리는지 보기위해 플레이타임으로 체크하도록했습니다.

아래에 소스를 올려두겠습니다.

> 플레이 이미지입니다.

### Stage 1

![사천성]({{site.baseurl}}/assets/images/post/sachunsung/sa01.png)

![사천성]({{site.baseurl}}/assets/images/post/sachunsung/sa02.png)

![사천성]({{site.baseurl}}/assets/images/post/sachunsung/sa03.png)

![사천성]({{site.baseurl}}/assets/images/post/sachunsung/sa04.png)

### Stage 2

x, y의 개수가 1 씩 증가합니다.

![사천성]({{site.baseurl}}/assets/images/post/sachunsung/sa05.png)

### Stage 3

마지막 스테이지에서 모두 맞추면 게임을 종료하고 랭킹에 등재합니다.

![사천성]({{site.baseurl}}/assets/images/post/sachunsung/sa06.png)

![사천성]({{site.baseurl}}/assets/images/post/sachunsung/sa07.png)

![사천성]({{site.baseurl}}/assets/images/post/sachunsung/sa08.png)

-----

<a href="{{site.baseurl}}/assets/download/sachunsung.zip" download>사천성 소스코드 다운로드</a>