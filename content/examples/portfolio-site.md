+++
title = "作品集網站範例"
description = "完整的個人作品集網站實作"
weight = 1
date = 2024-01-30
+++

# 作品集網站範例

本章將通過一個完整的個人作品集網站項目，展示如何將 SCSS 的各種技術和最佳實踐應用到實際開發中。這個範例涵蓋了現代作品集網站的所有核心功能。

## 項目概述

### 設計需求
- 響應式設計，支援所有設備
- 現代化的視覺風格
- 流暢的動畫效果
- 優秀的性能表現
- 良好的可訪問性

### 技術架構
- 使用 7-1 SCSS 架構模式
- BEM 命名規範
- 移動優先的響應式設計
- CSS Grid 和 Flexbox 佈局
- 自定義屬性支援主題切換

## 項目結構

```
portfolio/
├── scss/
│   ├── abstracts/
│   │   ├── _variables.scss
│   │   ├── _functions.scss
│   │   ├── _mixins.scss
│   │   └── _placeholders.scss
│   ├── base/
│   │   ├── _reset.scss
│   │   ├── _typography.scss
│   │   └── _base.scss
│   ├── components/
│   │   ├── _buttons.scss
│   │   ├── _cards.scss
│   │   ├── _navigation.scss
│   │   ├── _hero.scss
│   │   ├── _portfolio-grid.scss
│   │   ├── _contact-form.scss
│   │   └── _footer.scss
│   ├── layout/
│   │   ├── _header.scss
│   │   ├── _main.scss
│   │   └── _sections.scss
│   ├── pages/
│   │   └── _home.scss
│   ├── themes/
│   │   ├── _light.scss
│   │   └── _dark.scss
│   └── main.scss
├── css/
├── js/
├── images/
└── index.html
```

## 核心樣式實作

### 變數系統 (abstracts/_variables.scss)

```scss
// 色彩系統
:root {
  // 亮色主題
  --color-primary: #6366f1;
  --color-secondary: #8b5cf6;
  --color-accent: #f59e0b;
  
  --color-text-primary: #1f2937;
  --color-text-secondary: #6b7280;
  --color-text-muted: #9ca3af;
  
  --color-background: #ffffff;
  --color-surface: #f9fafb;
  --color-border: #e5e7eb;
  
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
}

// 暗色主題
[data-theme="dark"] {
  --color-primary: #818cf8;
  --color-secondary: #a78bfa;
  --color-accent: #fbbf24;
  
  --color-text-primary: #f9fafb;
  --color-text-secondary: #d1d5db;
  --color-text-muted: #9ca3af;
  
  --color-background: #111827;
  --color-surface: #1f2937;
  --color-border: #374151;
  
  --color-success: #34d399;
  --color-warning: #fbbf24;
  --color-error: #f87171;
}

// 字體系統
$font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
$font-family-heading: 'Poppins', $font-family-primary;
$font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;

// 字體大小比例
$font-scale: 1.25;
$font-size-base: 1rem;

$font-sizes: (
  xs: $font-size-base / ($font-scale * $font-scale),
  sm: $font-size-base / $font-scale,
  base: $font-size-base,
  lg: $font-size-base * $font-scale,
  xl: $font-size-base * $font-scale * $font-scale,
  2xl: $font-size-base * pow($font-scale, 3),
  3xl: $font-size-base * pow($font-scale, 4),
  4xl: $font-size-base * pow($font-scale, 5)
);

// 間距系統
$spacing-base: 1rem;
$spacing-scale: 1.5;

$spacing: (
  0: 0,
  1: $spacing-base * 0.25,
  2: $spacing-base * 0.5,
  3: $spacing-base * 0.75,
  4: $spacing-base,
  5: $spacing-base * $spacing-scale,
  6: $spacing-base * $spacing-scale * $spacing-scale,
  8: $spacing-base * pow($spacing-scale, 3),
  10: $spacing-base * pow($spacing-scale, 4),
  12: $spacing-base * pow($spacing-scale, 5)
);

// 響應式斷點
$breakpoints: (
  sm: 640px,
  md: 768px,
  lg: 1024px,
  xl: 1280px,
  2xl: 1536px
);

// 動畫設定
$transition-duration: (
  fast: 150ms,
  base: 250ms,
  slow: 350ms
);

$easing: (
  linear: linear,
  ease: ease,
  ease-in: ease-in,
  ease-out: ease-out,
  ease-in-out: ease-in-out,
  bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)
);

// Z-index 層級
$z-index: (
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal-backdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070
);
```

