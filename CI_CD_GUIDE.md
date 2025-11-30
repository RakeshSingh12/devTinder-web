# 🚀 CI/CD Pipeline Guide

This project uses **GitHub Actions** for Continuous Integration and Continuous Deployment (CI/CD). The pipeline is defined in `.github/workflows/ci-cd.yml`.

## 🔄 Workflow Overview

The pipeline automatically handles testing, building, and deploying the application.

### Triggers
The workflow is triggered by:
- **Push to `main`**: Runs tests, builds the app, and deploys to GitHub Pages.
- **Pull Request to `main`**: Runs tests and builds the app to ensure code quality (no deployment).
- **Manual Dispatch**: Can be triggered manually from the GitHub Actions tab.

## 🛠️ Jobs

### 1. Test (`test`)
- **Environment**: Ubuntu Latest, Node.js 20
- **Steps**:
    1. Checkout code
    2. Install dependencies (`npm ci`)
    3. Run tests (`npm run test`) using **Vitest**

### 2. Build (`build`)
- **Depends on**: `test` (only runs if tests pass)
- **Environment**: Ubuntu Latest, Node.js 20
- **Steps**:
    1. Checkout code
    2. Install dependencies
    3. Build application (`npm run build`)
    4. Upload build artifact (`dist` folder)

### 3. Deploy (`deploy`)
- **Depends on**: `build` (only runs if build succeeds)
- **Condition**: Only runs on `push` to `main` branch
- **Environment**: `github-pages`
- **Steps**:
    1. Deploy artifact to GitHub Pages

## 📦 Setup & Configuration

### Prerequisites
1.  **GitHub Repository**: The project must be hosted on GitHub.
2.  **GitHub Pages**: Must be enabled in repository settings.
    - Go to **Settings** > **Pages**
    - Source: **GitHub Actions**

### Secrets
No secrets are required for the default setup as `GITHUB_TOKEN` is used automatically.

## 🔍 Monitoring

You can monitor the status of your pipelines in the **Actions** tab of your GitHub repository.
- ✅ **Green Check**: Success
- ❌ **Red X**: Failure (Check logs for details)
- 🟡 **Yellow Circle**: Running

## 🚨 Troubleshooting

### Common Issues
- **Test Failure**: Check the `test` job logs. Run `npm run test` locally to debug.
- **Build Failure**: Check `build` job logs. Ensure `npm run build` works locally.
- **Deployment Permission Error**: Ensure GitHub Pages source is set to "GitHub Actions" in settings.

---
*Generated for DevTinder Web Application*
