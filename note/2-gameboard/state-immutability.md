
# React 中應避免直接修改 state（Immutability 原則）| Avoid Direct State Mutation in React (Immutability Principle)

在 React 中，state 是用來驅動 UI 更新的重要資料來源。為了讓 React 正確追蹤狀態的改變並重新渲染畫面，你必須遵守不可變性（Immutability）原則，也就是：不要直接修改 state，而是要回傳一個新的資料結構。

>In React, `state` is the core data used to drive UI updates. To let React correctly detect changes and re-render the UI, you must follow the principle of **immutability**, which means: **Do not modify state directly—always return a new data structure.**

---

## ✅ 正確做法：產生新的陣列 | Correct Approach: Create a New Array

```tsx
const handleSelectedSquare = (rowIndex: number, colIndex: number) => {
  setGameBoard((prev) => {
    const updatedGameBoard = [...prev.map(innerArr => [...innerArr])]
    if (updatedGameBoard[rowIndex][colIndex] === null) {
      updatedGameBoard[rowIndex][colIndex] = 'X'
    }
    return updatedGameBoard
  })
}
```

- 使用展開運算子（`...`）創造新的二維陣列  
- 沒有直接修改 `prev`，而是回傳一個新的陣列  
- React 可以偵測到 state 的 reference 改變，從而觸發重新渲染

>- Use spread syntax (`...`) to create a new 2D array  
>- Do **not** mutate `prev`; instead, return a new array  
>- React detects the new reference and triggers a re-render

---

## ❌ 錯誤做法：直接修改原本的 state | Incorrect Approach: Mutating the Original State

```tsx
const handleSelectedSquare1 = (rowIndex: number, colIndex: number) => {
  setGameBoard((prev) => {
    if (prev[rowIndex][colIndex] === null) {
      prev[rowIndex][colIndex] = 'X'
    }
    return prev
  })
}
```

- 直接修改 `prev` 的內容  
- 回傳的仍是原本的 reference  
- React 無法得知 state 改變，可能不會重新渲染畫面  
- 容易導致 UI 錯誤與資料不一致

> - Mutates `prev` directly  
> - Returns the same reference  
> - React may not detect the change → no re-render  
> - Easily leads to UI bugs and data inconsistency

---

## 💡 為什麼不能直接改 state？ | Why You Shouldn’t Mutate State Directly

| 項目 | 說明 | Description |
|------|------|-------------|
| ✅ 新的參考值<br>New Reference | 回傳新資料讓 React 知道資料變了<br>Returning a new reference tells React the data has changed | 
| ❌ 修改原資料<br>Mutating Original | React 不會察覺資料內容變更<br>React cannot detect internal changes to the same object |
| 🔄 更新 UI<br>UI Update | 必須讓 React 能夠偵測 state 改變才能觸發畫面更新<br>React re-renders only when it sees a new state reference |

---

## 📌 結論 | Conclusion

 永遠不要直接修改 React 的 state。  
 使用淺層複製（如 `...` 展開運算子）或深層複製方式創造新的物件或陣列，再回傳給 `setState`。這是讓你的 React 應用能夠正常運作的基礎原則之一。

> **Never mutate React state directly.**  
> Always create and return a **new** object or array (using shallow or deep copy) when updating state. This is one of the core principles for React apps to behave correctly.
