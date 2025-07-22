# 🚀 部署 Vite + React 專案到 GitHub Pages | Deploy a Vite+React Project to GitHub

## 步驟一：安裝 gh-pages 套件  
> **Step 1: Install gh-pages package**

```bash
npm install gh-pages --save-dev
```

---

## 步驟二：設定 `vite.config.js` 的 base 路徑  
> **Step 2: Set the `base` path in `vite.config.js`**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 替換成你的 GitHub 用戶名與 Repo 名稱
// Replace with your GitHub username and repository name
export default defineConfig({
  base: '/你的-repo名稱/',  // e.g. /tic-tac-toe/
  plugins: [react()],
});
```

---

## 步驟三：在 `package.json` 加入部署指令  
> **Step 3: Add deploy script to `package.json`**

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "npm run build && gh-pages -d dist"
}
```

---

## 步驟四：執行部署指令  
> **Step 4: Run the deploy command**

```bash
npm run deploy
```

這會自動把 `dist/` 資料夾推送到 `gh-pages` 分支  
>This will push the `dist/` folder to the `gh-pages` branch.

---

## 步驟五：在 GitHub 設定 GitHub Pages  
> **Step 5: Set GitHub Pages settings in your repository**

1. 前往 GitHub → Repository → `Settings` → `Pages`  
2. 選擇 `Deploy from a branch`  
3. 選擇 `gh-pages` 分支 和 `/ (root)` 資料夾    
4. 儲存設定 

>1. Go to GitHub → Repository → `Settings` → `Pages`
>2. Select `Deploy from a branch`
>3. Choose branch: `gh-pages` and folder: `/ (root)`
>4. Save

---

## 完成 ✅  
> **Done ✅**

幾秒鐘後你就可以訪問：  
> You can visit:

```
https://<你的 GitHub 帳號>.github.io/<你的-repo名稱>/
```

---

## 常見問題 FAQ

### ❓ 頁面空白？
通常是 `vite.config.js` 的 `base` 設定錯誤，請使用 `/repo-name/`

### ❓ 沒看到部署結果？
請確認是否成功安裝 `gh-pages` 並有正確執行 `npm run deploy`
