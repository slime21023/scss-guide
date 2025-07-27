+++
title = "組件化設計"
description = "學習如何建立可重用的 UI 組件"
weight = 1
date = 2024-01-25
+++

# 組件化設計

組件化設計是現代前端開發的核心理念，它將 UI 拆分成獨立、可重用的組件。在 SCSS 中，我們可以運用各種技術來實現高效的組件化設計系統。

## 組件設計原則

### 1. 單一職責原則
每個組件應該只負責一個特定的功能：

```scss
// ✅ 好的設計：專注於按鈕功能
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  font-weight: 500;
  transition: all 0.2s ease;
}

// ❌ 避免：混合多種功能
.btn-with-icon-and-tooltip {
  // 按鈕 + 圖示 + 提示框的混合組件
  // 職責過於複雜
}
```

### 2. 開放封閉原則
組件應該對擴展開放，對修改封閉：

```scss
// 基礎組件 - 封閉修改
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

// 擴展變體 - 開放擴展
.card--elevated {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card--bordered {
  border: 1px solid #e9ecef;
  box-shadow: none;
}

.card--compact {
  .card__body {
    padding: 1rem;
  }
}
```

### 3. 組合優於繼承
使用組合來建立複雜的 UI：

```scss
// 基礎組件
.media {
  display: flex;
  align-items: flex-start;
}

.media__img {
  margin-right: 1rem;
  flex-shrink: 0;
}

.media__body {
  flex: 1;
}

// 組合使用
.user-card {
  @extend .card;
  
  .user-card__content {
    @extend .media;
  }
  
  .user-card__avatar {
    @extend .media__img;
  }
  
  .user-card__info {
    @extend .media__body;
  }
}
```

## 組件架構模式

### BEM 組件結構

```scss
// Block - 組件本體
.notification {
  position: relative;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

// Elements - 組件元素
.notification__icon {
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 20px;
  height: 20px;
}

.notification__content {
  margin-left: 2.5rem;
}

.notification__title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.notification__message {
  margin: 0;
  line-height: 1.5;
}

.notification__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
}

// Modifiers - 組件變體
.notification--success {
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
}

.notification--warning {
  background-color: #fff3cd;
  border-color: #ffeaa7;
  color: #856404;
}

.notification--error {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
}

.notification--info {
  background-color: #d1ecf1;
  border-color: #bee5eb;
  color: #0c5460;
}
```

### 原子設計方法論

#### 原子 (Atoms)
最基本的 UI 元素：

```scss
// 按鈕原子
.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s;
}

// 輸入框原子
.input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
}

// 標籤原子
.label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #495057;
}
```

#### 分子 (Molecules)
原子的組合：

```scss
// 表單群組分子
.form-group {
  margin-bottom: 1.5rem;
  
  .label {
    margin-bottom: 0.5rem;
  }
  
  .input {
    width: 100%;
  }
  
  .form-text {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: #6c757d;
  }
  
  .form-error {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: #dc3545;
  }
}

// 搜索框分子
.search-box {
  position: relative;
  display: flex;
  
  .input {
    flex: 1;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  
  .btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: none;
  }
}
```

#### 有機體 (Organisms)
分子和原子的複雜組合：

```scss
// 導航有機體
.navbar {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0;
  
  .navbar__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
  }
  
  .navbar__brand {
    font-size: 1.5rem;
    font-weight: 700;
    color: #007bff;
    text-decoration: none;
  }
  
  .navbar__nav {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
  }
  
  .navbar__item {
    // 導航項目樣式
  }
  
  .navbar__link {
    color: #495057;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
    
    &:hover,
    &.active {
      color: #007bff;
    }
  }
  
  .navbar__actions {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
}
```

## 組件狀態管理

### 狀態類別