### 工具函數 (abstracts/_functions.scss)

```scss
// 獲取間距值
@function spacing($key) {
  @return map-get($spacing, $key);
}

// 獲取字體大小
@function font-size($key) {
  @return map-get($font-sizes, $key);
}

// 獲取斷點值
@function breakpoint($key) {
  @return map-get($breakpoints, $key);
}

// 獲取 z-index 值
@function z($key) {
  @return map-get($z-index, $key);
}

// 計算冪次
@function pow($base, $exponent) {
  $result: 1;
  @for $i from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}

// 流體字體大小
@function fluid-font-size($min-size, $max-size, $min-width: 320px, $max-width: 1200px) {
  $slope: ($max-size - $min-size) / ($max-width - $min-width);
  $intersection: -$min-width * $slope + $min-size;
  
  @return clamp(#{$min-size}, #{$intersection} + #{$slope * 100}vw, #{$max-size});
}

// 顏色對比度檢查
@function contrast-ratio($color1, $color2) {
  $l1: luminance($color1);
  $l2: luminance($color2);
  
  @if $l1 > $l2 {
    @return ($l1 + 0.05) / ($l2 + 0.05);
  } @else {
    @return ($l2 + 0.05) / ($l1 + 0.05);
  }
}

@function luminance($color) {
  $red: red($color) / 255;
  $green: green($color) / 255;
  $blue: blue($color) / 255;
  
  $red: if($red <= 0.03928, $red / 12.92, pow(($red + 0.055) / 1.055, 2.4));
  $green: if($green <= 0.03928, $green / 12.92, pow(($green + 0.055) / 1.055, 2.4));
  $blue: if($blue <= 0.03928, $blue / 12.92, pow(($blue + 0.055) / 1.055, 2.4));
  
  @return 0.2126 * $red + 0.7152 * $green + 0.0722 * $blue;
}
```

### 混合器 (abstracts/_mixins.scss)

```scss
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

// 容器混合器
@mixin container($max-width: 1200px) {
  width: 100%;
  max-width: $max-width;
  margin: 0 auto;
  padding: 0 spacing(4);
  
  @include respond-to(md) {
    padding: 0 spacing(6);
  }
  
  @include respond-to(lg) {
    padding: 0 spacing(8);
  }
}

// Flexbox 工具
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

// 視覺效果
@mixin glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@mixin gradient-text($gradient) {
  background: $gradient;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

// 動畫混合器
@mixin fade-in($duration: map-get($transition-duration, base), $delay: 0s) {
  opacity: 0;
  animation: fadeIn $duration map-get($easing, ease-out) $delay forwards;
}

@mixin slide-up($duration: map-get($transition-duration, base), $delay: 0s, $distance: 30px) {
  opacity: 0;
  transform: translateY($distance);
  animation: slideUp $duration map-get($easing, ease-out) $delay forwards;
}

// 按鈕變體
@mixin button-variant($bg-color, $text-color: white, $hover-transform: true) {
  background-color: $bg-color;
  color: $text-color;
  border: 2px solid $bg-color;
  
  &:hover {
    background-color: darken($bg-color, 8%);
    border-color: darken($bg-color, 8%);
    
    @if $hover-transform {
      transform: translateY(-2px);
    }
  }
  
  &:active {
    transform: translateY(0);
  }
}

// 卡片樣式
@mixin card-style($padding: spacing(6)) {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: $padding;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all map-get($transition-duration, base) map-get($easing, ease-out);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
}
```

