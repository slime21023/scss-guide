+++
title = "命名規範"
description = "學習 BEM、OOCSS 等 CSS 命名方法論"
weight = 3
date = 2024-01-21
+++

# CSS 命名規範

良好的命名規範是可維護 CSS 的基礎。本章將介紹幾種主流的 CSS 命名方法論，幫助你建立一致、可讀的樣式系統。

## BEM 方法論

BEM（Block Element Modifier）是最受歡迎的 CSS 命名方法論之一，由 Yandex 開發。

### 基本概念

- **Block（區塊）**：獨立的功能組件
- **Element（元素）**：區塊的組成部分
- **Modifier（修飾符）**：區塊或元素的變體

### 命名格式
```scss
.block { }
.block__element { }
.block--modifier { }
.block__element--modifier { }
```

### 實際範例

#### 按鈕組件
```scss
// Block
.button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s;
}

// Modifiers
.button--primary {
  background-color: #007bff;
  color: white;
  
  &:hover {
    background-color: #0056b3;
  }
}

.button--secondary {
  background-color: #6c757d;
  color: white;
  
  &:hover {
    background-color: #545b62;
  }
}

.button--large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

.button--small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  
  &:hover {
    background-color: inherit;
  }
}
```

HTML 使用：
```html
<button class="button button--primary">主要按鈕</button>
<button class="button button--secondary button--large">大型次要按鈕</button>
<button class="button button--primary button--disabled">禁用按鈕</button>
```

#### 卡片組件
```scss
// Block
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

// Elements
.card__header {
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.card__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
}

.card__subtitle {
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: #6c757d;
}

.card__body {
  padding: 1.5rem;
}

.card__text {
  margin: 0 0 1rem;
  line-height: 1.6;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.card__footer {
  padding: 1rem 1.5rem;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
}

.card__actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

// Block Modifiers
.card--featured {
  border-top: 4px solid #007bff;
}

.card--compact {
  .card__header,
  .card__body,
  .card__footer {
    padding: 1rem;
  }
}

.card--shadow-large {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

// Element Modifiers
.card__title--large {
  font-size: 1.5rem;
}

.card__text--muted {
  color: #6c757d;
}
```

HTML 使用：
```html
<article class="card card--featured">
  <header class="card__header">
    <h2 class="card__title card__title--large">文章標題</h2>
    <p class="card__subtitle">發布於 2024年1月15日</p>
  </header>
  <div class="card__body">
    <p class="card__text">這是文章的主要內容...</p>
    <p class="card__text card__text--muted">附加說明文字</p>
  </div>
  <footer class="card__footer">
    <div class="card__actions">
      <button class="button button--secondary button--small">分享</button>
      <button class="button button--primary button--small">閱讀更多</button>
    </div>
  </footer>
</article>
```

#### 導航組件
```scss
// Block
.navigation {
  background-color: #2c3e50;
}

// Elements
.navigation__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.navigation__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.navigation__item {
  position: relative;
}

.navigation__link {
  display: block;
  padding: 1rem 1.5rem;
  color: white;
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #34495e;
  }
}

.navigation__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #34495e;
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s;
}

.navigation__dropdown-item {
  // 下拉項目樣式
}

.navigation__dropdown-link {
  display: block;
  padding: 0.75rem 1.5rem;
  color: white;
  text-decoration: none;
  
  &:hover {
    background-color: #3498db;
  }
}

// Modifiers
.navigation--sticky {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navigation__link--active {
  background-color: #3498db;
}

.navigation__item--has-dropdown {
  &:hover .navigation__dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}
```

### BEM 最佳實踐

#### 1. 避免過深的元素嵌套
```scss
// ❌ 錯誤：過深的嵌套
.card__body__content__text__paragraph { }

// ✅ 正確：扁平的結構
.card__text { }
.card__paragraph { }
```

#### 2. 使用語義化的命名
```scss
// ❌ 避免：基於外觀的命名
.button--blue { }
.text--big { }

// ✅ 推薦：基於功能的命名
.button--primary { }
.text--heading { }
```

