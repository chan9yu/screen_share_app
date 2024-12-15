# Screen Share App

> Real-time screen share service.

- [Client, ReactJS](client/)
- [Server, NodeJS](server/)

<br />

## Getting Started

로컬환경에서 앱을 실행하는 방법입니다.

### Prerequisites

1. yarn install

```shell
# yarn 설치
npm -g install yarn
```

2. node setup

```shell
# .nvmrc 기준 node version 설치
nvm use
```

### Installation

1. 프로젝트 클론

```shell
git clone https://github.com/chan9yu/screen_share_app
```

2. 프로젝트 디렉토리로 이동

```shell
cd screen_share_app
```

3. 종속성 설치

```shell
yarn install
```

4. 개발 서버 시작

```shell
# 프론트엔드와 백엔드 서버를 동시에 시작
yarn dev

# 프론트엔드 개발 서버 시작 (ReactJS, http://localhost:3035)
yarn dev:client

# 백엔드 개발 서버 시작 (NodeJS, http://localhost:3036)
yarn dev:server
```