### 基礎樣式 (base/_base.scss)

```scss
// 全域重置
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: $font-family-primary;
  font-size: font-size(base);
  line-height: 1.6;
  color: var(--color-text-primary);
  background-color: var(--color-background);
  transition: background-color map-get($transition-duration, base) map-get($easing, ease-out);
}

// 標題樣式
h1, h2, h3, h4, h5, h6 {
  font-family: $font-family-heading;
  font-weight: 600;
  line-height: 1.2;
  margin: 0 0 spacing(4);
  color: var(--color-text-primary);
}

h1 {
  font-size: fluid-font-size(font-size(2xl), font-size(4xl));
}

h2 {
  font-size: fluid-font-size(font-size(xl), font-size(3xl));
}

h3 {
  font-size: fluid-font-size(font-size(lg), font-size(2xl));
}

// 段落和文字
p {
  margin: 0 0 spacing(4);
  color: var(--color-text-secondary);
}

// 連結
a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color map-get($transition-duration, fast) map-get($easing, ease-out);
  
  &:hover {
    color: var(--color-secondary);
  }
}

// 圖片
img {
  max-width: 100%;
  height: auto;
  display: block;
}

// 列表
ul, ol {
  margin: 0 0 spacing(4);
  padding-left: spacing(5);
}

li {
  margin-bottom: spacing(2);
}

// 程式碼
code {
  font-family: $font-family-mono;
  font-size: 0.9em;
  background: var(--color-surface);
  padding: 0.2em 0.4em;
  border-radius: 4px;
  border: 1px solid var(--color-border);
}

pre {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: spacing(4);
  overflow-x: auto;
  margin: 0 0 spacing(4);
  
  code {
    background: none;
    border: none;
    padding: 0;
  }
}
```

## 組件實作

### 導航組件 (components/_navigation.scss)

```scss
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: z(fixed);
  background: rgba(var(--color-background-rgb), 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  transition: all map-get($transition-duration, base) map-get($easing, ease-out);
  
  &__container {
    @include container;
    @include flex-between;
    height: 70px;
  }
  
  &__brand {
    font-family: $font-family-heading;
    font-size: font-size(lg);
    font-weight: 700;
    color: var(--color-text-primary);
    text-decoration: none;
    
    &:hover {
      color: var(--color-primary);
    }
  }
  
  &__menu {
    display: none;
    
    @include respond-to(md) {
      display: flex;
      gap: spacing(6);
    }
  }
  
  &__link {
    position: relative;
    color: var(--color-text-secondary);
    font-weight: 500;
    padding: spacing(2) 0;
    transition: color map-get($transition-duration, fast) map-get($easing, ease-out);
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--color-primary);
      transition: width map-get($transition-duration, base) map-get($easing, ease-out);
    }
    
    &:hover,
    &.active {
      color: var(--color-primary);
      
      &::after {
        width: 100%;
      }
    }
  }
  
  &__toggle {
    display: flex;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: spacing(2);
    
    @include respond-to(md) {
      display: none;
    }
    
    span {
      width: 24px;
      height: 2px;
      background: var(--color-text-primary);
      transition: all map-get($transition-duration, base) map-get($easing, ease-out);
    }
    
    &.active {
      span:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
      }
      
      span:nth-child(2) {
        opacity: 0;
      }
      
      span:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
      }
    }
  }
  
  &__mobile {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--color-background);
    border-bottom: 1px solid var(--color-border);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all map-get($transition-duration, base) map-get($easing, ease-out);
    
    @include respond-to(md) {
      display: none;
    }
    
    &.active {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
    
    .navigation__link {
      display: block;
      padding: spacing(4);
      border-bottom: 1px solid var(--color-border);
      
      &:last-child {
        border-bottom: none;
      }
    }
  }
  
  &__theme-toggle {
    background: none;
    border: 2px solid var(--color-border);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    @include flex-center;
    cursor: pointer;
    transition: all map-get($transition-duration, base) map-get($easing, ease-out);
    
    &:hover {
      border-color: var(--color-primary);
      transform: rotate(180deg);
    }
    
    svg {
      width: 18px;
      height: 18px;
      fill: var(--color-text-primary);
    }
  }
}
```

