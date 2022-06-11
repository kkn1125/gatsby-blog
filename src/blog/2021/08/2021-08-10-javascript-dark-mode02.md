---
slug: "/javascript-dark-mode02"
layout: post
modified: 2022-03-14 00:09:35 +0900
date:   2021-08-10 16:46:41 +0900
title:  "[JAVASCRIPT] 정적웹에 다크모드 적용하기 02"
author: Kimson
categories: [ javascript ]
tags: [ darkmode, til ]
image: assets/images/post/covers/TIL-javascript.png
description: "다크모드의 적용 시기

다크모드를 구현하고 쓰다가 느낀 점이 있습니다. 페이지가 리로드되거나 redirect할 때마다 .dark클래스가 늦게 적용되어 하얀 화면이 나왔다가 다크모드로 전환되는 현상이 발생한 것입니다.

아직 이해도가 부족한 시점에서 과연 어떻게 해결해야하는지 고민되기 시작했습니다."
featured: false
hidden: false
rating: 4.5
toc: true
profile: false
istop: true
keysum: false
keywords: ''
published: true
---

# 다크모드의 적용 시기

다크모드를 구현하고 쓰다가 느낀 점이 있습니다. 페이지가 리로드되거나 redirect할 때마다 .dark클래스가 늦게 적용되어 하얀 화면이 나왔다가 다크모드로 전환되는 현상이 발생한 것입니다.

아직 이해도가 부족한 시점에서 과연 어떻게 해결해야하는지 고민되기 시작했습니다.

## 렌더링 시점

먼저 검색을 통해 몇가지 얻어낸 키워드들이 있습니다. 조금 추려서 3가지를 이야기 하겠습니다.

1. Event type : DOMContentLoaded/load/readyState
2. script src
3. in body

세가지가 모두 다 다른 결과라 아직 이해못한 부분이 많습니다. 하지만 콘솔에 찍어보고 로드시간을 재어본 결과 당연히 요청된 페이지가 제일 먼저 로드되고, 그 이후 script, style, img... 등등이 로드 되었습니다.

### src, href

우선 로드되는 페이지의 head나 /body 상위에 스크립트, 스타일을 불러온다면 로드되는 페이지보다 이후에 로드됩니다.

체감상으로는 차이가 없지만 개발자 도구의 Network를 1/1000단위로 기록이 남습니다.

이때 비교를 하자면 페이지 내에 script태그를 생성하고 alert을 찍고, 외부에 링크로 로드하는 파일에 alert을 찍으면 그 차이를 볼 수 있습니다.

> 별차이 없지 않을까?

제가 고민하던 다크모드의 끊기는 현상에 입장을 두면 매우 큰 차이였습니다.

어떻게하면 그 찰나의 간극을 없앨 수 있을까.

1. body의 class에 직접 dark를 적고 리로드 했을 때, 지우고 리로드 했을 때 차이를 본다.
2. DOMContentLoaded와 load 이벤트타입으로 클래스명을 바꾸어본다.

먼저 body의 class를 직접 조정하면 이미 태그 클래스 속성이 지정되어 있기때문에 미리 적용되어 화면에 출력됩니다.

그래서 저는 body가 생성될 때 적용되어야 한다는 생각으로 DOMContentLoaded를 택했습니다. 비교대상으로 load로도 시험했습니다.

결과는 여전히 데이터량이 조금 있는 깃허브에서 실패했습니다.

localhost로 단순히 급조한 페이지로 구현하면 너무 짧은 시간에 클래스가 적용되어 렌더되어 눈에 보이지 않았습니다.

### in body

최대한 로드되는 페이지 자체에 스크립트를 직접 쓰는 것을 지양하고 있지만, 한 번 해봐야겠다는 생각으로 head내에 스크립트를 작성하고 실행했습니다.

이때 DOMContentLoaded를 쓰게 되면 body는 생성되지만 내부 요소(Elements)들이 생성이 되지 않는 시점이기에 타겟을 잡지 못했습니다.

load를 쓰게 되면 찰나의 간극이 다시 생기게 되었습니다. 조금 사용하기 그렇지만 body시작 부 바로 아래에 script를 페이지 내에 작성하였고, 여기서는 body가 생성된 시점이기 때문에 곧바로 class가 적용되어 간극없이 다크모드가 적용되었습니다.

-----

## 정리

도대체 무슨 이유로 안되고, 어떻게해야 하는 것인지 검색을 해도 마땅한 이유가 없어 많이 했습니다. 당연한 이야기지만 저와 똑같은 조건과 상황의 고민을 하는 사람은 없다는 생각을 합니다.

다만 비슷한 고민거리의 해답을 모아 실험해보고 결과를 구현하는 것은 오로지 저만의 몫이라 생각을 새삼 해봅니다.

리액트나 앵귤러로 구현하면 쉽다는 말을 본 적 있지만 아직 접해보지 못한터라 현재 열심히 관리 중인 블로그에 적용하고 싶은 욕심에 이렇게라도 해봤습니다.

혹시 다른 방법이나 틀린 부분에 대한 지적이 있으시다면 감사히 참고하겠습니다.

> 참고 사이트

[Detect document ready in pure JS](https://www.jstips.co/en/javascript/detect-document-ready-in-pure-js/){:target="_blank"}

[자바스크립트 실행 순서](https://doitnow-man.tistory.com/128){:target="_blank"}

[브라우저 렌더링](https://12bme.tistory.com/140){:target="_blank"}

[Rendering time in a browser](https://stackoverflow.com/questions/2516665/how-can-i-monitor-the-rendering-time-in-a-browser){:target="_blank"}

[quickest way to add a css class to the body of the DOM](https://stackoverflow.com/questions/17457583/safe-and-quickest-way-to-add-a-css-class-to-the-body-of-the-dom){:target="_blank"}