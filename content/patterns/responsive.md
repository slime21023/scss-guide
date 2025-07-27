+++
title = "響應式設計模式"
description = "現代響應式設計的最佳實踐"
weight = 3
date = 2024-01-27
+++

# 響應式設計模式

響應式設計讓網站能夠在不同設備和螢幕尺寸上提供最佳的用戶體驗。本章將介紹使用 SCSS 實現現代響應式設計的各種模式和最佳實踐。

## 響應式設計基礎

### 移動優先策略

移動優先是現代響應式設計的核心理念：

```scss
// 基礎樣式（移動端）
.container {
  width: 100%;
  padding: 0 1rem;
  margin: 0 auto;
}

.hero {
  padding: 2rem 0;
  text-align: center;
  
  .hero__title {
    font-size: 1.75rem;
    line-height: 1.2;
    margin-bottom: 1rem;
  }
  
  .hero__subtitle {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    opacity: 0.8;
  }
  
  .hero__actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

// 平板尺寸增強
@media (min-width: 768px) {
  .container {
    max-width: 720px;
    padding: 0 2rem;
  }
  
  .hero {
    padding: 4rem 0;
    
    .hero__title {
      font-size: 2.5rem;
    }
    
    .hero__subtitle {
      font-size: 1.125rem;
    }
    
    .hero__actions {
      flex-direction: row;
      justify-content: center;
    }
  }
}

// 桌面尺寸增強
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
  
  .hero {
    padding: 6rem 0;
    
    .hero__title {
      font-size: 3.5rem;
    }
    
    .hero__subtitle {
      font-size: 1.25rem;
    }
  }
}
```

### 斷點系統

建立一致的斷點系統：

```scss
// 斷點定義
$breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);

// 斷點函數
@function breakpoint($name) {
  @return map-get($breakpoints, $name);
}

// 響應式混合器
@mixin respond-to($breakpoint) {
  $value: breakpoint($breakpoint);
  
  @if $value == 0 {
    @content;
  } @else {
    @media (min-width: $value) {
      @content;
    }
  }
}

// 範圍響應式混合器
@mixin respond-between($min, $max) {
  $min-value: breakpoint($min);
  $max-value: breakpoint($max) - 1px;
  
  @media (min-width: $min-value) and (max-width: $max-value) {
    @content;
  }
}

// 使用範例
.navigation {
  // 移動端樣式
  display: none;
  
  @include respond-to(md) {
    display: flex;
    gap: 2rem;
  }
  
  @include respond-between(md, lg) {
    flex-direction: column;
  }
  
  @include respond-to(lg) {
    flex-direction: row;
  }
}
```

## 流體網格系統

### Flexbox 網格

```scss
// 容器
.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.75rem;
}

.col {
  flex: 1;
  padding: 0 0.75rem;
  min-width: 0; // 防止內容溢出
}

// 響應式欄位
@mixin make-col($size, $columns: 12) {
  flex: 0 0 percentage($size / $columns);
  max-width: percentage($size / $columns);
}

// 生成響應式欄位類別
@each $breakpoint-name, $breakpoint-value in $breakpoints {
  @include respond-to($breakpoint-name) {
    @for $i from 1 through 12 {
      .col-#{$breakpoint-name}-#{$i} {
        @include make-col($i);
      }
    }
    
    // 自動欄位
    .col-#{$breakpoint-name}-auto {
      flex: 0 0 auto;
      width: auto;
    }
    
    // 偏移
    @for $i from 0 through 11 {
      .offset-#{$breakpoint-name}-#{$i} {
        margin-left: percentage($i / 12);
      }
    }
  }
}

// 使用範例
.product-grid {
  @extend .row;
  
  .product-item {
    @extend .col;
    @extend .col-sm-6;
    @extend .col-md-4;
    @extend .col-lg-3;
  }
}
```

### CSS Grid 系統

```scss
// 基礎網格容器
.grid {
  display: grid;
  gap: 1.5rem;
  
  // 移動端：單欄
  grid-template-columns: 1fr;
  
  // 平板：雙欄
  @include respond-to(md) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  // 桌面：多欄自適應
  @include respond-to(lg) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

// 複雜佈局網格
.layout-grid {
  display: grid;
  min-height: 100vh;
  gap: 1rem;
  
  // 移動端：垂直堆疊
  grid-template-areas:
    "header"
    "main"
    "sidebar"
    "footer";
  grid-template-rows: auto 1fr auto auto;
  
  // 平板：側邊欄在右側
  @include respond-to(md) {
    grid-template-areas:
      "header header"
      "main sidebar"
      "footer footer";
    grid-template-columns: 1fr 300px;
    grid-template-rows: auto 1fr auto;
  }
  
  // 桌面：更寬的佈局
  @include respond-to(lg) {
    grid-template-columns: 1fr 350px;
    gap: 2rem;
  }
  
  .header {
    grid-area: header;
  }
  
  .main {
    grid-area: main;
  }
  
  .sidebar {
    grid-area: sidebar;
  }
  
  .footer {
    grid-area: footer;
  }
}
```

