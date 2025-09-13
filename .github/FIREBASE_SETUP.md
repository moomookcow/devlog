# Firebase GitHub Actions 설정 가이드

## 1. Firebase Service Account 키 생성

### Step 1: Firebase Console 접속

1. https://console.firebase.google.com/ 접속
2. `tech-blog-moomookcow` 프로젝트 선택

### Step 2: Service Account 생성

1. 왼쪽 사이드바 → "프로젝트 설정" (⚙️ 아이콘)
2. "서비스 계정" 탭 클릭
3. "새 비공개 키 생성" 클릭
4. JSON 파일 다운로드

### Step 3: GitHub Secrets 설정

1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. "New repository secret" 클릭
3. Name: `FIREBASE_SERVICE_ACCOUNT`
4. Value: 다운로드한 JSON 파일의 전체 내용 복사

## 2. Firebase CLI 설정

### Step 1: Firebase 프로젝트 설정

```bash
firebase use tech-blog-moomookcow
```

### Step 2: GitHub Actions 활성화

```bash
firebase init hosting:github
```

## 3. 자동 배포 테스트

### Step 1: 코드 수정

```bash
# README.md 수정
echo "## 테스트 업데이트" >> README.md
```

### Step 2: 커밋 및 푸시

```bash
git add .
git commit -m "test: 자동 배포 테스트"
git push origin main
```

### Step 3: 배포 확인

- GitHub Actions 탭에서 배포 진행 상황 확인
- https://tech-blog-moomookcow.web.app 접속하여 변경사항 확인

## 4. 문제 해결

### Firebase CLI 오류

```bash
# Firebase CLI 업데이트
npm install -g firebase-tools@latest

# 로그인 확인
firebase login --reauth
```

### GitHub Actions 오류

- Firebase Service Account JSON이 올바른지 확인
- GitHub Secrets에 정확히 설정되었는지 확인
- Firebase 프로젝트 ID가 일치하는지 확인

## 5. 보안 주의사항

- Service Account JSON 파일을 절대 공개 저장소에 커밋하지 마세요
- GitHub Secrets에만 저장하고 로컬에서는 삭제하세요
- 정기적으로 Service Account 키를 갱신하세요
