---
slug: "/javascript-prime-number"
layout: post
modified: 2022-03-14 00:09:35 +0900
date:   2021-12-30 16:09:54 +0900
title:  "[JAVASCRIPT] 소수(Prime Number) 찾기"
author: Kimson
categories: [ javascript ]
image: assets/images/post/covers/TIL-javascript.png
tags: [ prime number, combination, programmers ]
description: "소수 찾기 문제

요즘 프로그래머스의 문제를 단계별로 하나씩 풀어나가고 있는데요. 소수에 대한 이해도가 부족해서 딜레이 되었던지라 정리하기 위해 기록합니다."
featured: true
hidden: false
rating: 4
toc: true
profile: false
istop: true
keysum: false
keywords: ""
published: true
---

# 소수 찾기 문제

요즘 프로그래머스의 문제를 단계별로 하나씩 풀어나가고 있는데요. 소수에 대한 이해도가 부족해서 딜레이 되었던지라 정리하기 위해 기록합니다.

## 소수란

소수는 1보다 큰 자연수 중 1과 자기 자신만을 약수로 가지는 수를 말합니다.

즉, 여기서 이미 1은 제외된다는 이야기입니다. 2,3,5,7 까지는 10이내의 소수이고, 그 외 2,3,5,7의 배수가 제외됩니다. 그렇게 반복적으로 다음 소수의 배수인 것도 제외가 되는 셈이지요.

제가 잘못 알았던 부분이 이것입니다. 단지 2,3,5,7로 나누어 떨어지지 않는 것만을 소수라 생각하고 문제를 풀었습니다.

결론은 당연히 정답이 안나옵니다.

## 자바스크립트에서 소수 판별

```javascript
function isPrimeNumber(n){
	if(n==1) return false;
	for(let i=2; i<n; i++){
		if(n%i==0) return false;
	}
	return true;
}
```

굉장히 간단합니다. 1인 것은 바로 `false`를 주고, 2는 소수이기에 `for`문의 범위를 2부터 시작하여 `true`를 반환 시켜버립니다.

3도 소수이고 3이 들어가게되면 3보다 작을 때까지 돌기 때문에 `true`를 반환합니다.

4는 2의 배수이기 때문에 `false`, 5, 7도 2, 3과 마찬가지로 그 전의 수에 끝나기에 `true`를 반환합니다.

이제 10부터는 대부분 배수에 걸리기 때문에 나누어지는 수는 `false`, 소수는 `true`로 판별하게 됩니다.

프로그래머스의 문제 풀이를 올리지는 못하니 소수를 판별하는 식을 기록하자면 위와 같습니다.

이것저것 대입하다보니 코드양이 많이 준 상태가 되어서 메모합니다!

## 문제 팁

문제 명칭도 언급하지는 않겠습니다. 해당 문제는 중복되지 않는 조합을 사용해야하는데요. 조합의 경우도 잊을까봐 기록합니다.

그룹 넘버(묶을 수)를 정하는 식을 만들고자 하면 함수를 조금 변경해서 쓰시면 될 겁니다.

```javascript
/**
 * @param {array} nums ex) [ 1,2,3,4 ]
 * @returns {array} result ex) [ [ 1,2,3 ],[ 1,2,4 ],[ 1,3,4 ],[ 2,3,4 ] ]
 */
function combination(nums){
	// ... 소수 판별식
	let mid = 1;
    let last = mid + 1;
    let result = [];
    while (nums.length > 2) {
        result.push(nums[0] + nums[mid] + nums[last]);
        last++;

        if (last > nums.length - 1) {
            mid++;
            last = mid + 1;
        }

        if (mid > nums.length - 2) {
            nums.splice(0, 1);
            mid = 1;
            last = mid + 1;
        }
    }
    return result;
}
```

아래는 더 보면 좋은 내용입니다.

-----

📚 함께 보면 좋은 내용

[Wikipedia::소수 (수론)](https://ko.wikipedia.org/wiki/%EC%86%8C%EC%88%98_(%EC%88%98%EB%A1%A0)){:target="_blank"}

[programiz::JavaScript Program to Check Prime Number](https://www.programiz.com/javascript/examples/prime-number){:target="_blank"}

[mathbang::소수와 합성수, 소수의 뜻, 합성수의 뜻](https://mathbang.net/199){:target="_blank"}