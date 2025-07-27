+++
title = "ITCSS 方法論"
description = "學習倒三角 CSS 架構方法，建立可擴展的樣式系統"
weight = 2
date = 2024-01-20
+++

# ITCSS 方法論 (Inverted Triangle CSS)

ITCSS（倒三角 CSS）是由 Harry Roberts 創建的 CSS 架構方法論，它將樣式按照特異性（specificity）和影響範圍組織成倒三角形結構。這種方法特別適合大型項目和團隊開發。

## 核心概念

ITCSS 基於以下原則：
- **由通用到具體**：從最通用的樣式開始，逐漸變得具體
- **由低特異性到高特異性**：避免特異性衝突
- **由廣泛影響到局部影響**：從全域樣式到組件樣式

## 倒三角結構

```
    ┌─────────────────┐
    │    Settings     │  變數、配置
    ├─────────────────┤
    │      Tools      │  函數、混合器
    ├─────────────────┤
    │     Generic     │  重置、normalize
    ├─────────────────┤
    │     Elements    │  HTML 元素樣式
    ├─────────────────┤
    │     Objects     │  設計模式、佈局
    ├─────────────────┤
    │   Components    │  UI 組件
    ├─────────────────┤
    │    Utilities    │  工具類別
    └─────────────────┘
```

## 各層詳細說明

### 1. Settings 層 - 設定
全域變數和配置，不產生任何 CSS 輸出。

```scss
// _settings.global.scss
$base-font-size: 16px !default;
$base-line-height: 1.5 !default;

// 色彩系統
$color-primary: #3498db !default;
$color-secondary: #2ecc71 !default;
$color-text: #2c3e50 !default;
$color-background: #ffffff !default;

// 間距系統
$spacing-unit: 1rem !default;
$spacing-sizes: (
  tiny: $spacing-unit * 0.25,
  small: $spacing-unit * 0.5,
  base: $spacing-unit,
  large: $spacing-unit * 2,
  huge: $spacing-unit * 4
) !default;

// 斷點
$breakpoints: (
  palm: 480px,
  lap: 768px,
  desk: 1024px,
  wall: 1200px
) !default;
```

```scss
// _settings.colors.scss
$colors: (
  brand: (
    primary: #3498db,
    secondary: #2ecc71,
    tertiary: #e74c3c
  ),
  ui: (
    success: #27ae60,
    warning: #f39c12,
    error: #e74c3c,
    info: #3498db
  ),
  text: (
    base: #2c3e50,
    light: #7f8c8d,
    inverse: #ffffff
  )
) !default;
```

### 2. Tools 層 - 工具
函數、混合器和其他工具，不產生 CSS 輸出。

```scss
// _tools.functions.scss
@function color($palette, $tone: base) {
  @return map-get(map-get($colors, $palette), $tone);
}

@function spacing($size) {
  @return map-get($spacing-sizes, $size);
}

@function breakpoint($name) {
  @return map-get($breakpoints, $name);
}

// 計算 rem 值
@function rem($pixels, $context: $base-font-size) {
  @return #{$pixels / $context}rem;
}
```

```scss
// _tools.mixins.scss
// 響應式混合器
@mixin respond-to($breakpoint) {
  $value: breakpoint($breakpoint);
  
  @if $value {
    @media (min-width: $value) {
      @content;
    }
  } @else {
    @warn "Unknown breakpoint: #{$breakpoint}";
  }
}

// 字體大小混合器
@mixin font-size($size, $line-height: auto) {
  font-size: $size;
  
  @if $line-height == auto {
    line-height: ceil($size / $base-line-height) * ($base-line-height / $size);
  } @else {
    line-height: $line-height;
  }
}

// 清除浮動
@mixin clearfix {
  &::after {
    content: '';
    display: table;
    clear: both;
  }
}
```

### 3. Generic 層 - 通用
重置樣式、normalize 等最基礎的樣式。

```scss
// _generic.reset.scss
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: $base-font-size;
  line-height: $base-line-height;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}

body {
  margin: 0;
  font-family: sans-serif;
  color: color(text);
  background-color: $color-background;
}
```

```scss
// _generic.normalize.scss
// 基於 normalize.css 的標準化樣式
article,
aside,
details,
figcaption,
figure,
footer,
header,
main,
menu,
nav,
section,
summary {
  display: block;
}

audio,
canvas,
progress,
video {
  display: inline-block;
  vertical-align: baseline;
}
```

### 4. Elements 層 - 元素
HTML 元素的預設樣式，無類別選擇器。

