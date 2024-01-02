# CI/CD 란 무엇인가 ?

CI/CD (Continuous Integration/Continuous Delivery)는 어플리케이션 개발 단계를 '자동화'하여 어플리케이션을 더욱 짧은 주기로 고객에게 제공하는 방법이다. CI/CD 의기본 개념은 지속적인 통합, 지속적인 서비스 제공, 지속적인 배포이다. (DevOps 의 핵심 업무 중 하나)


### 지속적인 통합 (CI)

어플리케이션의 새로운 코드 변경 사항이 정기적으로 빌드 및 테스트 되어 공유 레포지토리에 통합되는 것을 의미한다. 이러한 CI 의 핵심 목표는 버그를 신속하게 찾아 해결하고, 소프트웨어의 품질을 개선하고, 새로운 업데이트의 검증 및 릴리즈 시간을 단축시키는 것에 있다.


### 지속적인 배포 (CD)

D 를 Delivery 또는 Depolyment 의 약자로 볼 수 있는데, Delivery 는 공유 레포지토리로 자동으로 Release 하는 것, Deployment 는 production 레벨 까지 자동으로 deploy 하는 것을 의미한다. CD 는 개발자의 변경 사항이 레포지토리를 넘어, 고객의 프로덕션 환경까지 릴리즈 되는 것을 의미한다.

---

# Kupply 에 적용된 CI/CD 코드
ci/cd 세팅을 위해 총 4개의 파일이 작성되었다.
- [x] .dockerignore
- [x] .github/workflows/cicd.yml
- [x] dockerfile
- [x] package.json