```scss
.btn {
  // 基礎樣式
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  // 狀態樣式
  &:hover {
    background-color: #0056b3;
    transform: translateY(-1px);
  }
  
  &:active {
    background-color: #004085;
    transform: translateY(0);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
  
  &:disabled,
  &.is-disabled {
    background-color: #6c757d;
    cursor: not-allowed;
    opacity: 0.6;
    
    &:hover {
      background-color: #6c757d;
      transform: none;
    }
  }
  
  &.is-loading {
    position: relative;
    color: transparent;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 16px;
      height: 16px;
      margin: -8px 0 0 -8px;
      border: 2px solid transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

### 互動狀態

```scss
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  
  // 預設狀態
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  
  // 選中狀態
  &.is-selected {
    border: 2px solid #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
  
  // 禁用狀態
  &.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transform: none;
    }
  }
  
  // 載入狀態
  &.is-loading {
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
    }
  }
}
```

## 響應式組件

### 移動優先設計

```scss
.hero {
  padding: 2rem 1rem;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  
  .hero__title {
    font-size: 2rem;
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  
  .hero__subtitle {
    font-size: 1.125rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
  
  .hero__actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  
  // 平板尺寸
  @media (min-width: 768px) {
    padding: 4rem 2rem;
    
    .hero__title {
      font-size: 3rem;
    }
    
    .hero__subtitle {
      font-size: 1.25rem;
    }
    
    .hero__actions {
      flex-direction: row;
      justify-content: center;
    }
  }
  
  // 桌面尺寸
  @media (min-width: 1024px) {
    padding: 6rem 2rem;
    
    .hero__title {
      font-size: 4rem;
    }
    
    .hero__subtitle {
      font-size: 1.5rem;
    }
  }
}
```

### 容器查詢 (Container Queries)

```scss
.sidebar-widget {
  container-type: inline-size;
  
  .widget__title {
    font-size: 1.125rem;
    margin-bottom: 1rem;
  }
  
  .widget__content {
    font-size: 0.875rem;
  }
  
  // 當容器寬度大於 300px 時
  @container (min-width: 300px) {
    .widget__title {
      font-size: 1.25rem;
    }
    
    .widget__content {
      font-size: 1rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }
  
  // 當容器寬度大於 500px 時
  @container (min-width: 500px) {
    .widget__content {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
```

## 組件文檔化

### 樣式指南註釋

```scss
/**
 * Button Component
 * 
 * A flexible button component with multiple variants and sizes.
 * 
 * @example
 * <button class="btn btn--primary">Primary Button</button>
 * <button class="btn btn--secondary btn--large">Large Secondary</button>
 * 
 * @variants
 * - primary: Main call-to-action button
 * - secondary: Secondary action button
 * - outline: Outlined button style
 * 
 * @sizes
 * - small: Compact button for tight spaces
 * - large: Prominent button for important actions
 * 
 * @states
 * - disabled: Non-interactive state
 * - loading: Shows loading spinner
 */
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s ease;
  
  // Variants
  &--primary {
    background-color: #007bff;
    color: white;
    
    &:hover {
      background-color: #0056b3;
    }
  }
  
  &--secondary {
    background-color: #6c757d;
    color: white;
    
    &:hover {
      background-color: #545b62;
    }
  }
  
  &--outline {
    background-color: transparent;
    color: #007bff;
    border: 2px solid #007bff;
    
    &:hover {
      background-color: #007bff;
      color: white;
    }
  }
  
  // Sizes
  &--small {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
  
  &--large {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }
}
```

## 組件測試

### 視覺回歸測試

```scss
// 測試用的組件變體
.btn-test-suite {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 2rem;
  
  .test-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    .test-label {
      font-size: 0.75rem;
      color: #6c757d;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }
}

// 所有按鈕狀態的測試
.btn-states-test {
  .btn {
    margin: 0.25rem;
  }
  
  // 正常狀態
  .normal-state .btn {
    // 預設樣式
  }
  
  // 懸停狀態
  .hover-state .btn {
    @extend .btn:hover;
  }
  
  // 焦點狀態
  .focus-state .btn {
    @extend .btn:focus;
  }
  
  // 禁用狀態
  .disabled-state .btn {
    @extend .btn:disabled;
  }
}
```

## 性能優化

### CSS 輸出優化

```scss
// 使用 @extend 減少重複
%btn-base {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s ease;
}

.btn {
  @extend %btn-base;
}

.btn--primary {
  @extend %btn-base;
  background-color: #007bff;
  color: white;
}

.btn--secondary {
  @extend %btn-base;
  background-color: #6c757d;
  color: white;
}
```

### 關鍵 CSS 分離

```scss
// critical.scss - 關鍵組件
.btn {
  // 基本按鈕樣式
}

.header {
  // 頁面標頭樣式
}

.navigation {
  // 主導航樣式
}

// non-critical.scss - 非關鍵組件
.modal {
  // 彈窗樣式（延遲載入）
}

.carousel {
  // 輪播樣式（延遲載入）
}

.tooltip {
  // 提示框樣式（延遲載入）
}
```

## 組件庫建構

### 組件索引

```scss
// components/_index.scss
@forward 'button';
@forward 'card';
@forward 'form';
@forward 'navigation';
@forward 'modal';
@forward 'tooltip';

// 使用方式
@use 'components' as *;

// 或選擇性引入
@use 'components/button';
@use 'components/card';
```

### 主題支援

```scss
// themes/_light.scss
$theme-colors: (
  primary: #007bff,
  secondary: #6c757d,
  background: #ffffff,
  text: #212529
);

// themes/_dark.scss
$theme-colors: (
  primary: #0d6efd,
  secondary: #6c757d,
  background: #212529,
  text: #ffffff
);

// 組件中使用主題
.btn--primary {
  background-color: map-get($theme-colors, primary);
  color: map-get($theme-colors, background);
}
```

## 最佳實踐總結

### 1. 命名規範
- 使用一致的命名方法論（BEM、SMACSS 等）
- 語義化命名，避免基於外觀的命名
- 建立清晰的命名空間

### 2. 結構組織
- 按功能分組組件
- 保持組件的獨立性
- 建立清晰的依賴關係

### 3. 可維護性
- 充分的文檔和註釋
- 一致的程式碼風格
- 定期重構和優化

### 4. 性能考量
- 避免過度嵌套
- 合理使用 @extend 和 @mixin
- 關注 CSS 輸出大小

### 5. 可訪問性
- 確保鍵盤導航支援
- 提供適當的對比度
- 支援螢幕閱讀器

組件化設計是建立可擴展、可維護的 SCSS 系統的關鍵。通過遵循這些原則和模式，你可以創建出高品質的組件庫，提升開發效率和用戶體驗。