```scss
// _elements.headings.scss
h1, h2, h3, h4, h5, h6 {
  margin: 0 0 spacing(small);
  font-weight: 600;
  line-height: 1.2;
}

h1 {
  @include font-size(rem(32px));
  
  @include respond-to(lap) {
    @include font-size(rem(40px));
  }
}

h2 {
  @include font-size(rem(28px));
  
  @include respond-to(lap) {
    @include font-size(rem(32px));
  }
}

h3 {
  @include font-size(rem(24px));
}

h4 {
  @include font-size(rem(20px));
}

h5 {
  @include font-size(rem(18px));
}

h6 {
  @include font-size(rem(16px));
}
```

```scss
// _elements.forms.scss
input,
textarea,
select {
  font: inherit;
  color: inherit;
}

input[type="text"],
input[type="email"],
input[type="password"],
textarea {
  padding: spacing(tiny);
  border: 1px solid #ccc;
  border-radius: 3px;
  
  &:focus {
    outline: none;
    border-color: color(brand, primary);
    box-shadow: 0 0 0 2px rgba(color(brand, primary), 0.2);
  }
}

button {
  font: inherit;
  cursor: pointer;
  border: none;
  background: none;
}
```

### 5. Objects 層 - 物件
設計模式、佈局物件，使用類別選擇器但不包含裝飾性樣式。

```scss
// _objects.layout.scss
/**
 * 容器物件
 */
.o-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 spacing(base);
  
  @include respond-to(lap) {
    padding: 0 spacing(large);
  }
}

.o-container--narrow {
  max-width: 800px;
}

.o-container--wide {
  max-width: 1400px;
}
```

```scss
// _objects.media.scss
/**
 * 媒體物件 - 圖片和文字並排的模式
 */
.o-media {
  display: flex;
  align-items: flex-start;
}

.o-media__img {
  margin-right: spacing(base);
  
  > img {
    display: block;
    max-width: none;
  }
}

.o-media__body {
  flex: 1;
  
  > :last-child {
    margin-bottom: 0;
  }
}

// 修飾符
.o-media--reverse {
  flex-direction: row-reverse;
  
  .o-media__img {
    margin-right: 0;
    margin-left: spacing(base);
  }
}

.o-media--middle {
  align-items: center;
}
```

```scss
// _objects.grid.scss
/**
 * 網格系統
 */
.o-grid {
  display: flex;
  flex-wrap: wrap;
  margin-left: -#{spacing(base)};
}

.o-grid__item {
  padding-left: spacing(base);
  flex-basis: 100%;
}

// 網格修飾符
.o-grid--gutter-small {
  margin-left: -#{spacing(small)};
  
  > .o-grid__item {
    padding-left: spacing(small);
  }
}

.o-grid--middle {
  align-items: center;
}

.o-grid--center {
  justify-content: center;
}

// 響應式網格
@include respond-to(lap) {
  .o-grid__item--1\/2\@lap {
    flex-basis: 50%;
  }
  
  .o-grid__item--1\/3\@lap {
    flex-basis: 33.333%;
  }
  
  .o-grid__item--2\/3\@lap {
    flex-basis: 66.666%;
  }
}
```

### 6. Components 層 - 組件
UI 組件，包含完整的視覺設計。

```scss
// _components.button.scss
/**
 * 按鈕組件
 */
.c-button {
  display: inline-block;
  padding: spacing(small) spacing(base);
  border: none;
  border-radius: 3px;
  text-decoration: none;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover,
  &:focus {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}

// 按鈕變體
.c-button--primary {
  background-color: color(brand, primary);
  color: color(text, inverse);
  
  &:hover,
  &:focus {
    background-color: darken(color(brand, primary), 10%);
  }
}

.c-button--secondary {
  background-color: color(brand, secondary);
  color: color(text, inverse);
  
  &:hover,
  &:focus {
    background-color: darken(color(brand, secondary), 10%);
  }
}

.c-button--ghost {
  background-color: transparent;
  color: color(brand, primary);
  border: 2px solid color(brand, primary);
  
  &:hover,
  &:focus {
    background-color: color(brand, primary);
    color: color(text, inverse);
  }
}

// 按鈕尺寸
.c-button--small {
  padding: spacing(tiny) spacing(small);
  font-size: rem(14px);
}

.c-button--large {
  padding: spacing(base) spacing(large);
  font-size: rem(18px);
}
```