### 英雄區域 (components/_hero.scss)

```scss
.hero {
  min-height: 100vh;
  @include flex-center;
  flex-direction: column;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
  
  &__container {
    @include container;
    position: relative;
    z-index: 1;
  }
  
  &__content {
    max-width: 800px;
    margin: 0 auto;
  }
  
  &__greeting {
    font-size: font-size(lg);
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: spacing(4);
    @include fade-in(map-get($transition-duration, slow), 0.2s);
  }
  
  &__title {
    font-size: fluid-font-size(font-size(3xl), font-size(4xl));
    font-weight: 800;
    color: white;
    margin-bottom: spacing(6);
    @include slide-up(map-get($transition-duration, slow), 0.4s);
    
    .highlight {
      @include gradient-text(linear-gradient(45deg, #fbbf24, #f59e0b));
    }
  }
  
  &__subtitle {
    font-size: fluid-font-size(font-size(lg), font-size(xl));
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: spacing(8);
    line-height: 1.5;
    @include fade-in(map-get($transition-duration, slow), 0.6s);
  }
  
  &__actions {
    display: flex;
    gap: spacing(4);
    justify-content: center;
    flex-wrap: wrap;
    @include slide-up(map-get($transition-duration, slow), 0.8s);
  }
  
  &__scroll-indicator {
    position: absolute;
    bottom: spacing(8);
    left: 50%;
    transform: translateX(-50%);
    @include flex-center;
    flex-direction: column;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    @include fade-in(map-get($transition-duration, slow), 1s);
    
    &::before {
      content: '';
      width: 2px;
      height: 30px;
      background: rgba(255, 255, 255, 0.5);
      margin-bottom: spacing(2);
      animation: scrollPulse 2s infinite;
    }
    
    span {
      font-size: font-size(sm);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  }
}

@keyframes scrollPulse {
  0%, 100% {
    opacity: 0.5;
    transform: scaleY(1);
  }
  50% {
    opacity: 1;
    transform: scaleY(1.5);
  }
}
```

### 作品集網格 (components/_portfolio-grid.scss)

```scss
.portfolio {
  padding: spacing(12) 0;
  
  &__container {
    @include container;
  }
  
  &__header {
    text-align: center;
    margin-bottom: spacing(10);
  }
  
  &__title {
    margin-bottom: spacing(4);
  }
  
  &__subtitle {
    font-size: font-size(lg);
    color: var(--color-text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }
  
  &__filters {
    display: flex;
    justify-content: center;
    gap: spacing(3);
    margin-bottom: spacing(8);
    flex-wrap: wrap;
  }
  
  &__filter {
    background: none;
    border: 2px solid var(--color-border);
    color: var(--color-text-secondary);
    padding: spacing(2) spacing(4);
    border-radius: 25px;
    cursor: pointer;
    transition: all map-get($transition-duration, base) map-get($easing, ease-out);
    font-weight: 500;
    
    &:hover,
    &.active {
      border-color: var(--color-primary);
      color: var(--color-primary);
      background: rgba(var(--color-primary-rgb), 0.1);
    }
  }
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: spacing(6);
    
    @include respond-to(lg) {
      gap: spacing(8);
    }
  }
  
  &__item {
    @include card-style;
    overflow: hidden;
    cursor: pointer;
    
    &[data-category] {
      transition: all map-get($transition-duration, base) map-get($easing, ease-out);
    }
    
    &.hidden {
      opacity: 0;
      transform: scale(0.8);
      pointer-events: none;
    }
  }
  
  &__image {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 10;
    margin: -#{spacing(6)} -#{spacing(6)} spacing(4);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform map-get($transition-duration, slow) map-get($easing, ease-out);
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
      opacity: 0;
      transition: opacity map-get($transition-duration, base) map-get($easing, ease-out);
    }
  }
  
  &__content {
    position: relative;
  }
  
  &__category {
    display: inline-block;
    background: var(--color-primary);
    color: white;
    padding: spacing(1) spacing(3);
    border-radius: 15px;
    font-size: font-size(sm);
    font-weight: 600;
    margin-bottom: spacing(3);
  }
  
  &__name {
    font-size: font-size(xl);
    font-weight: 600;
    margin-bottom: spacing(2);
    color: var(--color-text-primary);
  }
  
  &__description {
    color: var(--color-text-secondary);
    margin-bottom: spacing(4);
    line-height: 1.6;
  }
  
  &__tech {
    display: flex;
    flex-wrap: wrap;
    gap: spacing(2);
    margin-bottom: spacing(4);
  }
  
  &__tech-item {
    background: var(--color-surface);
    color: var(--color-text-secondary);
    padding: spacing(1) spacing(2);
    border-radius: 12px;
    font-size: font-size(sm);
    border: 1px solid var(--color-border);
  }
  
  &__links {
    display: flex;
    gap: spacing(3);
  }
  
  &__link {
    @include flex-center;
    gap: spacing(2);
    color: var(--color-primary);
    font-weight: 500;
    transition: color map-get($transition-duration, fast) map-get($easing, ease-out);
    
    &:hover {
      color: var(--color-secondary);
    }
    
    svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }
  }
  
  // 懸停效果
  &__item:hover {
    .portfolio__image {
      img {
        transform: scale(1.05);
      }
      
      &::after {
        opacity: 0.8;
      }
    }
  }
}
```

