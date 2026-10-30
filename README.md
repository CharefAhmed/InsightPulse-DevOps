# InsightPulse — DevOps Edition

> A sentiment analysis dashboard for customer comments, extended with a full DevOps chain: CI/CD, containerization, infrastructure as code, Kubernetes orchestration, and observability.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [CI/CD Pipelines](#cicd-pipelines)
- [Infrastructure (Terraform + OVHcloud)](#infrastructure-terraform--ovhcloud)
- [Kubernetes Deployment (K3s + Helm)](#kubernetes-deployment-k3s--helm)
- [Observability (Prometheus + Grafana)](#observability-prometheus--grafana)
- [Getting Started Locally](#getting-started-locally)
- [Environment Variables](#environment-variables)
- [Versioning & Changelog](#versioning--changelog)

---

## Overview

**InsightPulse** is a fullstack web application that lets users import customer feedback (CSV / manual), run AI-powered sentiment analysis on each comment (positive / neutral / negative), and explore the results through an interactive dashboard with charts and filters.

This repository is the **DevOps edition** — the original web application built during a 2025 internship was taken as a base and extended with a complete DevOps pipeline covering:

- 🐳 **Containerization** — Docker & Docker Compose for local development
- ⚙️ **CI/CD** — GitHub Actions (test, build, security scan, release, deploy, destroy)
- 🔒 **Security** — Trivy image scanning + `npm audit` gate before any push to GHCR
- 📦 **IaC** — Terraform on OVHcloud OpenStack (staging + production environments)
- ☸️ **Kubernetes** — K3s cluster provisioned by Ansible, app deployed via Helm
- 📊 **Observability** — kube-prometheus-stack (Prometheus + Grafana + Alertmanager) with a custom InsightPulse dashboard and Slack alerting
- 🚀 **Release automation** — Release Please (Conventional Commits → CHANGELOG → semver tags)

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     GitHub Actions                       │
│                                                         │
│  test.yml ──► build-push.yml ──► deploy.yml             │
│  (lint+test)   (build+trivy+push  (terraform+ansible    │
│                 to GHCR)           +helm)                │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│               OVHcloud OpenStack VM                      │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │               K3s Cluster                        │   │
│  │                                                  │   │
│  │  namespace: insightpulse-staging  (active)       │   │
│  │  ┌────────────┐  ┌─────────────┐  ┌──────────┐  │   │
│  │  │  Frontend  │  │   Backend   │  │PostgreSQL│  │   │
│  │  │  (React)   │◄─│  (NestJS)   │◄─│ (Bitnami)│  │   │
│  │  └────────────┘  └─────────────┘  └──────────┘  │   │
│  │                                                  │   │
│  │  namespace: insightpulse-production  (ready*)    │   │
│  │  ┌────────────┐  ┌─────────────┐  ┌──────────┐  │   │
│  │  │  Frontend  │  │   Backend   │  │PostgreSQL│  │   │
│  │  │  (React)   │◄─│  (NestJS)   │◄─│ (Bitnami)│  │   │
│  │  └────────────┘  └─────────────┘  └──────────┘  │   │
│  │                                                  │   │
│  │  namespace: monitoring                           │   │
│  │  ┌──────────────────────────────────────────┐   │   │
│  │  │  kube-prometheus-stack                   │   │   │
│  │  │  Prometheus + Grafana + Alertmanager     │   │   │
│  │  └──────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  Public URL: https://<PUBLIC_IP>.nip.io                 │
└─────────────────────────────────────────────────────────┘
```
> \* Production environment is fully configured (`terraform/production/`, `helm/insightpulse/values-production.yaml`) but gated behind a GitHub Release trigger and commented out for cost control.

---

## Tech Stack

### Application
| Layer | Technology |
|---|---|
| Frontend | React, Chart.js, Axios |
| Backend | NestJS, Passport.js (JWT + Local), Prisma ORM |
| Database | PostgreSQL 15 |
| AI / Sentiment | Groq API (LLM-based sentiment classification) |

### DevOps
| Area | Technology |
|---|---|
| Containerization | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| Container Registry | GitHub Container Registry (GHCR) |
| Security Scanning | Trivy (CRITICAL gate), npm audit |
| IaC | Terraform (OpenStack provider) |
| Cloud | OVHcloud (OpenStack) |
| Configuration Mgmt | Ansible |
| Kubernetes | K3s (lightweight Kubernetes) |
| Package Manager (K8s) | Helm |
| Monitoring | Prometheus, Grafana, Alertmanager |
| Alerting | Slack webhooks |
| Release Automation | Release Please (Conventional Commits) |

---

## Project Structure

```
InsightPulse/
├── .github/
│   ├── workflows/
│   │   ├── test.yml            # Lint & unit tests (PR + push to main)
│   │   ├── build-push.yml      # Docker build, Trivy scan, push to GHCR (on tag)
│   │   ├── deploy.yml          # Terraform + Ansible + Helm deploy
│   │   ├── destroy.yml         # Manual infra teardown (with confirmation gate)
│   │   └── release-please.yml  # Automated versioning & CHANGELOG
│   └── act-events/             # Local workflow testing events (act)
│
├── backend/                    # NestJS application
│   ├── src/
│   │   ├── auth/               # JWT + Local auth strategies & guards
│   │   ├── comments/           # Comments CRUD
│   │   ├── sentiment/          # Groq API sentiment analysis
│   │   ├── upload/             # CSV file upload & parsing
│   │   ├── users/              # User management
│   │   ├── health/             # /health, /ready, /metrics endpoints
│   │   └── database/           # Prisma service
│   ├── prisma/schema.prisma    # DB schema (comment, AnalysisResult, user)
│   └── Dockerfile
│
├── frontend/react_app/         # React application
│   ├── src/
│   │   ├── api/                # Axios API calls
│   │   ├── components/         # UI components (Dashboard, Upload, Login…)
│   │   ├── context/            # DataContext (global state)
│   │   └── pages/              # Home, Import, Login pages
│   └── Dockerfile
│
├── terraform/
│   ├── global/modules/         # Reusable modules: compute, security
│   ├── staging/                # Staging environment (tfvars, backend, main)
│   └── production/             # Production environment (cost-controlled, commented out)
│
├── helm/                       # Helm charts
│   ├── insightpulse/           # Custom chart (backend + frontend + ingress)
│   └── monitoring/             # kube-prometheus-stack values + custom dashboard
│
├── ansible/                    # Playbooks for VM configuration & K3s installation
│
├── docker-compose.yml          # Local dev (build from source)
├── docker-compose.ghcr.yml     # Local dev (pull from GHCR)
└── Taskfile.yaml               # Task runner shortcuts
```

---

## CI/CD Pipelines

### `test.yml` — Lint & Tests
Triggered on every **PR** and **push to `main`**.

- Uses `dorny/paths-filter` to detect whether `backend/` or `frontend/` changed
- Skips unchanged components (no wasted runner minutes)
- Runs: **ESLint** + **Jest unit tests** for each changed component

### `build-push.yml` — Build, Scan & Push
Triggered on **semver tags** (`v*.*.*`) or manual dispatch.

- Builds Docker images for `backend` and `frontend` in parallel (matrix)
- Runs `npm audit --audit-level=critical` as a dependency gate
- Scans built image with **Trivy** (CRITICAL severity) — **blocks push on findings**
- Pushes to **GHCR** only if the security gate passes
- Uploads Trivy SARIF report to the **GitHub Security tab**
- Uses **GitHub Actions cache** (`type=gha`) for faster builds

### `deploy.yml` — Infrastructure + Deploy
Triggered on **push to `main`** (staging) or **manual dispatch**.

**Job 1 — `plan`**: Terraform fmt + init + validate + plan. Posts plan diff as PR comment.

**Job 2 — `apply`**: 
- Terraform apply (provisions OVHcloud VM)
- Derives SSH public key from private key at runtime (no extra secret needed)
- Installs Ansible + runs `site.yml` playbook (OS setup + K3s installation)
- Health check: `kubectl get nodes && kubectl get pods`

**Job 3 — `deploy`**:
- Downloads kubeconfig from VM via SCP, patches loopback → public IP
- Creates GHCR image pull secret (idempotent)
- Deploys **kube-prometheus-stack** (monitoring namespace)
- Applies custom **InsightPulse Grafana dashboard** via ConfigMap
- Deploys **PostgreSQL** as an independent Helm release (safe from app rollbacks)
- Deploys **InsightPulse** Helm chart (`--atomic` + `--wait` for safe rollout)
- Verifies rollout status for both deployments
- Prints deployment summary with public URL

### `destroy.yml` — Infra Teardown
Manual only. Requires typing `"YES"` as confirmation. Runs `terraform destroy`.

### `release-please.yml` — Automated Releases
- Analyzes Conventional Commits on `main`
- Opens/updates a Release PR with bumped `package.json` version + `CHANGELOG.md`
- On PR merge: creates a GitHub Tag (`v1.x.x`) that triggers `build-push.yml`

---

## Infrastructure (Terraform + OVHcloud)

The infrastructure is defined in **Terraform** using the OpenStack provider targeting **OVHcloud**.

```
terraform/
├── global/modules/
│   ├── compute/     # OpenStack compute instance
│   └── security/    # Security groups (SSH, HTTP, HTTPS, K3s API)
├── staging/         # d2-4 (2 vCore / 4 GB RAM) — auto-deployed on push to main
└── production/      # Commented out for cost control — uncomment for release deploys
```

State is stored remotely in **Terraform Cloud** (configured via `TF_API_TOKEN`).

SSH keys are never stored as raw secrets — the private key is base64-encoded in GitHub Secrets, decoded at runtime, and the public key is derived with `ssh-keygen -y`.

---

## Kubernetes Deployment (K3s + Helm)

### K3s
A lightweight Kubernetes distribution installed on the OVHcloud VM by the Ansible playbook. Chosen for its low resource footprint, perfect for a single-node OVH d2-4 instance.

### Helm Chart — InsightPulse
Custom chart located in `helm/insightpulse/`. Supports environment-specific overrides:
- `values.yaml` — base values
- `values-staging.yaml` — staging overrides
- `values-production.yaml` — production overrides

Key design decisions:
- **PostgreSQL is a separate Helm release** (`insightpulse-db`) — rolling back or uninstalling the app never touches the database PVC
- **Secrets are never in the chart** — injected at deploy time via `kubectl create secret` from GitHub Actions secrets
- **Image tag** = `sha-<commit-sha>` for deterministic traceability
- **Ingress host** = `<PUBLIC_IP>.nip.io` (free wildcard DNS, no domain purchase needed)
- `--atomic` flag: auto-rollback on deployment failure

---

## Observability (Prometheus + Grafana)

Deployed via `kube-prometheus-stack` in the `monitoring` namespace (independent of the app release).

Includes:
- **Prometheus** — metrics collection
- **Grafana** — dashboards (admin password from GitHub Secret)
- **Alertmanager** — alert routing to **Slack** (webhook URL injected via `sed` at deploy time, never stored in the repo)
- **kube-state-metrics** + **node-exporter** — cluster and node metrics
- **Custom InsightPulse dashboard** — auto-loaded via Grafana sidecar ConfigMap label (`grafana_dashboard=1`)

---

## Getting Started Locally

### Prerequisites
- Docker & Docker Compose
- Node.js 20+
- A `.env` file (see [Environment Variables](#environment-variables))

### Option 1 — Build from source

```bash
git clone https://github.com/CharefAhmed/InsightPulse-DevOps.git
cd InsightPulse-DevOps
cp .env.example .env   # fill in your values
docker compose up --build
```

### Option 2 — Pull from GHCR (pre-built images)

```bash
docker compose -f docker-compose.ghcr.yml up
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3001 |
| Backend API | http://localhost:5000 |
| PostgreSQL | localhost:5433 |

---

## Environment Variables

Create a `.env` file at the project root:

```env
# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=InsightPulse

# Backend
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/InsightPulse
JWT_SECRET=your_jwt_secret
REFRESH_JWT_SECRET=your_refresh_jwt_secret

# AI
GROQ_API_KEY=your_groq_api_key
```

> [!CAUTION]
> Never commit your `.env` file. It is already listed in `.gitignore`.

---

## GitHub Actions Secrets

The following secrets must be configured in your repository's **Settings → Secrets and variables → Actions**:

### Application Secrets
| Secret | Description |
|---|---|
| `DATABASE_URL` | Full PostgreSQL connection string for the K8s backend pod |
| `JWT_SECRET` | Secret key for signing JWT access tokens |
| `REFRESH_JWT_SECRET` | Secret key for signing JWT refresh tokens |
| `GROQ_API_KEY` | API key for the Groq LLM sentiment analysis service |
| `POSTGRES_PASSWORD` | PostgreSQL password (used by the Bitnami Helm chart) |

### Infrastructure Secrets
| Secret | Description |
|---|---|
| `OVH_OS_AUTH_URL` | OVHcloud OpenStack identity endpoint |
| `OVH_OS_USERNAME` | OpenStack username |
| `OVH_OS_PASSWORD` | OpenStack password |
| `OVH_OS_TENANT_NAME` | OpenStack project name |
| `OVH_OS_TENANT_ID` | OpenStack project ID |
| `OVH_OS_REGION_NAME` | OVHcloud region (e.g. `GRA9`) |
| `TF_API_TOKEN` | Terraform Cloud token for remote state backend |
| `ANSIBLE_SSH_PRIVATE_KEY` | Base64-encoded SSH private key for Ansible/VM access |

### CI/CD & Observability Secrets
| Secret | Description |
|---|---|
| `MY_PAT_TOKEN` | GitHub Personal Access Token (for Release Please PR creation and Terraform plan comments) |
| `GRAFANA_ADMIN_PASSWORD` | Grafana admin password |
| `SLACK_WEBHOOK_URL` | Slack incoming webhook URL for Alertmanager notifications |

---

## Versioning & Changelog

This project follows **[Conventional Commits](https://www.conventionalcommits.org/)** and uses **[Release Please](https://github.com/googleapis/release-please)** for automated versioning.

Current version: **v1.4.2**

See the full [CHANGELOG](./CHANGELOG.md) for the complete history.

---

## Author

**Ahmed Charef** — Embedded Systems & IoT Engineering Student  
Passionate about DevOps, cloud infrastructure, and building end-to-end automated pipelines.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ahmed%20Charef-blue?logo=linkedin)](https://www.linkedin.com/in/ahmed-charef)
[![GitHub](https://img.shields.io/badge/GitHub-CharefAhmed-black?logo=github)](https://github.com/CharefAhmed)