```scss
// _components.card.scss
/**
 * 卡片組件
 */
.c-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}

.c-card__header {
  padding: spacing(base);
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.c-card__title {
  margin: 0;
  font-size: rem(20px);
  font-weight: 600;
  color: color(text);
}

.c-card__body {
  padding: spacing(base);
}

.c-card__footer {
  padding: spacing(base);
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
}

// 卡片修飾符
.c-card--featured {
  border-top: 4px solid color(brand, primary);
}

.c-card--compact {
  .c-card__header,
  .c-card__body,
  .c-card__footer {
    padding: spacing(small);
  }
}
```

### 7. Utilities 層 - 工具類別
單一用途的工具類別，具有最高特異性。

```scss
// _utilities.spacing.scss
/**
 * 間距工具類別
 */
.u-margin-top-none     { margin-top: 0 !important; }
.u-margin-top-tiny     { margin-top: spacing(tiny) !important; }
.u-margin-top-small    { margin-top: spacing(small) !important; }
.u-margin-top-base     { margin-top: spacing(base) !important; }
.u-margin-top-large    { margin-top: spacing(large) !important; }
.u-margin-top-huge     { margin-top: spacing(huge) !important; }

.u-margin-bottom-none  { margin-bottom: 0 !important; }
.u-margin-bottom-tiny  { margin-bottom: spacing(tiny) !important; }
.u-margin-bottom-small { margin-bottom: spacing(small) !important; }
.u-margin-bottom-base  { margin-bottom: spacing(base) !important; }
.u-margin-bottom-large { margin-bottom: spacing(large) !important; }
.u-margin-bottom-huge  { margin-bottom: spacing(huge) !important; }

// 響應式間距
@include respond-to(lap) {
  .u-margin-top-large\@lap { margin-top: spacing(large) !important; }
  .u-margin-bottom-large\@lap { margin-bottom: spacing(large) !important; }
}
```

```scss
// _utilities.text.scss
/**
 * 文字工具類別
 */
.u-text-center   { text-align: center !important; }
.u-text-left     { text-align: left !important; }
.u-text-right    { text-align: right !important; }

.u-text-uppercase { text-transform: uppercase !important; }
.u-text-lowercase { text-transform: lowercase !important; }
.u-text-capitalize { text-transform: capitalize !important; }

.u-text-bold     { font-weight: 700 !important; }
.u-text-normal   { font-weight: 400 !important; }
.u-text-light    { font-weight: 300 !important; }

// 文字顏色
.u-color-primary   { color: color(brand, primary) !important; }
.u-color-secondary { color: color(brand, secondary) !important; }
.u-color-success   { color: color(ui, success) !important; }
.u-color-error     { color: color(ui, error) !important; }
```

```scss
// _utilities.display.scss
/**
 * 顯示工具類別
 */
.u-hidden        { display: none !important; }
.u-block         { display: block !important; }
.u-inline        { display: inline !important; }
.u-inline-block  { display: inline-block !important; }
.u-flex          { display: flex !important; }

// 響應式顯示
@include respond-to(palm) {
  .u-hidden\@palm { display: none !important; }
  .u-block\@palm  { display: block !important; }
}

@include respond-to(lap) {
  .u-hidden\@lap { display: none !important; }
  .u-block\@lap  { display: block !important; }
}
```

## 主要匯入文件

```scss
// main.scss

// Settings
@import 'settings/settings.global';
@import 'settings/settings.colors';

// Tools
@import 'tools/tools.functions';
@import 'tools/tools.mixins';

// Generic
@import 'generic/generic.reset';
@import 'generic/generic.normalize';

// Elements
@import 'elements/elements.headings';
@import 'elements/elements.forms';
@import 'elements/elements.tables';

// Objects
@import 'objects/objects.layout';
@import 'objects/objects.media';
@import 'objects/objects.grid';

// Components
@import 'components/components.button';
@import 'components/components.card';
@import 'components/components.navigation';

// Utilities
@import 'utilities/utilities.spacing';
@import 'utilities/utilities.text';
@import 'utilities/utilities.display';
```

## 命名規範

ITCSS 使用特定的命名前綴來識別不同層級：

- **Objects**: `o-` 前綴 (如 `o-container`, `o-media`)
- **Components**: `c-` 前綴 (如 `c-button`, `c-card`)
- **Utilities**: `u-` 前綴 (如 `u-text-center`, `u-hidden`)

### BEM 結合 ITCSS
```scss
// 組件使用 BEM 命名
.c-card { }                    // Block
.c-card__header { }            // Element
.c-card__title { }             // Element
.c-card--featured { }          // Modifier
.c-card__title--large { }      // Element Modifier
```

