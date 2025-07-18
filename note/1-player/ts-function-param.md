### ✅ TypeScript 解構與型別註記簡易筆記

```tsx
// ✅ 正確寫法：解構 + 型別註記
function Player({ name, symbol }: { name: string; symbol: string }) { ... }
```

#### ❌ 錯誤寫法（語法錯誤）
```ts
function Player({ name: string, symbol: string }) { ... }
// 解構重命名，不是型別註記
```

---

### ✅ 建議用法：定義 Props 類型

```ts
type PlayerProps = {
  name: string;
  symbol: string;
};

function Player({ name, symbol }: PlayerProps) { ... }
```

或使用 `interface`：
```ts
interface PlayerProps {
  name: string;
  symbol: string;
}
```

---

### ✅ 不使用解構也可以
```ts
function Player(props: { name: string; symbol: string }) {
  return <div>{props.name} - {props.symbol}</div>;
}
```

---

### 📋 對照表

| 寫法                                   | 描述                     |
|----------------------------------------|--------------------------|
| `({ name, symbol }: { ... })`          | ✅ 解構 + 直接型別註記  |
| `({ name, symbol }: PlayerProps)`      | ✅ 解構 + 使用型別別名  |
| `(props: { ... })`                     | ✅ 不解構，直接使用     |
| `(props: PlayerProps)`                 | ✅ 不解構 + 使用型別別名 |
| `({ name: string, symbol: string })`   | ❌ 錯誤！這是解構重命名 |