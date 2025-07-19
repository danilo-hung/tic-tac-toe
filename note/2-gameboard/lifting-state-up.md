# React 筆記：Lifting State Up（提升狀態）

## 🧠 概念說明｜Concept

Lifting State Up 是 React 中的狀態管理技巧。  
當多個子元件需要共享某個狀態，應該將該狀態提升到它們的最近共同父元件中。

> Lifting State Up is a state management pattern in React.  
> When multiple child components need to share a state, lift the state up to their closest common parent component.

---

## 🎯 使用時機｜When to Use

- 多個元件要共用同一份資料（如目前玩家、輸入內容）。
- 一個元件的狀態變動會影響到其他元件。

> - When multiple components need to share the same data (e.g. current player, input text).
> - When a change in one component affects another.

---

## ✅ 實際範例｜Real Example

### 狀態提升位置：`App` 元件

```tsx
const [activePlayerSymbol, setActivePlayerSymbol] = useState<'X' | 'O'>('X');
```

### 狀態透過 props 傳給子元件：

```tsx
<Player ... activePlayerSymbol={activePlayerSymbol} />
<GameBoard ... activePlayerSymbol={activePlayerSymbol} />
```

### 子元件觸發狀態更新：

```tsx
onSelectSquare(); // 在 GameBoard 中觸發
```

```tsx
const handleSelectSquare = () => {
  setActivePlayerSymbol(prev => prev === 'X' ? 'O' : 'X');
};
```

---

## 📌 關鍵點｜Key Points

| 元件         | 狀態使用                           | 說明                                                   |
|--------------|------------------------------------|--------------------------------------------------------|
| `App`        | 定義 `activePlayerSymbol`         | 父層集中管理，目前輪到誰                              |
| `Player`     | 透過 props 取得狀態               | 根據目前玩家設定亮起樣式（例如 className='active'）   |
| `GameBoard`  | 透過 props 使用與改變該狀態       | 決定棋盤格子要放 'X' 還是 'O'，並切換玩家             |

---

## 🧪 結論｜Conclusion

Lifting state up 是 React 中實現「單一資料來源」與「元件同步」的核心技巧。  
善用 props 傳遞狀態與更新函數，可以讓 UI 保持一致且更容易維護。

> Lifting state up is essential for maintaining a single source of truth and consistent UI in React.  
> Use props to pass down both the state and its updater function for better clarity and maintainability.
