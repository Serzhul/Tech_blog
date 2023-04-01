---
title: DNS와 브라우저
date: 2023-04-01 14:59:00
categories: ["Frontend"]
summary: "웹 성능 최적화 기법 - 웹 성능이란 무엇인가?"
thumbnail: "../../static/frontend.jpeg"
---
썸네일: <a href="https://unsplash.com/ko/%EC%82%AC%EC%A7%84/GqEmWxkPNa4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>의<a href="https://unsplash.com/de/@plhnk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Paul Hanaoka</a>

출처 : [웹 성능 최적화 기법](https://link.coupang.com/a/Tasb8)

---

웹 성능 최적화 기법(루비페이퍼 사) 도서에 대한 핵심 내용과 지식을 정리한 포스트입니다.
포스트에 올라오는 내용은 도서의 일부이기 때문에 더 자세한 내용이 궁금하신 분들은 출처에서 도서를 구매해 읽어보시는 것을 추천드립니다.

---

# 2.4 DNS(Domain Name System)

- DNS는 인터넷 호스트명을 클라이언트와 서버가 이해할 수 있는 IP 주소로 변환해주는 시스템이다.
    - IP로 운영하는 웹 사이트는 DNS가 필요하지 않지만 사용자들은 외우기가 어렵기 때문에 기억하기 쉬운 호스트명을 인터넷 주소로 사용한다.
- DNS 질의와 응답 성능이 나쁘면 웹 사이트 로딩에 영향을 줄 수 있으므로, 관리자는 웹 사이트 호스트명의 DNS 질의 속도를 파악하고 이를 개선해야 한다.

## 2.4.1. DNS의 작동 원리

1. 로컬 DNS 서버로 질의
    - 브라우저는 로컬 DNS서버 주소창에 입력된 [www.example.com](http://www.example.com) 도메인에 대한 1차 질의를한다.
        - 로컬 DNS는 사용자와 인접한 DNS로 사용자가 PC 등에 수동으로 설정한 DNS의 IP 혹은 PC가 DHCP 설정을 통해 사용하는 ISP의 인근 서버일 수 있다.
    - 이 과정에서 도메인 IP 주소가 이전에 질의되었고 캐시 주기 값이 남아 있다면 로컬 DNS는 캐싱하고 있는 IP 주소를 반환한다.
2. 루트 DNS 서버로 질의
    - 소유하지 않은 도메인 정보에 대한 질의를 받으면 로컬 DNS는 전체 도메인을 관장하는 루트 DNS에 [www.example.com](http://www.example.com) 도메인 에대 한 질의를 한다.
        - 이 정보가 없는 루트 DNS는 가지고 있는 .com 도메인 서버의 IP 정보를 알려준다.
3. .com DNS 서버로 질의
    - 로컬 DNS는 .com 도메인을 관장하는 .com DNS에 [www.example.com](http://www.example.com) 도메인을 질의한다. 이 정보가 없는 .com DNS는 example.com 네임 서버의 IP 정보를 알려준다.
4. [example.com](http://example.com) DNS 서버로 질의
    - 로컬 DNS는 [www.example.com](http://www.example.com) 도메인을 관장하는 example.com DNS에 www.example.com 도메인을 질의한다. example.com DNS는 자신이 알고 있는 www.example.com 네임 서버의 IP 정보를 알려준다.
- 위와 같은 방식으로 도메인 IP주소로 질의하여 값을 받아오는 과정에는 하나의 **DNS 서버가 아니라 도메인 구조 계층에 따라** **각각의 DNS** 서버들이 관여한다.
    - 이렇게 계층형으로 나누어진 역할에 따라 순차적인 DNS 질의를 반복하여 값을 받아오는 프로세스 과정을 **반복적 질의(iterative query)**라고 한다.
- DNS 서버들의 속도가 느리거나 제때 응답을 주지 못하면 전반적인 웹 성능에 영향을 미친다.
    - 로컬 DNS 서버들은 사용자가 이용 중인 ISP 업체나 DNS 전문 서비스 업체들이 관리한다.
    - 루트 DNS 서버는 ICANN(Internet Corporation for Assigned Names and Number)기관에서 관리한다.
    - 따라서 웹 서비스 운영 업체는 [example.com](http://example.com) **서버부터 관여해 DNS 전문 업체의 서비스를 받거나** **분산된 DNS 서버를 직접 운영하는 방식으로 DNS 성능을 향상**시킬 수 있다.

## 2.4.2 사용 중인 다양한 도메인 확인 방법
- 최근 웹 사이트는 자신의 웹 서비스 콘텐츠뿐만 아니라 다른 웹 서비스의 다양한 콘텐츠를 호출하여 사용한다.
    - 특히 오픈 소스 이용이 화설화되면서 필요한 모듈을 무상으로 지원하는 서비스들을 호출하여 사용한다.
    - 크롬 브라우저를 사용한다면 [도구 더보기] → [개발자 도구] → [Source] 항목을 통해 하나의 웹 페이지에 어떤 도메인들이 사용되는지 쉽게 파악할 수 있다.
- 다양한 서비스들이 각 공급자 도메인을 사용하기 때문에 자신이 운영중인 웹 서비스 도메인 성능이 빠르다고 해서 DNS를 조회할 때 웹 성능에 문제가 없다고 판단하기 어렵다.
- 사용 중인 특정 모듈 서비스 업체의 DNS 조회가 불가능하거나 느리다면 해당 모듈을 다운로드해 자신의 웹 서버에 업로드 후 설치하여 사용하는 방법 등도 고려해야 한다. (DNS 질의 도메인 수 감소)

## 2.4.3 웹 성능을 최적화하는 도메인 운용 방법

- 직접 개발한 내부 서비스에 도메인 분할을 하고 싶다면 상위 도메인(top level domain)을 동일하게 해 DNS 질의를 최대한 적게 만드는 방법 도입 가능
- 공통 상위 도메인 사용 서비스들은 네임 서버에 캐싱된 정보를 재사용할 수 있어 DNS 질의 시간 단축
    - SSL 인증서를 와일드카드 형식으로 하나만 생성해도 모든 도메인에 적용 가능하므로 인증서 발급 비용과 수고를 줄일 수 있다.
- HTML - DNS 프리페치(Prefetch) 기능도 사용할 수 있음
    - DNS 프리페치란 멀티스레드 방식으로 미리 DNS를 조회해 빠르게 IP 주소를 불러오는 기술을 말한다.

# 2.5 브라우저

- 브라우저는 HTTP, DNS를 사용해 사용자가 원하는 HTML, 이미지, 비디오, 동영상 등의 웹 콘텐츠를 전달하는 소프트웨어이다.

## 2.5.1 브라우저의 역사와 특징

- 브라우저는 웹이 만들어진 시대에 함께 개발되었으며, 초창기에는 HTTP와 DNS 기술을 접목해 사용자가 http:// 주소에서 접속할 웹 서버 IP를 찾고 HTTP로 웹 서버에 접속해 콘텐츠를 가져오는 단순한 기능을 수행했다.
- 대표적인 브라우저로는 넷스케이프가 있었고, 이후 마이크로소프트가 인터넷 익스플로러 3를 출시하며 CSS, 오디오 파일 재생 기능을 추가하였다.
- 비디오 같은 멀티미디어 요소가 늘어나면서 이를 위한 HTML5, CSS3 버전이 개발되었고, 이를 지원하기 위해 다양한 회사에서 브라우저를 개발했으며 애플사의 사파리, 모질라 재단의 파이어폭스, 마이크로소프트의 에지, 구글의 크롬, 오페라 소프트웨어의 오페라 등이 있다.
- 브라우저 역시 웹 성능을 관장하는 중요한 부분으로 웹 성능을 최종 테스트하거나 디버깅하는 작업등을 수행한다.

## 2.5.2 내비게이션 타이밍 API

- 내비게이션 타이밍 API(Navigation Timing API)는 웹 사이트 성능을 측정하는 데 사용할 수 있는 데이터를 제공한다.
- 정확한 종단(end-to-end)간 대기 시간(Latency) 정보를 제공하며 window.performance 의 property로 사용할 수 있다.

## 2.5.3 내비게이션 타이밍 속성

- performance.timing 이벤트 속성은 페이지 로딩 흐름 순서에 따라 다음과 같이 정의 된다.
    - 2023년 기준으로는 **[PerformanceNavigationTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming) 객체를 기준으로 보면 된다.**