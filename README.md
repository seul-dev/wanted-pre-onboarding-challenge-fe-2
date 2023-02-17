# 원티드 프리온보딩 프론트엔드 챌린지 2월(TypeScript)

## 챌린지 기간

2.6 (월) - 2.19 (일)

## 🔗 챌린지 사전 과제

[사전과제 배포 페이지](https://seul-dev.github.io/wanted-pre-onboarding-challenge-fe-2/TodoService.html)

## 🔗 사전 과제 요구사항

[사전과제 링크](https://gist.github.com/pocojang/3c3d4470a3d2a978b5ebfb3f613e40fa)

> 요구 사항을 구현하지 않고 설계만합니다.

## 🔗 세션별 과제

- [week 1-1](https://github.com/seul-dev/wanted-pre-onboarding-challenge-fe-2/issues/1): jsdoc으로 설계한 Todo 앱을 Interface로 설계하고 모델링
- [week 1-2](https://github.com/seul-dev/wanted-pre-onboarding-challenge-fe-2/pull/5): 타 수강생의 타이핑 즉 설계 & 모델링을 실제로 구현
- [week 2-1](./src/typescript-exercises.md): TypeScript Exercises를 풀고 해설 정리


### 필수 요구사항

- [x] Todo 앱 요구사항을 참고하여 필요한 데이터를 모두 모델링한다.
- [x] 사용되는 모든 함수를 `선언부만` 만든다(함수 및 클래스의 내부는 구현하지 않습니다)
- [x] `JSDoc`을 활용해 문서화한다.
- [x] `GitHub Page`를 활용해 `JSDoc` 정적 페이지를 배포한다.

### Todo

```js
Todo {
  아이디(required),
  내용(required),
  완료여부(required),
  카테고리(required),
  태그들(optional),
}
```

#### CREATE

- 할 일을 추가할 수 있다.
- 내용없이 추가할 수 없다.

#### READ

- 모든 할 일을 조회할 수 있다.
- ID를 기반으로 특정 할 일을 조회할 수 있다.

#### UPDATE

- ID를 제외한 모든 속성을 수정할 수 있다.
- 특정 할 일의 특정 태그를 수정할 수 있다.

#### DELETE

- ID를 기반으로 특정 할 일을 삭제할 수 있다.
- 모든 할 일을 제거할 수 있다.
- 특정 할 일의 특정 태그를 삭제할 수 있다.
- 특정 할 일의 모든 태그를 제거할 수 있다.

## 프로젝트 실행 방법

### Install

```bash
npm install
```

### Try it out 
```bash
npm run try
```

### Build

```bash
npm run docs
or
yarn docs
```

#### Reference

- [jsdoc.app](https://jsdoc.app)