## 實際應用範例

### HTML 結構
```html
<div class="o-container">
  <div class="o-grid">
    <div class="o-grid__item o-grid__item--1/2@lap">
      <article class="c-card c-card--featured">
        <header class="c-card__header">
          <h2 class="c-card__title">文章標題</h2>
        </header>
        <div class="c-card__body">
          <p class="u-margin-bottom-small">文章內容...</p>
          <a href="#" class="c-button c-button--primary">閱讀更多</a>
        </div>
      </article>
    </div>
    <div class="o-grid__item o-grid__item--1/2@lap">
      <div class="o-media">
        <div class="o-media__img">
          <img src="avatar.jpg" alt="作者頭像">
        </div>
        <div class="o-media__body">
          <h3 class="u-margin-bottom-tiny">作者姓名</h3>
          <p class="u-color-secondary u-text-small">作者簡介...</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

## ITCSS 的優勢

### 1. 可預測的特異性
```scss
// 特異性由低到高，避免衝突
h1 { }                    // 0,0,0,1
.o-container { }          // 0,0,1,0
.c-button { }             // 0,0,1,0
.u-text-center { }        // 0,0,1,0 + !important
```

### 2. 可擴展性
```scss
// 容易添加新的組件
.c-modal {
  // 新組件樣式
}

.c-modal__header {
  // 組件元素
}

.c-modal--large {
  // 組件修飾符
}
```

### 3. 可維護性
```scss
// 清晰的職責分離
// Settings: 只有變數
$color-primary: #3498db;

// Tools: 只有工具
@mixin button-variant($color) { }

// Components: 完整的組件
.c-button {
  @include button-variant($color-primary);
}
```

## 與其他方法論的比較

### ITCSS vs 7-1 Pattern
```scss
// 7-1 Pattern - 按功能分類
abstracts/
components/
layout/

// ITCSS - 按特異性分類
settings/
tools/
objects/
components/
utilities/
```

### ITCSS vs Atomic CSS
```scss
// ITCSS - 語義化組件
.c-button--primary {
  background: $color-primary;
  color: white;
  padding: $spacing-base;
}

// Atomic CSS - 原子化類別
.bg-blue .text-white .p-4 { }
```

## 最佳實踐

### 1. 嚴格遵循層級順序
```scss
// ✅ 正確的匯入順序
@import 'settings/settings.global';
@import 'tools/tools.mixins';
@import 'generic/generic.reset';
@import 'elements/elements.headings';
@import 'objects/objects.layout';
@import 'components/components.button';
@import 'utilities/utilities.spacing';

// ❌ 錯誤的順序
@import 'components/components.button';
@import 'settings/settings.global';  // 太晚了
```

### 2. 保持層級純淨
```scss
// ✅ Objects 層 - 只有結構，無裝飾
.o-media {
  display: flex;
}

// ❌ Objects 層包含裝飾樣式
.o-media {
  display: flex;
  background: white;  // 這應該在 Components 層
  border-radius: 4px; // 這應該在 Components 層
}
```

### 3. 合理使用 !important
```scss
// ✅ 只在 Utilities 層使用 !important
.u-text-center {
  text-align: center !important;
}

// ❌ 在其他層使用 !important
.c-button {
  background: blue !important;  // 不應該在這裡使用
}
```

## 工具和自動化

### Sass 架構生成器
```bash
# 使用 generator 快速建立 ITCSS 結構
npm install -g generator-itcss
yo itcss
```

### Gulp 任務範例
```javascript
gulp.task('sass', function() {
  return gulp.src('scss/main.scss')
    .pipe(sass({
      includePaths: [
        'scss/settings',
        'scss/tools',
        'scss/generic',
        'scss/elements',
        'scss/objects',
        'scss/components',
        'scss/utilities'
      ]
    }))
    .pipe(gulp.dest('css'));
});
```

## 小結

ITCSS 提供了一個基於特異性的 CSS 架構方法：

- **清晰的層級結構**：從通用到具體的組織方式
- **可預測的特異性**：避免 CSS 衝突
- **高度可擴展**：容易添加新功能
- **團隊友好**：標準化的開發方式

ITCSS 特別適合大型項目和需要長期維護的系統，它提供了一個穩定、可預測的 CSS 架構基礎。在下一章節中，我們將學習各種命名規範，包括如何將 BEM 與 ITCSS 結合使用。