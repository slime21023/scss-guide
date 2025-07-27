+++
title = "混合器 (Mixins)"
description = "學習如何創建和使用 SCSS 混合器來重用樣式片段"
weight = 3
date = 2024-01-17
+++

# SCSS 混合器 (Mixins)

混合器是 SCSS 中用於創建可重用樣式片段的強大功能。它讓你可以定義一組 CSS 聲明，然後在需要的地方重複使用，大大提高代碼的重用性和維護性。

## 基本語法

### 定義混合器
使用 `@mixin` 關鍵字定義混合器：

```scss
@mixin button-style {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s;
}
```

### 使用混合器
使用 `@include` 關鍵字來引用混合器：

```scss
.btn-primary {
  @include button-style;
  background-color: #007bff;
  color: white;
  
  &:hover {
    background-color: #0056b3;
  }
}

.btn-secondary {
  @include button-style;
  background-color: #6c757d;
  color: white;
  
  &:hover {
    background-color: #545b62;
  }
}
```

編譯結果：
```css
.btn-primary {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s;
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s;
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}
```

## 帶參數的混合器

### 基本參數
混合器可以接受參數，讓它更加靈活：

```scss
@mixin button($bg-color, $text-color) {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: $bg-color;
  color: $text-color;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: darken($bg-color, 10%);
  }
}

// 使用
.btn-primary {
  @include button(#007bff, white);
}

.btn-success {
  @include button(#28a745, white);
}

.btn-warning {
  @include button(#ffc107, #212529);
}
```

### 預設參數值
可以為參數設定預設值：

```scss
@mixin border-radius($radius: 4px) {
  border-radius: $radius;
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
}

// 使用預設值
.card {
  @include border-radius; // 使用 4px
}

// 自定義值
.modal {
  @include border-radius(8px);
}

.circle {
  @include border-radius(50%);
}
```

### 多個參數
```scss
@mixin box-shadow($x: 0, $y: 2px, $blur: 4px, $color: rgba(0, 0, 0, 0.1)) {
  box-shadow: $x $y $blur $color;
  -webkit-box-shadow: $x $y $blur $color;
  -moz-box-shadow: $x $y $blur $color;
}

// 使用範例
.card {
  @include box-shadow; // 使用預設值
}

.modal {
  @include box-shadow(0, 4px, 12px, rgba(0, 0, 0, 0.15));
}

.button {
  @include box-shadow($y: 1px, $blur: 2px); // 命名參數
}
```

## 可變參數 (Variable Arguments)

使用 `...` 可以接受任意數量的參數：

```scss
@mixin transition($properties...) {
  transition: $properties;
  -webkit-transition: $properties;
  -moz-transition: $properties;
  -o-transition: $properties;
}

// 使用範例
.button {
  @include transition(background-color 0.2s, transform 0.1s);
}

.modal {
  @include transition(opacity 0.3s ease-in-out);
}
```

### 處理多個陰影
```scss
@mixin multiple-shadows($shadows...) {
  box-shadow: $shadows;
}

.complex-element {
  @include multiple-shadows(
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1)
  );
}
```

## 條件邏輯

混合器中可以使用條件語句：

```scss
@mixin button-variant($style: primary) {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  @if $style == primary {
    background-color: #007bff;
    color: white;
  } @else if $style == secondary {
    background-color: #6c757d;
    color: white;
  } @else if $style == outline {
    background-color: transparent;
    color: #007bff;
    border: 1px solid #007bff;
  } @else {
    background-color: #f8f9fa;
    color: #212529;
  }
}

// 使用範例
.btn-primary {
  @include button-variant(primary);
}

.btn-outline {
  @include button-variant(outline);
}
```

## 實際應用範例

### 響應式斷點
```scss
// 定義斷點
$breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px
);

@mixin respond-to($breakpoint) {
  $value: map-get($breakpoints, $breakpoint);
  
  @if $value {
    @media (min-width: $value) {
      @content;
    }
  } @else {
    @warn "Unknown breakpoint: #{$breakpoint}";
  }
}

// 使用範例
.container {
  width: 100%;
  padding: 0 15px;
  
  @include respond-to(sm) {
    max-width: 540px;
    margin: 0 auto;
  }
  
  @include respond-to(md) {
    max-width: 720px;
  }
  
  @include respond-to(lg) {
    max-width: 960px;
  }
  
  @include respond-to(xl) {
    max-width: 1140px;
  }
}
```

### Flexbox 佈局
```scss
@mixin flex-center($direction: row) {
  display: flex;
  flex-direction: $direction;
  justify-content: center;
  align-items: center;
}

@mixin flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@mixin flex-column {
  display: flex;
  flex-direction: column;
}

// 使用範例
.header {
  @include flex-between;
  padding: 1rem;
}

.modal {
  @include flex-center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.sidebar {
  @include flex-column;
  width: 250px;
}
```

