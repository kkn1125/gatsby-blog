---
slug: "/javascript-template-literal-async01"
layout: post
modified: 2022-03-14 00:09:35 +0900
date:   2022-02-11 15:17:59 +0900
title:  "[JAVASCRIPT] 템플릿 리터럴에서 비동기로 내용을 넣어보자"
author: Kimson
categories: [ javascript ]
image: assets/images/post/covers/TIL-javascript.png
tags: [ async, template literal, injection, til ]
description: "템플릿 리터럴

템플릿 리터럴은 내장된 표현식을 허용하는 문자열 리터럴입니다. 여러 줄로 이뤄진 문자열과 문자 보간기능을 사용할 수 있습니다. 이전 버전 ES2015사양 명세에서는 `template strings(템플릿 문자열)`이라 불렀습니다."
featured: true
hidden: false
rating: 4.5
toc: true
profile: false
istop: true
keysum: false
keywords: ""
published: true
---

# 템플릿 리터럴

템플릿 리터럴은 내장된 표현식을 허용하는 문자열 리터럴입니다. 여러 줄로 이뤄진 문자열과 문자 보간기능을 사용할 수 있습니다. 이전 버전 ES2015사양 명세에서는 `template strings(템플릿 문자열)`이라 불렀습니다.

## 기본 사용법

사용방법은 아래와 같습니다.

```javascript
// 문자열 줄바꿈 시 😣
const str = '나는'
    + '킴슨'
    + '입니다';

// Template Literal 😄
const str = `나는
킴슨
입니다.
`;
```

