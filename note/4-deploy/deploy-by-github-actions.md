# 📘 GitHub Actions 部署 Vite + React 專案筆記（中英對照）

## 📁 設定 `vite.config.js`

```ts
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/your-repo-name/', // 替換為你的 repository 名稱 Replace with your repo name
  plugins: [react()],
})
```

---

## 🛠️ 設定 GitHub Actions 工作流程

建立 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main # 或你的預設分支 or your default branch

jobs:
 build-and-deploy:
  runs-on: ubuntu-latest

  steps:
   - name: Checkout code
     uses: actions/checkout@v4

   - name: Setup Node.js
     uses: actions/setup-node@v4
     with:
      node-version: 20

   - name: Install dependencies
     run: npm install

   - name: TypeScript Build (tsc)
     run: npx tsc -b

   - name: Vite Build
     run: npm run build

   - name: Deploy to GitHub Pages
     uses: peaceiris/actions-gh-pages@v4
     with:
      github_token: ${{ secrets.GITHUB_TOKEN }}
      publish_dir: ./dist
```

---

## 📄 修改 `package.json`

新增部署 script：

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
}
```

---

## ✅ 提交並推送

```bash
git add .
git commit -m "setup GitHub Actions deploy"
git push
```

---

## 🌐 查看部署結果

部署完成後，GitHub Pages 網址為：

```
https://your-username.github.io/your-repo-name/
```

你可以在 GitHub → Settings → Pages 查看網址。