### 聯絡表單 (components/_contact-form.scss)

```scss
.contact {
  padding: spacing(12) 0;
  background: var(--color-surface);
  
  &__container {
    @include container;
  }
  
  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: spacing(10);
    
    @include respond-to(lg) {
      grid-template-columns: 1fr 1fr;
      gap: spacing(12);
    }
  }
  
  &__info {
    h2 {
      margin-bottom: spacing(6);
    }
    
    p {
      font-size: font-size(lg);
      margin-bottom: spacing(8);
    }
  }
  
  &__details {
    display: flex;
    flex-direction: column;
    gap: spacing(6);
  }
  
  &__detail {
    display: flex;
    align-items: flex-start;
    gap: spacing(4);
    
    &-icon {
      @include flex-center;
      width: 48px;
      height: 48px;
      background: var(--color-primary);
      color: white;
      border-radius: 12px;
      flex-shrink: 0;
      
      svg {
        width: 20px;
        height: 20px;
        fill: currentColor;
      }
    }
    
    &-content {
      h3 {
        margin-bottom: spacing(2);
        color: var(--color-text-primary);
      }
      
      p {
        margin: 0;
        color: var(--color-text-secondary);
      }
    }
  }
  
  &__form {
    @include card-style;
    background: var(--color-background);
  }
  
  &__form-group {
    margin-bottom: spacing(5);
    
    &--half {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: spacing(4);
      
      @include respond-to(sm) {
        grid-template-columns: 1fr;
      }
    }
  }
  
  &__label {
    display: block;
    margin-bottom: spacing(2);
    font-weight: 600;
    color: var(--color-text-primary);
  }
  
  &__input,
  &__textarea {
    width: 100%;
    padding: spacing(3);
    border: 2px solid var(--color-border);
    border-radius: 8px;
    font-size: font-size(base);
    font-family: inherit;
    background: var(--color-background);
    color: var(--color-text-primary);
    transition: all map-get($transition-duration, base) map-get($easing, ease-out);
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
    }
    
    &::placeholder {
      color: var(--color-text-muted);
    }
  }
  
  &__textarea {
    resize: vertical;
    min-height: 120px;
  }
  
  &__submit {
    @include button-variant(var(--color-primary));
    width: 100%;
    padding: spacing(4) spacing(6);
    font-size: font-size(lg);
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all map-get($transition-duration, base) map-get($easing, ease-out);
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      
      &:hover {
        transform: none;
      }
    }
    
    &.loading {
      position: relative;
      color: transparent;
      
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid transparent;
        border-top-color: currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

## 動畫系統

### 關鍵幀動畫 (abstracts/_animations.scss)

```scss
// 淡入動畫
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

