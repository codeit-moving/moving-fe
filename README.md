# **1팀\_풀스텍\_1기**

[무빙 프로젝트 노션](https://bubble-city-3ac.notion.site/1469702f08878035a353e93642fe2232?v=1469702f0887812c9d6a000c643c23d7&pvs=4) </br>
[무빙 프로젝트 깃헙](https://github.com/codeit-moving)
<br/>
[무빙 배포 사이트]()

## **목차**

1. [서비스 소개](#app)
2. [프론트엔드 팀 소개](#team)
3. [기술 및 개발 환경](#dev)
4. [역할 분담](#roles)
5. [구현 기능](#feature)
6. [컨벤션](#convention)
7. [프로젝트 구조](#tree)
8. [협업 문화](#culture)
9. [프로젝트 회고록](#retrospective)

<br><br>

## <span id="app">📝 1. 서비스 소개</span>

> 소개: 이사 소비자와 이사 전문가 매칭 서비스

이사 시장에서는 무분별한 가격 책정과 무책임한 서비스 등으로 인해 정보의 투명성 및 신뢰도가 낮은 문제가 존재합니다. 이러한 문제를 해결하기 위해, 소비자가 원하는 서비스와 주거 정보를 입력하면 이사 전문가들이 견적을 제공하고 사용자가 이를 바탕으로 이사 전문가를 선정할 수 있는 매칭 서비스를 제작합니다. 이를 통해 소비자는 견적과 이사 전문가의 이전 고객들로부터의 후기를 확인하며 신뢰할 수 있는 전문가를 선택할 수 있고, 소비자와 이사 전문가 간의 간편한 매칭이 가능합니다.

> 프로젝트 기간: 2024.11.17 ~ 2025.01.13

<br><br>

## <span id="team"> 🧑🏻‍💻👩🏻‍💻 2. 프론트엔드 팀 소개</span>

### 팀원

| 김현우                                                                           | 이진우                                                                          | 임송이                                                                           | 주영은                                                                          |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| <img src="https://avatars.githubusercontent.com/u/158241915?v=4" width="200px"/> | <img src="https://avatars.githubusercontent.com/u/58920761?v=4" width="200px"/> | <img src="https://avatars.githubusercontent.com/u/126642292?v=4" width="200px"/> | <img src="https://avatars.githubusercontent.com/u/80696592?v=4" width="200px"/> |
| [Accreditus](https://github.com/Accreditus)                                      | [ajantang](https://github.com/ajantang)                                         | [Im-amberIm](https://github.com/Im-amberIm)                                      | [juyeongeun](https://github.com/juyeongeun)                                     |

<br>

<br><br>

## <span id="dev">📝 3. 기술 스택</span>

#### FRONT-END

<div align="left">
  <img src="https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white&style=for-the-badge" height="30" alt="nextjs logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?logo=tailwindcss&logoColor=black&style=for-the-badge" height="30" alt="tailwindcss logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=black&style=for-the-badge" height="30" alt="storybook logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge" height="30" alt="typescript logo"  />
  
 
</div>

#### BACK-END

<div align="left">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge" height="30" alt="typescript logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white&style=for-the-badge" height="30" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=for-the-badge" height="30" alt="express logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white&style=for-the-badge" height="30" alt="prisma logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Amazon AWS-232F3E?logo=amazonaws&logoColor=white&style=for-the-badge" height="30" alt="amazonwebservices logo"  />
</div>

###

#### COLLABORATION TOOL

<div align="left">

  <img src="https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white&style=for-the-badge" height="30" alt="git logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white&style=for-the-badge" height="30" alt="github logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Discord-5865F2?logo=discord&logoColor=white&style=for-the-badge" height="30" alt="discord logo"  />
</div>

###

<br><br>

## <span id="role">📝 5. 역할분할</span>

### **웨인**

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- **소셜 로그인 기능**
  - 구글 소셜 로그인 API 사용으로 소셜 로그인 기능 구현
  - 사이트 이용을 위한 추가 정보 입력 기능 구현
- **소셜 로그인 후 회원 추가 정보 입력 기능**
  - user 타입(관리자, 학생)에 대한 조건부 추가 입력 모달창 기능 및 페이지 이동 기능 구현

### **제이든**

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- **Nav**
  - 회원별 버튼 조건부 렌더링(학생: 커리어, 스킬, 수강후기, 커뮤니티, 관리자: 회원 관리 관리자 페이지)
  - 반응형 레이아웃 구현
- **메인페이지**
  - fetch(POST, GET)을 사용하여 무료 수강 종료 시간 기능 구현
- **공용 Modal 컴포넌트**
  - 공용으로 사용할 Modal 컴포넌트 구현

### **마크**

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- **마이 페이지**
  - fetch(GET)를 사용하여 수강생 개인별 시간 정보 표시
  - 반응형 레이아웃 구현
- **공용 Button 컴포넌트**
  - 공용으로 사용할 Button 컴포넌트 구현

### **데이지**

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- **관리자 페이지**
  - path parameter를 사용하여 학생 페이지와 동적 라우팅 기능 구현
  - 학생별 정보 목록 carousel 슬라이더 구현
  - fetch(PATCH, DELETE)를 사용하여 개인정보 수정 및 탈퇴 기능 구현
  - fetch(POST, PATCH, DELETE)를 사용하여 학생 정보 CRUD 기능 구현
- **공용 Button 컴포넌트**
  - 공용으로 사용할 Button 컴포넌트 구현

### **제이**

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- **관리자 페이지**
  - fetch(GET)를 사용하여 학생별 시간 정보 표시 및 수강생 접속 현황 정보 표시
  - 반응형 레이아웃 구현
- **마이 페이지**
  - fetch(PATCH, DELETE)를 사용하여 수강생의 개인정보 수정 및 탈퇴 기능 구현
- **공용 Modal 컴포넌트**
  - 공용으로 사용할 Modal 컴포넌트 구현

<br><br>

## <span id="convention">🖌️ 6. 컨벤션</span>

### Git 컨벤션

| Emoji | Code                          | 기능     | Description              |
| ----- | ----------------------------- | -------- | ------------------------ |
| ✨    | `:sparkles:`                  | Feat     | 새 기능                  |
| ♻️    | `:recycle:`                   | Refactor | 코드 리팩토링            |
| 📦    | `:wrench:`                    | Chore    | 리소스 수정/삭제         |
| 🐛    | `:bug:`                       | Fix      | 버그 수정                |
| 📝    | `:memo:`                      | Docs     | 문서 추가/수정           |
| 🎨    | `:art:`                       | Style    | UI/스타일 파일 추가/수정 |
| 🎉    | `:tada:`                      | Init     | 프로젝트 시작 / Init     |
| ✅    | `:white_check_mark:`          | Test     | 테스트 추가/수정         |
| ⏪    | `:rewind:`                    | Rewind   | 변경 사항 되돌리기       |
| 🔀    | `:twisted_rightwards_arrows:` | Merge    | 브랜치 합병              |
| 🗃     | `:card_file_box:`             | DB       | 데이터베이스 관련 수정   |
| 💡    | `:bulb:`                      | Comment  | 주석 추가/수정           |
| 🚀    | `:rocket:`                    | Deploy   | 배포                     |

<br/>

### Code 컨벤션

- **변수/함수**
  - Camel 표기법 사용 (상수는 대문자)
- **컴포넌트/파일명**
  - Pascal 표기법 사용
- **이미지 파일**
  - Snake 표기법 사용 - `(형태)(의미)(순서)_(상태)` / 예: `btn_login_001_off.png`
- **ClassName** - Kebab 표기법 사용

<br/>

## <span id="tree"> 🗂️ 7. SRC 파일 구조 </span>

```

📦src
 ┣ 📂api
 ┃ ┣ 📂mutation-hooks
 ┃ ┃ ┗ 📜mover.ts
 ┃ ┣ 📂query-hooks
 ┃ ┃ ┣ 📜mover.ts
 ┃ ┃ ┣ 📜quote.ts
 ┃ ┃ ┗ 📜review.ts
 ┃ ┣ 📜PendingQuotes.ts
 ┃ ┣ 📜axios.ts
 ┃ ┣ 📜mover.ts
 ┃ ┣ 📜movingRequest.ts
 ┃ ┣ 📜queryKeys.ts
 ┃ ┣ 📜quote.ts
 ┃ ┗ 📜review.ts
 ┣ 📂app
 ┃ ┣ 📂(mover)
 ┃ ┃ ┣ 📂mover
 ┃ ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📂register
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂info-edit
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂my-page
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂my-quote
 ┃ ┃ ┃ ┃ ┣ 📂[quoteId]
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂profile
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂profile-edit
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📂request
 ┃ ┃ ┃ ┃ ┣ 📜moverRequest.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜layout.tsx
 ┃ ┣ 📂(request)
 ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┣ 📜AddressSelectionField.tsx
 ┃ ┃ ┃ ┣ 📜Chatter.tsx
 ┃ ┃ ┃ ┣ 📜ProgressBarMovingRequest.tsx
 ┃ ┃ ┃ ┣ 📜StepSelectionFiled.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜layout.tsx
 ┃ ┣ 📂(user)
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📂register
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂find-mover
 ┃ ┃ ┃ ┣ 📂[moverId]
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📜moverList.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂me
 ┃ ┃ ┃ ┣ 📂info-edit
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂mover
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂profile
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂profile-edit
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📂review
 ┃ ┃ ┃ ┃ ┣ 📜EmptyReview.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂my-quote
 ┃ ┃ ┃ ┣ 📂[quoteId]
 ┃ ┃ ┃ ┃ ┣ 📜QuoteDetail.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📜mock.ts
 ┃ ┃ ┃ ┣ 📜myQuoteDropdown.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜layout.tsx
 ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📜GeistMonoVF.woff
 ┃ ┃ ┣ 📜GeistVF.woff
 ┃ ┃ ┣ 📜PretendardVariable.woff2
 ┃ ┃ ┗ 📜pretendard.css
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📜not-found.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂components
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜FormHeader.tsx
 ┃ ┃ ┣ 📜LoginComponent.stories.tsx
 ┃ ┃ ┣ 📜LoginComponent.tsx
 ┃ ┃ ┣ 📜SignUpComponent.stories.tsx
 ┃ ┃ ┣ 📜SignUpComponent.tsx
 ┃ ┃ ┗ 📜SnsComponent.tsx
 ┃ ┣ 📂cards
 ┃ ┃ ┣ 📜ConfirmedQuoteCard.stories.tsx
 ┃ ┃ ┣ 📜ConfirmedQuoteCard.tsx
 ┃ ┃ ┣ 📜CreateReviewCard.stories.tsx
 ┃ ┃ ┣ 📜CreateReviewCard.tsx
 ┃ ┃ ┣ 📜FavoriteMoverCard.stories.tsx
 ┃ ┃ ┣ 📜FavoriteMoverCard.tsx
 ┃ ┃ ┣ 📜IncomingRequestCard.stories.tsx
 ┃ ┃ ┣ 📜IncomingRequestCard.tsx
 ┃ ┃ ┣ 📜MoverInfoCard.stories.tsx
 ┃ ┃ ┣ 📜MoverInfoCard.tsx
 ┃ ┃ ┣ 📜MoverProfileCard.stories.tsx
 ┃ ┃ ┣ 📜MoverProfileCard.tsx
 ┃ ┃ ┣ 📜MyReviewCard.stories.tsx
 ┃ ┃ ┣ 📜MyReviewCard.tsx
 ┃ ┃ ┣ 📜PendingRequestCard.stories.tsx
 ┃ ┃ ┣ 📜PendingRequestCard.tsx
 ┃ ┃ ┣ 📜ReceivedQuoteCard.stories.tsx
 ┃ ┃ ┣ 📜ReceivedQuoteCard.tsx
 ┃ ┃ ┣ 📜RejectedRequestCard.stories.tsx
 ┃ ┃ ┣ 📜RejectedRequestCard.tsx
 ┃ ┃ ┣ 📜SentQuoteCard.stories.tsx
 ┃ ┃ ┗ 📜SentQuoteCard.tsx
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📂card
 ┃ ┃ ┃ ┣ 📜CardContainer.tsx
 ┃ ┃ ┃ ┣ 📜FavoriteUi.stories.tsx
 ┃ ┃ ┃ ┣ 📜FavoriteUi.tsx
 ┃ ┃ ┃ ┣ 📜GrayLabel.stories.tsx
 ┃ ┃ ┃ ┣ 📜GrayLabel.tsx
 ┃ ┃ ┃ ┣ 📜MoverExperience.tsx
 ┃ ┃ ┃ ┣ 📜MoverInfo.stories.tsx
 ┃ ┃ ┃ ┣ 📜MoverInfo.tsx
 ┃ ┃ ┃ ┣ 📜NameText.stories.tsx
 ┃ ┃ ┃ ┣ 📜NameText.tsx
 ┃ ┃ ┃ ┣ 📜ProfileImage.stories.tsx
 ┃ ┃ ┃ ┣ 📜ProfileImage.tsx
 ┃ ┃ ┃ ┣ 📜QuoteDetails.stories.tsx
 ┃ ┃ ┃ ┣ 📜QuoteDetails.tsx
 ┃ ┃ ┃ ┣ 📜QuoteModalUser.tsx
 ┃ ┃ ┃ ┣ 📜ReviewMover.tsx
 ┃ ┃ ┃ ┣ 📜ServiceChip.stories.tsx
 ┃ ┃ ┃ ┣ 📜ServiceChip.tsx
 ┃ ┃ ┃ ┣ 📜TextWithGrayLabel.stories.tsx
 ┃ ┃ ┃ ┗ 📜TextWithGrayLabel.tsx
 ┃ ┃ ┣ 📂checkboxs
 ┃ ┃ ┃ ┣ 📜Checkbox.stories.tsx
 ┃ ┃ ┃ ┣ 📜Checkbox.tsx
 ┃ ┃ ┃ ┣ 📜CheckboxChip.stories.tsx
 ┃ ┃ ┃ ┣ 📜CheckboxChip.tsx
 ┃ ┃ ┃ ┣ 📜CheckboxCircle.stories.tsx
 ┃ ┃ ┃ ┗ 📜CheckboxCircle.tsx
 ┃ ┃ ┣ 📂progress-bar
 ┃ ┃ ┃ ┣ 📜ProgressBar.tsx
 ┃ ┃ ┃ ┣ 📜ProgressBarMovingRequest.stories.tsx
 ┃ ┃ ┃ ┣ 📜ProgressBarMovingRequest.tsx
 ┃ ┃ ┃ ┣ 📜ProgressBarRating.stories.tsx
 ┃ ┃ ┃ ┗ 📜ProgressBarRating.tsx
 ┃ ┃ ┣ 📜AddressChip.tsx
 ┃ ┃ ┣ 📜AddressField.tsx
 ┃ ┃ ┣ 📜Button.stories.tsx
 ┃ ┃ ┣ 📜Button.tsx
 ┃ ┃ ┣ 📜ChatField.stories.tsx
 ┃ ┃ ┣ 📜ChatField.tsx
 ┃ ┃ ┣ 📜Dropdown.tsx
 ┃ ┃ ┣ 📜Input.stories.tsx
 ┃ ┃ ┣ 📜Input.tsx
 ┃ ┃ ┣ 📜LineSeparator.tsx
 ┃ ┃ ┣ 📜Loader.stories.tsx
 ┃ ┃ ┣ 📜Loader.tsx
 ┃ ┃ ┣ 📜Message.tsx
 ┃ ┃ ┣ 📜Pagination.stories.tsx
 ┃ ┃ ┣ 📜Pagination.tsx
 ┃ ┃ ┣ 📜QuoteButtonGroup.tsx
 ┃ ┃ ┣ 📜ReviewModal.tsx
 ┃ ┃ ┣ 📜SearchInput.stories.tsx
 ┃ ┃ ┣ 📜SearchInput.tsx
 ┃ ┃ ┣ 📜ShareButtons.stories.tsx
 ┃ ┃ ┣ 📜ShareButtons.tsx
 ┃ ┃ ┣ 📜StarRating.tsx
 ┃ ┃ ┣ 📜StarRatingDisplay.stories.tsx
 ┃ ┃ ┣ 📜StarRatingDisplay.tsx
 ┃ ┃ ┣ 📜Textarea.stories.tsx
 ┃ ┃ ┗ 📜Textarea.tsx
 ┃ ┣ 📂dropdowns
 ┃ ┃ ┣ 📜DropdownNotification.stories.tsx
 ┃ ┃ ┣ 📜DropdownNotification.tsx
 ┃ ┃ ┣ 📜DropdownProfile.stories.tsx
 ┃ ┃ ┣ 📜DropdownProfile.tsx
 ┃ ┃ ┣ 📜DropdownQuote.stories.tsx
 ┃ ┃ ┣ 📜DropdownQuote.tsx
 ┃ ┃ ┣ 📜DropdownRegion.stories.tsx
 ┃ ┃ ┣ 📜DropdownRegion.tsx
 ┃ ┃ ┣ 📜DropdownService.stories.tsx
 ┃ ┃ ┣ 📜DropdownService.tsx
 ┃ ┃ ┣ 📜DropdownSortMover.stories.tsx
 ┃ ┃ ┣ 📜DropdownSortMover.tsx
 ┃ ┃ ┣ 📜DropdownSortMovingRequest.stories.tsx
 ┃ ┃ ┗ 📜DropdownSortMovingRequest.tsx
 ┃ ┣ 📂forms
 ┃ ┃ ┣ 📜InfoEdit.tsx
 ┃ ┃ ┗ 📜Profile.tsx
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📜GNB.stories.tsx
 ┃ ┃ ┣ 📜GNB.tsx
 ┃ ┃ ┣ 📜Main.tsx
 ┃ ┃ ┣ 📜MswComponent.tsx
 ┃ ┃ ┣ 📜QuoteGNB.stories.tsx
 ┃ ┃ ┣ 📜QuoteGNB.tsx
 ┃ ┃ ┗ 📜QuoteGNBWrapper.tsx
 ┃ ┣ 📂modals
 ┃ ┃ ┣ 📜AddressModal.stories.tsx
 ┃ ┃ ┣ 📜AddressModal.tsx
 ┃ ┃ ┣ 📜ConfirmModal.tsx
 ┃ ┃ ┣ 📜FilterModal.stories.tsx
 ┃ ┃ ┣ 📜FilterModal.tsx
 ┃ ┃ ┣ 📜QuoteModal.stories.tsx
 ┃ ┃ ┣ 📜QuoteModal.tsx
 ┃ ┃ ┣ 📜QuoteRequestModal.stories.tsx
 ┃ ┃ ┣ 📜QuoteRequestModal.tsx
 ┃ ┃ ┣ 📜ReviewModal.stories.tsx
 ┃ ┃ ┗ 📜ReviewModal.tsx
 ┃ ┣ 📂request
 ┃ ┃ ┣ 📜DatePicker.stories.tsx
 ┃ ┃ ┣ 📜DatePicker.tsx
 ┃ ┃ ┗ 📜QuoteDetailInfo.tsx
 ┃ ┣ 📂request-checkbox-field
 ┃ ┃ ┣ 📜CheckboxButton.tsx
 ┃ ┃ ┣ 📜CheckboxCircle.tsx
 ┃ ┃ ┣ 📜CheckboxField.stories.tsx
 ┃ ┃ ┗ 📜CheckboxField.tsx
 ┃ ┣ 📂review
 ┃ ┃ ┣ 📜CustomerReview.tsx
 ┃ ┃ ┣ 📜MoversReviewList.tsx
 ┃ ┃ ┗ 📜ReviewImageSlider.tsx
 ┃ ┣ 📜ButtonFavorite.tsx
 ┃ ┣ 📜CheckboxField.stories.tsx
 ┃ ┣ 📜CheckboxField.tsx
 ┃ ┣ 📜MovingRequestProgressInfo.stories.tsx
 ┃ ┣ 📜MovingRequestProgressInfo.tsx
 ┃ ┣ 📜NiceModalProvider.tsx
 ┃ ┣ 📜RatingInfo.stories.tsx
 ┃ ┣ 📜RatingInfo.tsx
 ┃ ┣ 📜ReactQueryDevtoolsClient.tsx
 ┃ ┗ 📜temp.tsx
 ┣ 📂config
 ┃ ┣ 📜cn.ts
 ┃ ┗ 📜queryClient.ts
 ┣ 📂context
 ┃ ┗ 📜QuoteProgressContext.tsx
 ┣ 📂contexts
 ┃ ┗ 📜queryClientProvider.tsx
 ┣ 📂hooks
 ┃ ┗ 📜useResize.tsx
 ┣ 📂mocks
 ┃ ┣ 📂data
 ┃ ┃ ┣ 📜mover.ts
 ┃ ┃ ┣ 📜movingQuotes.ts
 ┃ ┃ ┣ 📜movingRequest.ts
 ┃ ┃ ┣ 📜pendingQuotes.ts
 ┃ ┃ ┣ 📜quote.ts
 ┃ ┃ ┗ 📜review.ts
 ┃ ┣ 📂handlers
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜mover.ts
 ┃ ┃ ┣ 📜movingRequest.ts
 ┃ ┃ ┣ 📜quote.ts
 ┃ ┃ ┗ 📜review.ts
 ┃ ┣ 📂types
 ┃ ┃ ┗ 📜quotes.ts
 ┃ ┣ 📜browser.ts
 ┃ ┗ 📜server.ts
 ┣ 📂stories
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📜accessibility.png
 ┃ ┃ ┣ 📜accessibility.svg
 ┃ ┃ ┣ 📜addon-library.png
 ┃ ┃ ┣ 📜assets.png
 ┃ ┃ ┣ 📜avif-test-image.avif
 ┃ ┃ ┣ 📜context.png
 ┃ ┃ ┣ 📜discord.svg
 ┃ ┃ ┣ 📜docs.png
 ┃ ┃ ┣ 📜figma-plugin.png
 ┃ ┃ ┣ 📜github.svg
 ┃ ┃ ┣ 📜share.png
 ┃ ┃ ┣ 📜styling.png
 ┃ ┃ ┣ 📜testing.png
 ┃ ┃ ┣ 📜theming.png
 ┃ ┃ ┣ 📜tutorials.svg
 ┃ ┃ ┗ 📜youtube.svg
 ┃ ┣ 📜Button.stories.ts
 ┃ ┣ 📜Button.tsx
 ┃ ┣ 📜Configure.mdx
 ┃ ┣ 📜Header.stories.ts
 ┃ ┣ 📜Header.tsx
 ┃ ┣ 📜Page.stories.ts
 ┃ ┣ 📜Page.tsx
 ┃ ┣ 📜button.css
 ┃ ┣ 📜header.css
 ┃ ┗ 📜page.css
 ┣ 📂types
 ┃ ┣ 📜api.ts
 ┃ ┣ 📜mover.ts
 ┃ ┣ 📜movingRequest.ts
 ┃ ┗ 📜quote.ts
 ┣ 📂utils
 ┃ ┣ 📜authValidation.ts
 ┃ ┣ 📜canUseDom.ts
 ┃ ┣ 📜env.ts
 ┃ ┣ 📜formatCost.ts
 ┃ ┣ 📜generateImgSrc.js
 ┃ ┣ 📜getQueryClient.ts
 ┃ ┗ 📜utilFunctions.ts
 ┣ 📂variables
 ┃ ┣ 📜dropdown.ts
 ┃ ┣ 📜images.js
 ┃ ┣ 📜regions.ts
 ┃ ┣ 📜screen.ts
 ┃ ┣ 📜service.ts
 ┃ ┗ 📜services.ts
 ┗ 📜.DS_Store

```

<br><br>

## <span id="culture"> 8. 협업 문화 </span>

<br><br>

## <span id="retrospective">✍️ 9. 프로젝트 회고록 </span>

(제작한 발표자료 링크 혹은 첨부파일 첨부)