### 文字樣式
```scss
@mixin text-style($size: 1rem, $weight: normal, $line-height: 1.5, $color: inherit) {
  font-size: $size;
  font-weight: $weight;
  line-height: $line-height;
  color: $color;
}

@mixin heading($level: 1) {
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 600;
  margin-bottom: 0.5rem;
  
  @if $level == 1 {
    @include text-style(2.5rem, 700, 1.2);
  } @else if $level == 2 {
    @include text-style(2rem, 600, 1.3);
  } @else if $level == 3 {
    @include text-style(1.75rem, 600, 1.4);
  } @else if $level == 4 {
    @include text-style(1.5rem, 600, 1.4);
  } @else if $level == 5 {
    @include text-style(1.25rem, 600, 1.5);
  } @else {
    @include text-style(1rem, 600, 1.5);
  }
}

// 使用範例
h1 {
  @include heading(1);
}

h2 {
  @include heading(2);
}

.page-title {
  @include heading(1);
  color: #2c3e50;
}
```

### 動畫效果
```scss
@mixin fade-in($duration: 0.3s, $delay: 0s) {
  opacity: 0;
  animation: fadeIn $duration ease-in-out $delay forwards;
}

@mixin slide-in($direction: left, $distance: 20px, $duration: 0.3s) {
  opacity: 0;
  
  @if $direction == left {
    transform: translateX(-$distance);
  } @else if $direction == right {
    transform: translateX($distance);
  } @else if $direction == up {
    transform: translateY(-$distance);
  } @else if $direction == down {
    transform: translateY($distance);
  }
  
  animation: slideIn#{capitalize($direction)} $duration ease-out forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes slideInLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

// 使用範例
.modal {
  @include fade-in(0.3s);
}

.sidebar {
  @include slide-in(left, 250px, 0.4s);
}
```

## @content 指令

`@content` 允許混合器接受一個內容塊：

```scss
@mixin hover-effect {
  transition: all 0.2s ease;
  
  &:hover {
    @content;
  }
}

// 使用範例
.button {
  background-color: #007bff;
  color: white;
  
  @include hover-effect {
    background-color: #0056b3;
    transform: translateY(-1px);
  }
}

.card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @include hover-effect {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
}
```

### 媒體查詢混合器
```scss
@mixin mobile {
  @media (max-width: 767px) {
    @content;
  }
}

@mixin tablet {
  @media (min-width: 768px) and (max-width: 1023px) {
    @content;
  }
}

@mixin desktop {
  @media (min-width: 1024px) {
    @content;
  }
}

// 使用範例
.navigation {
  display: flex;
  
  @include mobile {
    flex-direction: column;
    
    .nav-item {
      width: 100%;
      text-align: center;
    }
  }
  
  @include desktop {
    justify-content: space-between;
    
    .nav-item {
      margin-right: 2rem;
    }
  }
}
```

## 混合器最佳實踐

### 1. 命名規範
```scss
// ✅ 好的命名
@mixin button-style { }
@mixin flex-center { }
@mixin respond-to($breakpoint) { }

// ❌ 避免的命名
@mixin btn { }
@mixin fc { }
@mixin rto($bp) { }
```

### 2. 參數順序
將最常用的參數放在前面，可選參數放在後面：

```scss
// ✅ 好的參數順序
@mixin button($bg-color, $text-color, $padding: 0.5rem 1rem, $border-radius: 4px) {
  // ...
}

// ❌ 不好的參數順序
@mixin button($border-radius: 4px, $padding: 0.5rem 1rem, $bg-color, $text-color) {
  // ...
}
```

### 3. 避免過度複雜
```scss
// ✅ 簡潔明確
@mixin button-primary {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

// ❌ 過度複雜
@mixin button($type: primary, $size: medium, $variant: solid, $state: normal, $theme: light) {
  // 太多參數和邏輯
}
```

### 4. 文檔化
```scss
/// 創建按鈕樣式
/// @param {Color} $bg-color - 背景顏色
/// @param {Color} $text-color - 文字顏色
/// @param {String} $size [medium] - 按鈕大小 (small, medium, large)
@mixin button($bg-color, $text-color, $size: medium) {
  // 實作
}
```

## 常見錯誤

### 1. 混合器名稱衝突
```scss
// ❌ 錯誤：重複定義
@mixin button {
  background: blue;
}

@mixin button {
  background: red; // 會覆蓋上面的定義
}
```

### 2. 參數類型錯誤
```scss
@mixin border-radius($radius) {
  border-radius: $radius;
}

// ❌ 錯誤：傳入錯誤類型
.element {
  @include border-radius(blue); // 應該是長度值
}
```

### 3. 過度使用混合器
```scss
// ❌ 不必要的混合器
@mixin red-color {
  color: red;
}

// ✅ 直接使用變數
$error-color: red;

.error {
  color: $error-color;
}
```

## 小結

SCSS 混合器是創建可重用樣式的強大工具，它能夠：

- 減少代碼重複
- 提高樣式的一致性
- 簡化複雜樣式的管理
- 支援參數化和條件邏輯

合理使用混合器可以大大提升 SCSS 代碼的品質和維護性。在下一章節中，我們將學習繼承 (Inheritance) 功能，了解另一種重用樣式的方法。