// 滑入動畫
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

// 縮放動畫
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

// 旋轉動畫
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// 彈跳動畫
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    transform: translate3d(0, -30px, 0);
  }
  70% {
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}

// 脈衝動畫
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

// 搖擺動畫
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-10px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(10px);
  }
}

// 打字機效果
@keyframes typewriter {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink {
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: var(--color-primary);
  }
}
```

### 滾動動畫 (components/_scroll-animations.scss)

```scss
// 滾動觸發動畫
.scroll-reveal {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  &.revealed {
    opacity: 1;
    transform: translateY(0);
  }
  
  &--left {
    transform: translateX(-50px);
    
    &.revealed {
      transform: translateX(0);
    }
  }
  
  &--right {
    transform: translateX(50px);
    
    &.revealed {
      transform: translateX(0);
    }
  }
  
  &--scale {
    transform: scale(0.8);
    
    &.revealed {
      transform: scale(1);
    }
  }
}

// 視差滾動
.parallax {
  transform: translateZ(0);
  will-change: transform;
}

// 滾動進度指示器
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(var(--color-primary-rgb), 0.2);
  z-index: z(fixed);
  
  &__bar {
    height: 100%;
    background: var(--color-primary);
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 0.1s ease-out;
  }
}
```

## 主題切換系統

### 主題切換 JavaScript

```javascript
// theme-switcher.js
class ThemeSwitcher {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }
  
  init() {
    this.setTheme(this.currentTheme);
    this.bindEvents();
  }
  
  bindEvents() {
    const toggleButton = document.querySelector('.navigation__theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => this.toggleTheme());
    }
    
    // 監聽系統主題變化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
  
  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  setTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // 更新切換按鈕圖示
    this.updateToggleIcon();
  }
  
  updateToggleIcon() {
    const toggleButton = document.querySelector('.navigation__theme-toggle');
    const icon = toggleButton?.querySelector('svg');
    
    if (icon) {
      icon.innerHTML = this.currentTheme === 'light' 
        ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>' // 月亮圖示
        : '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>'; // 太陽圖示
    }
  }
}

// 初始化主題切換器
document.addEventListener('DOMContentLoaded', () => {
  new ThemeSwitcher();
});
```

## 性能優化

### 關鍵 CSS 提取

```scss
// critical.scss - 首屏關鍵樣式
// 基礎重置
*, *::before, *::after { box-sizing: border-box; }
html { font-size: 16px; scroll-behavior: smooth; }
body { 
  margin: 0; 
  font-family: 'Inter', sans-serif; 
  color: var(--color-text-primary); 
  background: var(--color-background); 
}

// 導航樣式（固定在頂部）
.navigation { /* 關鍵導航樣式 */ }

// 英雄區域（首屏可見）
.hero { /* 關鍵英雄區域樣式 */ }

// 基礎按鈕樣式
.btn { /* 關鍵按鈕樣式 */ }
```

### 圖片優化

```scss
// 響應式圖片
.responsive-image {
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    
    // 延遲載入佔位符
    &[data-src] {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }
    
    &.loaded {
      animation: none;
    }
  }
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

## 小結

這個作品集網站範例展示了：

### 技術特點
- **完整的 SCSS 架構**：使用 7-1 模式組織代碼
- **現代化設計**：響應式、主題切換、流暢動畫
- **性能優化**：關鍵 CSS、圖片優化、延遲載入
- **可訪問性**：語義化 HTML、鍵盤導航、對比度

### 最佳實踐
- **模組化開發**：組件化設計，易於維護
- **一致性**：統一的設計系統和命名規範
- **可擴展性**：易於添加新功能和組件
- **用戶體驗**：流暢的互動和視覺效果

這個範例可以作為實際項目的起點，根據具體需求進行調整和擴展。