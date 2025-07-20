
# 📘 Derived State in React（React 中的衍生狀態）

## 🌟 什麼是 Derived State？ | What is Derived State?

**Derived state** 指的是一種從現有的 props 或 state 推導（derive）出來的資料，而不是自己額外儲存的 state。這能減少資料冗餘並提升一致性。
>**Derived state** refers to data that can be computed from props or existing state, rather than storing it separately using `useState`. It reduces redundancy and improves consistency.

## 🎯 使用情境 | Use Case

```tsx
interface GameTurn {
  square: { rowIndex: number, colIndex: number },
  player: 'X' | 'O'
}

const initialGameBoard: (null | 'X' | 'O')[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

export default function GameBoard({ turns }: { turns: GameTurn[] }) {
  const gameBoard = initialGameBoard.map(row => [...row]);

  turns.forEach(turn => {
    gameBoard[turn.square.rowIndex][turn.square.colIndex] = turn.player;
  });

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((col, colIndex) => (
              <li key={colIndex}>
                <button>{col}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  )
}
```

### ✅ `gameBoard` 是 derived state

- 它不是透過 `useState` 儲存的。
- 它是根據傳入的 `turns` 陣列推導而來。
- 每次重新渲染（render）都會自動根據最新資料計算，不需手動同步。

>- It’s **not** stored via `useState`.
>- It is **derived** from the `turns` prop.
>- It updates automatically based on `turns` each render, no sync needed.

---

## 💡 為什麼要使用 Derived State？ | Why Use Derived State?

| 比較項目   | 狀況 A：獨立用 useState 儲存 | 狀況 B：從其他資料 derive（推導） |
| ---------- | ---------------------------- | --------------------------------- |
| 易於同步   | ❌ 需要手動維護               | ✅ 自動從來源推導，一致性高        |
| 程式碼簡潔 | ❌ 較複雜，容易出錯           | ✅ 只需維護來源即可                |
| 資料一致性 | ❌ 容易錯位                   | ✅ 不會不一致                      |

| Criteria         | Case A: Stored with useState | Case B: Derived from other state   |
| ---------------- | ---------------------------- | ---------------------------------- |
| Easy to sync     | ❌ Manual sync required       | ✅ Auto-calculated, always accurate |
| Code simplicity  | ❌ More complex               | ✅ Cleaner and easier to manage     |
| Data consistency | ❌ Risk of mismatch           | ✅ Guaranteed consistency           |

---

## 🧾 總結 | Summary

- ✅ 如果資料是可以從現有 props 或 state 計算出來的，**不要用 useState 儲存**。
- ✅ 使用 derived state 可以讓元件更簡潔、更一致。
- ⚠️ 如果運算成本高，可搭配 `useMemo` 做效能優化。

>- ✅ If a value can be calculated from other state or props, don’t store it via `useState`.
>- ✅ Derived state leads to simpler, more maintainable components.
>- ⚠️ Use `useMemo` if computation is expensive.
