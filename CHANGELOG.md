# Changelog

## [1.2.0](https://github.com/CharefAhmed/InsightPulse-DevOps/compare/v1.1.9...v1.2.0) (2026-08-18)


### Features

* **ci:** enforce Trivy security gate before push with all CRITICAL CVEs remediated ([e1866fc](https://github.com/CharefAhmed/InsightPulse-DevOps/commit/e1866fcc2acf3b60332f9686d3349fac49946989))

## [1.1.9](https://github.com/CharefAhmed/InsightPulse-DevOps/compare/v1.1.8...v1.1.9) (2026-08-18)


### Bug Fixes

* patch OS CVEs via apt/apk upgrade, update npm to fix tar CVE, ignore unfixable CVEs in Trivy ([09b752e](https://github.com/CharefAhmed/InsightPulse-DevOps/commit/09b752eb94e130cd2374a4e7e0377d1fa5cec873))

## [1.1.8](https://github.com/CharefAhmed/InsightPulse-DevOps/compare/v1.1.7...v1.1.8) (2026-08-18)


### Bug Fixes

* use exact image tag from metadata-action for Trivy scan to fix empty version errors on workflow_dispatch ([897ee11](https://github.com/CharefAhmed/InsightPulse-DevOps/commit/897ee117b31a57e10cc0cee701e90e01b6f2e396))

## [1.1.7](https://github.com/CharefAhmed/InsightPulse-DevOps/compare/v1.1.6...v1.1.7) (2026-08-18)


### Bug Fixes

* remove npm@latest and upgrade to node:24 to solve docker build failure and eliminate native tar CVE ([e88b22f](https://github.com/CharefAhmed/InsightPulse-DevOps/commit/e88b22f966ec2cbd6b374e5d4e330a4aa0741e97))

## [1.1.6](https://github.com/CharefAhmed/InsightPulse-DevOps/compare/v1.1.5...v1.1.6) (2026-08-18)


### Bug Fixes

* revert faulty lowercase IMAGE_OWNER logic which broke Trivy scan ([78f726b](https://github.com/CharefAhmed/InsightPulse-DevOps/commit/78f726b84d18cef478c077a7a05971a838c56483))

## [1.1.5](https://github.com/CharefAhmed/InsightPulse-DevOps/compare/v1.1.4...v1.1.5) (2026-08-18)


### Bug Fixes

* update global npm in Dockerfiles to patch pre-installed tar vulnerability ([8b8a7d4](https://github.com/CharefAhmed/InsightPulse-DevOps/commit/8b8a7d4b311e761e6297c6b7a9404ff682558374))

## [1.1.4](https://github.com/CharefAhmed/InsightPulse-DevOps/compare/v1.1.3...v1.1.4) (2026-08-18)


### Bug Fixes

* remediate CRITICAL CVEs in backend and frontend ([1bb6141](https://github.com/CharefAhmed/InsightPulse-DevOps/commit/1bb6141545ac9dd046dd265999fe2df010235b22))

## [1.1.3](https://github.com/CharefAhmed/InsightPulse-DevOps/compare/v1.1.2...v1.1.3) (2026-08-18)


### Bug Fixes

* lowercase IMAGE_OWNER in trivy image-ref ([cb3b808](https://github.com/CharefAhmed/InsightPulse-DevOps/commit/cb3b8080f3d65b138f4f0485d6e109784a58f52f))

## [1.1.2](https://github.com/CharefAhmed/InsightPulse-DevOps/compare/v1.1.1...v1.1.2) (2026-08-18)


### Bug Fixes

* update trivy-action to v0.28.0 ([00e1a7c](https://github.com/CharefAhmed/InsightPulse-DevOps/commit/00e1a7c40e17f8d4bba229126a45c9739584f99d))
* use master branch for trivy-action to resolve setup-trivy dependency ([c8cd4aa](https://github.com/CharefAhmed/InsightPulse-DevOps/commit/c8cd4aaba335626ae93c856d15404ed51f4c38a2))

## [1.1.1](https://github.com/CharefAhmed/InsightPulse-DevOps/compare/v1.1.0...v1.1.1) (2026-08-16)


### Bug Fixes

* **backend:** bind NestJS to 0.0.0.0 to fix Docker connectivity ([5a7f806](https://github.com/CharefAhmed/InsightPulse-DevOps/commit/5a7f806a58256f27c82b4da4e21598c61f3522ca))

## [1.1.0](https://github.com/CharefAhmed/InsightPulse-DevOps/compare/v1.0.1...v1.1.0) (2026-08-15)


### Features

* **backend:** add health, ready, version and metrics endpoints for Kubernetes and observability ([7b555f1](https://github.com/CharefAhmed/InsightPulse-DevOps/commit/7b555f1fbb9496da16c808cdcfdab4497ef84e20))

## [1.0.1](https://github.com/CharefAhmed/InsightPulse-DevOps/compare/v1.0.0...v1.0.1) (2026-08-14)


### Bug Fixes

* remove unused imports to resolve linting errors ([afd1834](https://github.com/CharefAhmed/InsightPulse-DevOps/commit/afd18348fc389f2e260dd84fea271bf49370b789))

## 1.0.0 (2026-08-14)


### Features

* add comments module controller and service ([6fb6563](https://github.com/CharefAhmed/InsightPulse-DevOps/commit/6fb65635876ce1a99125b57a878c6ad03c02bd7d))
* add GitHub Actions CI workflows ([70d2ef4](https://github.com/CharefAhmed/InsightPulse-DevOps/commit/70d2ef4bec7cea01c1fb663740181645621e4fed))
* add unit tests for backend and frontend ([75986d3](https://github.com/CharefAhmed/InsightPulse-DevOps/commit/75986d39599d89d00c1dc41b6a4622b2fc4c3de1))
* update comment module with DTOs and service logic ([2b8c7b5](https://github.com/CharefAhmed/InsightPulse-DevOps/commit/2b8c7b505c8c5e3809726dd57565644b6db17d30))


### Bug Fixes

* add prodName to comment table ([4874d06](https://github.com/CharefAhmed/InsightPulse-DevOps/commit/4874d063ee7e88c1d72f93f5f81e4e22589d18f7))