#### 3. 修飾符應該與基礎類別一起使用
```html
<!-- ❌ 錯誤：只使用修飾符 -->
<button class="button--primary">按鈕</button>

<!-- ✅ 正確：基礎類別 + 修飾符 -->
<button class="button button--primary">按鈕</button>
```

## OOCSS 方法論

OOCSS（Object-Oriented CSS）強調樣式的重用性和模組化。

### 核心原則

1. **分離結構和外觀**
2. **分離容器和內容**

### 實際應用

#### 分離結構和外觀
```scss
// 結構類別
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

// 外觀類別
.skin-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.skin-highlight {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 4px;
  padding: 1rem;
}
```

HTML 使用：
```html
<div class="media skin-card">
  <div class="media__img">
    <img src="avatar.jpg" alt="頭像">
  </div>
  <div class="media__body">
    <h3>使用者名稱</h3>
    <p>使用者簡介...</p>
  </div>
</div>

<div class="media skin-highlight">
  <div class="media__img">
    <span class="icon">⚠️</span>
  </div>
  <div class="media__body">
    <p>重要提醒訊息</p>
  </div>
</div>
```

#### 分離容器和內容
```scss
// ❌ 錯誤：內容依賴容器
.sidebar h3 {
  color: #2c3e50;
  font-size: 1.2rem;
}

.footer h3 {
  color: #2c3e50;
  font-size: 1.2rem;
}

// ✅ 正確：獨立的內容樣式
.heading-tertiary {
  color: #2c3e50;
  font-size: 1.2rem;
  margin: 0 0 1rem;
}

// 容器只負責佈局
.sidebar {
  width: 250px;
  padding: 1rem;
}

.footer {
  background: #2c3e50;
  color: white;
  padding: 2rem 0;
}
```

## SMACSS 方法論

SMACSS（Scalable and Modular Architecture for CSS）將樣式分為五個類別。

### 五個類別

1. **Base** - 基礎樣式
2. **Layout** - 佈局樣式
3. **Module** - 模組樣式
4. **State** - 狀態樣式
5. **Theme** - 主題樣式

### 命名規範

```scss
// Layout - 使用 l- 前綴
.l-header { }
.l-sidebar { }
.l-main { }

// Module - 無前綴
.card { }
.button { }
.navigation { }

// State - 使用 is- 前綴
.is-active { }
.is-hidden { }
.is-loading { }

// Theme - 使用 theme- 前綴
.theme-dark { }
.theme-high-contrast { }
```

### 實際範例

```scss
// Base
html {
  font-family: sans-serif;
  line-height: 1.6;
}

// Layout
.l-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.l-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

// Module
.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

// State
.card.is-featured {
  border-top: 4px solid #007bff;
}

.button.is-loading {
  opacity: 0.6;
  cursor: wait;
}

// Theme
.theme-dark .card {
  background: #2c3e50;
  color: white;
}
```

## Atomic CSS

Atomic CSS 使用單一用途的工具類別。

### 基本概念

```scss
// 單一用途的類別
.m-0 { margin: 0; }
.m-1 { margin: 0.25rem; }
.m-2 { margin: 0.5rem; }
.m-3 { margin: 1rem; }

.p-0 { padding: 0; }
.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-3 { padding: 1rem; }

.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.bg-primary { background-color: #007bff; }
.bg-secondary { background-color: #6c757d; }

.text-white { color: white; }
.text-dark { color: #2c3e50; }
```

### 使用範例

```html
<div class="bg-white p-3 m-2 text-center">
  <h2 class="text-dark m-0 mb-2">標題</h2>
  <p class="text-secondary mb-3">描述文字</p>
  <button class="bg-primary text-white p-2 px-4">按鈕</button>
</div>
```

### 響應式 Atomic CSS

```scss
// 基礎類別
.text-center { text-align: center; }

// 響應式變體
@media (min-width: 768px) {
  .md\:text-left { text-align: left; }
  .md\:text-center { text-align: center; }
}

@media (min-width: 1024px) {
  .lg\:text-right { text-align: right; }
}
```

HTML 使用：
```html
<div class="text-center md:text-left lg:text-right">
  響應式文字對齊
</div>
```