## 響應式組件模式

### 卡片組件

```scss
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  // 移動端：垂直佈局
  .card__content {
    padding: 1rem;
  }
  
  .card__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .card__title {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }
  
  .card__text {
    font-size: 0.875rem;
    line-height: 1.5;
    color: #6c757d;
  }
  
  // 平板：水平佈局選項
  &--horizontal {
    @include respond-to(md) {
      display: flex;
      
      .card__image {
        width: 200px;
        height: auto;
        flex-shrink: 0;
      }
      
      .card__content {
        flex: 1;
        padding: 1.5rem;
      }
    }
  }
  
  // 桌面：增強樣式
  @include respond-to(lg) {
    .card__content {
      padding: 2rem;
    }
    
    .card__title {
      font-size: 1.25rem;
    }
    
    .card__text {
      font-size: 1rem;
    }
  }
}
```

### 導航組件

```scss
.navigation {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  .nav__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
  }
  
  .nav__brand {
    font-size: 1.25rem;
    font-weight: 700;
    color: #007bff;
    text-decoration: none;
  }
  
  .nav__toggle {
    display: block;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    
    @include respond-to(md) {
      display: none;
    }
  }
  
  .nav__menu {
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    transition: transform 0.3s ease;
    z-index: 1000;
    
    &.is-open {
      transform: translateY(0);
    }
    
    @include respond-to(md) {
      position: static;
      transform: none;
      box-shadow: none;
      background: none;
      width: auto;
    }
  }
  
  .nav__list {
    list-style: none;
    margin: 0;
    padding: 1rem 0;
    
    @include respond-to(md) {
      display: flex;
      gap: 2rem;
      padding: 0;
    }
  }
  
  .nav__item {
    // 移動端項目樣式
  }
  
  .nav__link {
    display: block;
    padding: 0.75rem 1rem;
    color: #495057;
    text-decoration: none;
    border-bottom: 1px solid #e9ecef;
    
    &:hover,
    &.active {
      color: #007bff;
      background-color: #f8f9fa;
    }
    
    @include respond-to(md) {
      padding: 0;
      border-bottom: none;
      background: none;
      
      &:hover,
      &.active {
        background: none;
      }
    }
  }
}
```

## 響應式圖片

### 圖片適應性

```scss
// 基礎響應式圖片
.responsive-image {
  max-width: 100%;
  height: auto;
  display: block;
}

// 圖片容器
.image-container {
  position: relative;
  overflow: hidden;
  
  // 固定比例容器
  &--16-9 {
    aspect-ratio: 16 / 9;
  }
  
  &--4-3 {
    aspect-ratio: 4 / 3;
  }
  
  &--square {
    aspect-ratio: 1 / 1;
  }
  
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}

// 藝術指導
.hero-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  
  @include respond-to(md) {
    height: 400px;
  }
  
  @include respond-to(lg) {
    height: 500px;
  }
}

// 圖片畫廊
.gallery {
  display: grid;
  gap: 1rem;
  
  // 移動端：單欄
  grid-template-columns: 1fr;
  
  // 平板：雙欄
  @include respond-to(sm) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  // 桌面：三欄
  @include respond-to(md) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  // 大螢幕：四欄
  @include respond-to(lg) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .gallery__item {
    aspect-ratio: 1 / 1;
    overflow: hidden;
    border-radius: 8px;
    
    .gallery__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
      
      &:hover {
        transform: scale(1.05);
      }
    }
  }
}
```

## 響應式字體

### 流體字體

```scss
// 流體字體函數
@function fluid-font-size($min-size, $max-size, $min-width: 320px, $max-width: 1200px) {
  $slope: ($max-size - $min-size) / ($max-width - $min-width);
  $intersection: -$min-width * $slope + $min-size;
  
  @return clamp(#{$min-size}, #{$intersection} + #{$slope * 100}vw, #{$max-size});
}

// 字體比例系統
$font-sizes: (
  xs: (
    mobile: 0.75rem,
    desktop: 0.875rem
  ),
  sm: (
    mobile: 0.875rem,
    desktop: 1rem
  ),
  base: (
    mobile: 1rem,
    desktop: 1.125rem
  ),
  lg: (
    mobile: 1.125rem,
    desktop: 1.25rem
  ),
  xl: (
    mobile: 1.25rem,
    desktop: 1.5rem
  ),
  2xl: (
    mobile: 1.5rem,
    desktop: 2rem
  ),
  3xl: (
    mobile: 1.875rem,
    desktop: 2.5rem
  ),
  4xl: (
    mobile: 2.25rem,
    desktop: 3rem
  )
);

// 生成流體字體類別
@each $size-name, $size-config in $font-sizes {
  .text-#{$size-name} {
    font-size: fluid-font-size(
      map-get($size-config, mobile),
      map-get($size-config, desktop)
    );
  }
}

// 標題樣式
.heading {
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  
  &--1 {
    font-size: fluid-font-size(2rem, 4rem);
  }
  
  &--2 {
    font-size: fluid-font-size(1.75rem, 3rem);
  }
  
  &--3 {
    font-size: fluid-font-size(1.5rem, 2.25rem);
  }
}
```