작은 따옴표 또는 이중 따옴표를 사용해서 문자열을 감쌌지만 대신에 백틱 (\`)을 사용합니다.

이때 플레이스 홀더를 이용해 표현식 사용이 가능한데, 표현식은 `$`와 중괄호(콧수염 괄호)로 `${ ...exp... }` 표기합니다.

```javascript
const str = `나는 ${user.name}입니다.`;
```

## Tagged Templates

포스팅 때문에 템플릿 리터럴을 다시 보다가 처음보는 사용법을 발견했습니다.

함수에 바로 붙여 사용할 수 있는데요. 기존에는 `test`라는 함수가 있으면 `test()`로 함수를 호출 했습니다. 아래의 예제를 보면 괄호 대신 백 틱(\`)으로 호출하는데 (test\`blah blah...\`) 이를 태그가 지정된 템플릿, 태그 표현식이라 합니다.

```javascript
const name = 'kimson', age = 30, emoji = '😁';

function test(str, nameExp, ageExp, emojiExp){
    const str0 = str[0];
    const str1 = str[1];
    const str2 = str[2];
    /**
     * 3개의 변수만 지정했지만
     * 기술적으로 str의 길이는 4입니다.
     * 이유는 이모지 다음에
     * ''공백이 하나 있기 때문입니다.
     */

    let validAge;

    if(ageExp>30){
        validAge = '30이상';
    } else {
        validAge = '30미만';
    }

    return str0 + nameExp + str1 + validAge + str2 + emojiExp;
}

test`나는 ${ name }입니다. 나이는 ${ age }. ${ emoji }`;

// '나는 kimson입니다. 나이는 30미만. 😁'
```

좀 더 나아가 활용법을 보겠습니다.

```javascript
function template(str, ...keys){
    console.log(str.raw); // 문자 배열의 escape 되지 않은 원시 문자열을 액세스 할 수 있습니다.
    return (function (...values){
        let dict = values[values.length - 1] || {};
        let result = [str[0]];

        keys.forEach(function (key, i){
            let value = Number.isInteger(key) ? values[key] : dict[key];
            result.push(value, str[i+1]);
        });

        return result.join(' ');
    });
}

let test1 = template`${0}${1}${0}${'nation'}${1}${0}`;
test1('kimson', 'wow', {nation: 'korea'});

// ' kimson  wow  kimson  korea  wow  kimson '
```

결과는 위 처럼 인덱싱으로 리터럴에 표시 가능하게 합니다.

처음 접하는 분을 위해 간단한 설명을 하자면 `test1` 변수의 `test1` 함수가 먼저 실행되는 것이 아니라 `test1` 변수 설정할 때 `template` 함수가 먼저 실행됩니다.

그 다음 `test1` 변수는 아래와 같이 됩니다.

```javascript
// template 함수...
let test1 = (function (...values){
    // 내용들 ...
});

test1('kimson', 'wow', {nation: 'korea'});
```

이 상태에서 함수를 리턴 받아 함수가 된 `test1`을 인자와 함께 호출하게 됩니다.

`values`에서 인자 3가지를 받고 숫자라면 인덱싱, 문자라면 객체 속성을 가져오도록 하고 `result`에 넣습니다. 반복문을 통과한 결과 값을 마지막에 리턴합니다.

여기서 중요하게 생각하는 부분은 함수를 두 번 호출하는데 호출할 때 전달 된 두 묶음의 인자를 모두 사용할 수 있다는 점 입니다.

지금 당장에는 굳이 쓸 필요가 있을까 싶지만 연구하다보면 좋은 쓰임이 있지 않을까 생각합니다.

## 템플릿 리터럴의 작동

그렇다면 템플릿 리터럴은 어떻게 작동할까요?

문자열은 그대로 출력이 됩니다. 하지만 위에 언급한 표현식이 섞인다면 표현식과 그 사이의 텍스트는 함께 함수로 전달이 됩니다. 기본 함수는 단순하게 해당 부분을 단일 문자열로 연결 시켜주는 기능을 합니다.

이때 표현식에서 변수, 객체의 속성값, 즉시실행함수 등을 사용한다면 해당 값을 받아 문자열로 연결시키고 결과를 출력해줍니다.

## 문자열에 비동기로 내용 넣기

본격적으로 이번 포스팅 주제에 대해 다루겠습니다. 위에서 설명한 데로 출력할 때 함수를 실행하고 결과 값을 리턴 받아 문자열을 변환시켜 출력 가능합니다.

하지만 리턴 값에 시간 차가 있는 `fetch`나 `setTimeout` 혹은 `setInterval`과 같은 값의 변동이 지연되는 경우 `undefined`나 `null` 혹은 빈 값을 해당 부분에 출력하게 됩니다.

이것은 원하는 결과가 아니니 다른 방법을 써야 할 것 입니다.

그래서 생각하다보니 임시 태그를 둬서 바꿔치기를 해보자는 생각이 들었습니다.

의사코드로 먼저 보자면 아래와 같습니다.

1. 매개변수를 객체로 받는다.
2. id 변수를 생성한다.
3. temp태그를 만든다.
4. 현재 시간을 36진수로 변환한다.
5. temp태그 아이디에 변환된 시간을 넣는다.
   1. 비동기 함수를 만든다.
   2. result 변수를 생성한다.
   3. `if` 문자열이 있는지 확인한다.
      1. `true` result에 저장한다.
      2. `false` 넘어간다.
   4. `if` url이 있는지 확인한다.
      1. `true` fetch로 데이터를 받는다.
         1. result에 저장한다.
      2. `false` 넘어간다.
   5. setTimeout를 정의한다. (리턴 후 작동)
   6. 저장했던 id로 태그를 선택한다.
   7. 선택된 태그 다음으로 result를 넣는다.
   8. 선택된 태그를 삭제한다.
   9. 딜레이를 넣는다.
6. temp태그를 반환한다.

의사코드를 자바스크립트로 구현해보았습니다.

```javascript
function templateInsertAsync({...options}){
    const id = new Date().getTime().toString().split('').map(x=>String.fromCharCode(65+parseInt(x))).join('');
    
    (async function(){
        let result;

        if(options.string) result = options.string;

        if(options.url){
            let res = await fetch(options.url);
            let data = await res.text();
            result = data;
        }

        setTimeout(() => {
            let target = document.querySelector(`#${id}`);
            target.insertAdjacentHTML('afterend', `<span class="delay-injection">${result}</span>`);
            target.remove();
        }, options.delay);
    })();
    
    return `<temp id="${id}"></temp>`;
}

templateInsertAsync({
    string: '출력 테스트',
    // url: '',
    delay: 0
});

// <temp id="id"></temp> => <span class="delay-injection">출력 테스트</span>
```

나중에 주입된 태그를 별도로 조작하기 위해 클래스를 주었습니다. 태그에 트리로 들어간 상태여도 정확한 위치에서 교체가 됩니다. 저는 태그로 교체를 했지만 `result`만으로 교체해도 무방합니다.

혹은 setTimeout과 setInterval을 함수 호출 때마다 선택적으로 사용하고 싶다면 아래와 같이 사용할 수도 있습니다.

```javascript
function templateInsertAsync({...options}){
    const id = new Date().getTime().toString().split('').map(x=>String.fromCharCode(65+parseInt(x))).join('');
    
    (async function(){
        let result;

        if(options.string) result = options.string;

        if(options.url){
            let res = await fetch(options.url);
            let data = await res.text();
            result = data;
        }

        window[options.type||'setTimeout'](() => {
            let target = document.querySelector(`#${id}`);
            if(target.tagName == 'TEMP') {
                target.insertAdjacentHTML('afterend', `<span id="${id}" class="delay-injection">${result}</span>`);
                target.remove();
            } else target.textContent = result;
            if(options.increase) result = parseInt(result) + options.increase;
        }, options.delay);
    })();

    return `<temp id="${id}"></temp>`;
}

templateInsertAsync({
    string: 1,
    type: 'setTimeout' // or 'setInterval',
    incease: 1,
    delay: 1000,
    type: 'setInterval',
});
```

위와 같이 조금 변경하면 `fetch`와 딜레이, 인터벌 모두 사용 가능한 함수가 완성됩니다. `interval`을 사용하면 해당 태그의 내용에 `increase` 값 만큼 1초마다 증가하며 화면이 바뀌게 됩니다.

`css`에서 `temp`를 `display: none`으로 하면 더 완벽하게 `temp`를 가릴 수 있습니다. 물론 이럴바엔 `vue`를 쓰겠지만 라이브러리나 프레임워크의 도움을 최소한으로 해보고 사용해야 얼마나 이 기능이 감사한지 알 수 있을 것 같아 계속해서 실험해보고 있습니다.

엄청난 내용은 아니지만 누군가 이러한 기능이 필요하다거나 고민 중이라면 자그마한 도움이라도 되었으면 합니다.

아래에는 잘 정리된 `MDN Web Docs`링크를 올렸습니다. 더 자세한 내용은 참고바랍니다.

-----

📚 함께 보면 좋은 내용

[MDN Web Docs::Template Literals](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals 'MDN Web Docs::Template Literal'){:target="_blank"}