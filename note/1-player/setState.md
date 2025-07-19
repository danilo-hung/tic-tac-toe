# 為什麼使用 `setState(prev => !prev)` 而不是 `setState(!state)`
> React Note: Why use `setState(prev => !prev)` instead of `setState(!state)` -  
## 📌 重點說明 | Key Point

在 React 中更新 state 時，應優先使用「函式型更新法（functional update）」，特別是當新的 state 依賴於前一個 state 時。  
In React, you should prefer **functional updates** when the new state depends on the previous state.

```tsx
// ✅ 推薦做法 | Recommended
setState(prev => !prev);

// 🚫 潛在錯誤做法 | Risky
setState(!state);
```

---

## 🧠 為什麼這麼做？| Why Use Functional Updates?

### 1. `setState` 是非同步的 (`setState` is asynchronous )

React 的 `setState` 不會馬上更新 `state`，在 `setState(!state)` 時，你可能拿到的是舊的 state 值。  
React does **not** update `state` immediately. If you use `setState(!state)`, you might be using a stale value.

### 2. 函式型更新法保證最新值 (Functional updates ensure up-to-date values)

使用 `setState(prev => !prev)` 能保證你取得**最新的 state**，即使有多個更新同時發生也不會出錯。  
With `setState(prev => !prev)`, you're guaranteed to receive the **most current state**, even if multiple updates are triggered quickly.

---

## 📖 範例比較 | Example Comparison

### ❌ 錯誤：可能切換失效  
### ❌ Incorrect: Toggle may not work as expected

```tsx
const [isOpen, setIsOpen] = useState(false);

const toggle = () => {
  setIsOpen(!isOpen);
  setIsOpen(!isOpen); // 第二次仍是舊值，不會變動
};
```

結果：你以為會切換兩次，但實際上只變一次。  
Result: You think it toggles twice, but it only toggles once.

---

### ✅ 正確：保證依據最新值切換  
### ✅ Correct: Guaranteed to toggle with latest state

```tsx
const [isOpen, setIsOpen] = useState(false);

const toggle = () => {
  setIsOpen(prev => !prev);
  setIsOpen(prev => !prev); // 每次根據最新值運作
};
```

結果：如預期地切換兩次。  
Result: Toggles twice as expected.

---

## ✅ 什麼時候用 `prev => ...`？  
## ✅ When should you use `prev => ...`?

- 當新的 state **依賴** 舊 state 計算時  
- When the new state **depends on** the previous one
- 快速觸發或多次事件更新時  
- When multiple `setState` calls happen quickly (e.g., rapid clicks)

---

## 🧪 小技巧 | Pro Tips

```tsx
setCount(prev => prev + 1);   // 避免 stale state | Avoid stale state
setIsEditing(prev => !prev);  // 切換開關 | Toggle boolean state
```

---

## 📚 總結 | Summary

| 寫法 | 安全性 | 說明 | Writing Style | Safety | Notes |
|------|--------|------|---------------|--------|-------|
| `setState(!state)` | ❌ 不安全 | 可能使用舊值 | `setState(!state)` | ❌ Unsafe | Might use stale value |
| `setState(prev => !prev)` | ✅ 安全 | 使用最新值 | `setState(prev => !prev)` | ✅ Safe | Always uses latest state |

---