### 響應式行高和間距

```scss
// 響應式間距系統
$spacing-scales: (
  mobile: 1rem,
  tablet: 1.25rem,
  desktop: 1.5rem
);

@function responsive-spacing($multiplier: 1) {
  $mobile: map-get($spacing-scales, mobile) * $multiplier;
  $tablet: map-get($spacing-scales, tablet) * $multiplier;
  $desktop: map-get($spacing-scales, desktop) * $multiplier;
  
  @return clamp(#{$mobile}, 4vw, #{$desktop});
}

// 文字樣式
.text {
  line-height: 1.6;
  
  // 響應式段落間距
  p {
    margin-bottom: responsive-spacing(1);
  }
  
  // 響應式標題間距
  h1, h2, h3, h4, h5, h6 {
    margin-top: responsive-spacing(2);
    margin-bottom: responsive-spacing(0.5);
    
    &:first-child {
      margin-top: 0;
    }
  }
  
  // 響應式列表間距
  ul, ol {
    margin-bottom: responsive-spacing(1);
    padding-left: responsive-spacing(1.5);
  }
}
```

## 容器查詢

### 組件級響應式

```scss
// 卡片組件的容器查詢
.card {
  container-type: inline-size;
  background: white;
  border-radius: 8px;
  padding: 1rem;
  
  .card__title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .card__content {
    display: block;
  }
  
  // 當卡片寬度 > 300px
  @container (min-width: 300px) {
    padding: 1.5rem;
    
    .card__title {
      font-size: 1.125rem;
    }
    
    .card__content {
      display: flex;
      gap: 1rem;
    }
  }
  
  // 當卡片寬度 > 500px
  @container (min-width: 500px) {
    padding: 2rem;
    
    .card__title {
      font-size: 1.25rem;
    }
    
    .card__content {
      gap: 1.5rem;
    }
  }
}

// 側邊欄組件
.sidebar {
  container-type: inline-size;
  
  .widget {
    margin-bottom: 2rem;
    
    .widget__title {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    
    .widget__list {
      display: block;
    }
  }
  
  // 寬側邊欄
  @container (min-width: 250px) {
    .widget__list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
    }
  }
  
  // 更寬的側邊欄
  @container (min-width: 350px) {
    .widget__title {
      font-size: 1.125rem;
    }
    
    .widget__list {
      gap: 1rem;
    }
  }
}
```

## 性能優化

### 關鍵 CSS

```scss
// critical.scss - 首屏關鍵樣式
.header {
  // 頁面標頭樣式
}

.hero {
  // 首屏英雄區域
}

.navigation {
  // 主導航
}

// 基礎響應式工具
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 0 2rem;
  }
}
```

### 延遲載入樣式

```scss
// non-critical.scss - 非關鍵樣式
.modal {
  // 彈窗樣式（用戶互動時才需要）
}

.carousel {
  // 輪播樣式（可能在首屏下方）
}

.footer {
  // 頁尾樣式（通常在頁面底部）
}
```

## 測試和調試

### 響應式測試工具

```scss
// 開發時的視覺化工具
.debug-breakpoints {
  position: fixed;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem;
  font-size: 0.75rem;
  z-index: 9999;
  
  &::before {
    content: 'XS';
    
    @include respond-to(sm) {
      content: 'SM';
    }
    
    @include respond-to(md) {
      content: 'MD';
    }
    
    @include respond-to(lg) {
      content: 'LG';
    }
    
    @include respond-to(xl) {
      content: 'XL';
    }
    
    @include respond-to(xxl) {
      content: 'XXL';
    }
  }
}

// 網格視覺化
.debug-grid {
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(to right, rgba(255, 0, 0, 0.1) 1px, transparent 1px);
    background-size: calc(100% / 12) 100%;
    pointer-events: none;
    z-index: 1000;
  }
}
```

## 最佳實踐總結

### 1. 設計原則
- 移動優先策略
- 漸進增強
- 內容優先
- 性能考量

### 2. 技術選擇
- 合理使用 Flexbox 和 Grid
- 流體設計與固定設計的平衡
- 容器查詢的適當應用

### 3. 維護性
- 一致的斷點系統
- 可重用的響應式組件
- 清晰的文檔和註釋

### 4. 用戶體驗
- 快速載入時間
- 良好的觸控體驗
- 可訪問性支援

響應式設計是現代 Web 開發的基礎技能。通過掌握這些模式和技術，你可以創建出在任何設備上都能提供優秀用戶體驗的網站。