## 混合方法論

在實際項目中，通常會結合多種方法論：

### BEM + ITCSS
```scss
// Objects (ITCSS) + BEM
.o-media { }
.o-media__img { }
.o-media__body { }

// Components (ITCSS) + BEM
.c-card { }
.c-card__header { }
.c-card__title { }
.c-card--featured { }

// Utilities (ITCSS) + Atomic
.u-text-center { text-align: center !important; }
.u-margin-bottom-large { margin-bottom: 2rem !important; }
```

### BEM + Atomic
```scss
// 組件使用 BEM
.card {
  background: white;
  border-radius: 8px;
}

.card__title {
  font-size: 1.25rem;
  font-weight: 600;
}

// 工具類別使用 Atomic
.mt-4 { margin-top: 1rem; }
.text-center { text-align: center; }
.bg-primary { background-color: #007bff; }
```

HTML 使用：
```html
<div class="card mt-4">
  <h2 class="card__title text-center">標題</h2>
  <div class="card__body">
    <button class="button button--primary bg-primary text-white">按鈕</button>
  </div>
</div>
```

## 選擇合適的命名規範

### 項目規模考量

#### 小型項目
```scss
// 簡單的命名即可
.header { }
.nav { }
.button { }
.card { }
```

#### 中型項目
```scss
// 使用 BEM
.navigation { }
.navigation__list { }
.navigation__item { }
.navigation__link { }
.navigation--sticky { }
```

#### 大型項目
```scss
// BEM + ITCSS
.o-container { }
.c-navigation { }
.c-navigation__list { }
.c-navigation__item { }
.c-navigation__link { }
.c-navigation--sticky { }
.u-text-center { }
```

### 團隊規模考量

#### 個人開發
- 保持簡單，重點在功能實現
- 可以使用較寬鬆的命名規範

#### 小團隊（2-5人）
- 建立基本的命名規範
- 使用 BEM 或 SMACSS

#### 大團隊（5人以上）
- 嚴格的命名規範
- 結合多種方法論
- 建立樣式指南和文檔

## 工具和自動化

### CSS Linting
```json
// .stylelintrc.json
{
  "extends": ["stylelint-config-standard"],
  "rules": {
    "selector-class-pattern": "^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$",
    "selector-id-pattern": null,
    "selector-max-id": 0
  }
}
```

### PostCSS 插件
```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-bem-linter')({
      preset: 'bem',
      implicitComponents: true
    })
  ]
}
```

## 最佳實踐總結

### 1. 保持一致性
```scss
// ✅ 一致的命名模式
.button { }
.button--primary { }
.button--secondary { }

// ❌ 不一致的命名
.button { }
.btn-primary { }
.secondary-button { }
```

### 2. 使用語義化命名
```scss
// ✅ 語義化
.button--primary { }
.alert--warning { }
.text--large { }

// ❌ 基於外觀
.button--blue { }
.alert--yellow { }
.text--20px { }
```

### 3. 避免過度嵌套
```scss
// ✅ 合理的嵌套
.card { }
.card__header { }
.card__title { }

// ❌ 過度嵌套
.page__content__section__card__header__title { }
```

### 4. 建立樣式指南
```scss
/**
 * 按鈕組件
 * 
 * 基本用法：
 * <button class="button">基本按鈕</button>
 * 
 * 變體：
 * <button class="button button--primary">主要按鈕</button>
 * <button class="button button--secondary">次要按鈕</button>
 * 
 * 尺寸：
 * <button class="button button--small">小按鈕</button>
 * <button class="button button--large">大按鈕</button>
 */
.button {
  // 樣式實作
}
```

## 小結

選擇合適的命名規範對於建立可維護的 CSS 系統至關重要：

- **BEM**：適合組件化開發，清晰的結構
- **OOCSS**：強調重用性和模組化
- **SMACSS**：提供完整的架構分類
- **Atomic CSS**：高度可重用的工具類別

在實際項目中，通常會結合多種方法論，根據項目需求和團隊規模選擇最適合的方案。重要的是保持一致性，並建立清晰的文檔和指南。