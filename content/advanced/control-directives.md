+++
title = "控制指令"
description = "學習 SCSS 中的 @if、@for、@each 等流程控制"
weight = 2
date = 2024-01-23
+++

# SCSS 控制指令

控制指令讓你能夠在 SCSS 中使用條件邏輯和循環，創建更動態、更靈活的樣式系統。這些指令在編譯時執行，可以根據條件生成不同的 CSS 輸出。

## @if 條件指令

### 基本語法

```scss
@if condition {
  // 條件為真時執行
} @else if another-condition {
  // 另一個條件為真時執行
} @else {
  // 所有條件都為假時執行
}
```

### 實際應用範例

#### 主題切換
```scss
$theme: dark; // 或 light

.header {
  @if $theme == dark {
    background-color: #2c3e50;
    color: white;
  } @else if $theme == light {
    background-color: #ffffff;
    color: #2c3e50;
  } @else {
    background-color: #f8f9fa;
    color: #495057;
  }
}

// 編譯結果（當 $theme: dark 時）
.header {
  background-color: #2c3e50;
  color: white;
}
```

#### 響應式斷點
```scss
$breakpoint: mobile; // mobile, tablet, desktop

.container {
  padding: 1rem;
  
  @if $breakpoint == mobile {
    max-width: 100%;
  } @else if $breakpoint == tablet {
    max-width: 768px;
    margin: 0 auto;
  } @else if $breakpoint == desktop {
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

#### 功能開關
```scss
$enable-rounded: true;
$enable-shadows: false;
$enable-gradients: true;

.button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  
  @if $enable-rounded {
    border-radius: 0.375rem;
  }
  
  @if $enable-shadows {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  @if $enable-gradients {
    background-image: linear-gradient(180deg, lighten(#007bff, 15%), #007bff);
  }
}
```

### 複雜條件判斷

#### 邏輯運算符
```scss
$screen-size: large;
$is-mobile: false;
$has-touch: true;

.navigation {
  @if $screen-size == large and not $is-mobile {
    display: flex;
    justify-content: space-between;
  } @else if $is-mobile or $screen-size == small {
    display: block;
    
    .nav-item {
      width: 100%;
      text-align: center;
    }
  }
  
  @if $has-touch and ($is-mobile or $screen-size == small) {
    .nav-link {
      padding: 1rem;
      font-size: 1.1rem;
    }
  }
}
```

#### 函數中的條件
```scss
@function button-color($variant) {
  @if $variant == primary {
    @return #007bff;
  } @else if $variant == secondary {
    @return #6c757d;
  } @else if $variant == success {
    @return #28a745;
  } @else if $variant == danger {
    @return #dc3545;
  } @else {
    @warn "Unknown button variant: #{$variant}";
    @return #007bff; // 預設值
  }
}

.btn-custom {
  background-color: button-color(success); // #28a745
}
```

## @for 循環指令

### 基本語法

```scss
// through：包含結束值
@for $i from start through end {
  // 循環體
}

// to：不包含結束值
@for $i from start to end {
  // 循環體
}
```

### 實際應用範例

#### 生成網格系統
```scss
// 生成 12 欄網格系統
@for $i from 1 through 12 {
  .col-#{$i} {
    width: percentage($i / 12);
  }
}

// 編譯結果
.col-1 { width: 8.33333%; }
.col-2 { width: 16.66667%; }
.col-3 { width: 25%; }
// ... 直到 .col-12
.col-12 { width: 100%; }
```

#### 間距工具類別
```scss
$spacing-base: 0.25rem;

@for $i from 0 through 5 {
  .m-#{$i} {
    margin: $spacing-base * $i;
  }
  
  .p-#{$i} {
    padding: $spacing-base * $i;
  }
  
  // 方向性間距
  .mt-#{$i} { margin-top: $spacing-base * $i; }
  .mr-#{$i} { margin-right: $spacing-base * $i; }
  .mb-#{$i} { margin-bottom: $spacing-base * $i; }
  .ml-#{$i} { margin-left: $spacing-base * $i; }
  
  .pt-#{$i} { padding-top: $spacing-base * $i; }
  .pr-#{$i} { padding-right: $spacing-base * $i; }
  .pb-#{$i} { padding-bottom: $spacing-base * $i; }
  .pl-#{$i} { padding-left: $spacing-base * $i; }
}
```

#### 動畫延遲
```scss
@for $i from 1 through 6 {
  .fade-in-#{$i} {
    animation: fadeIn 0.5s ease-in-out;
    animation-delay: #{$i * 0.1}s;
    animation-fill-mode: both;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### Z-index 管理
```scss
$z-layers: header, dropdown, modal, tooltip;

@for $i from 1 through length($z-layers) {
  $layer: nth($z-layers, $i);
  
  .z-#{$layer} {
    z-index: 1000 + ($i * 10);
  }
}

// 編譯結果
.z-header { z-index: 1010; }
.z-dropdown { z-index: 1020; }
.z-modal { z-index: 1030; }
.z-tooltip { z-index: 1040; }
```

## @each 循環指令

### 基本語法

```scss
// 遍歷列表
@each $item in $list {
  // 循環體
}

// 遍歷映射
@each $key, $value in $map {
  // 循環體
}

// 多重賦值
@each $key, $value1, $value2 in $complex-list {
  // 循環體
}
```

### 實際應用範例

#### 顏色系統
```scss
$colors: (
  primary: #007bff,
  secondary: #6c757d,
  success: #28a745,
  danger: #dc3545,
  warning: #ffc107,
  info: #17a2b8,
  light: #f8f9fa,
  dark: #343a40
);

@each $name, $color in $colors {
  .text-#{$name} {
    color: $color;
  }
  
  .bg-#{$name} {
    background-color: $color;
  }
  
  .border-#{$name} {
    border-color: $color;
  }
  
  .btn-#{$name} {
    background-color: $color;
    border-color: $color;
    color: if(lightness($color) > 50%, #212529, #fff);
    
    &:hover {
      background-color: darken($color, 7.5%);
      border-color: darken($color, 10%);
    }
  }
}
```

#### 社交媒體圖示
```scss
$social-colors: (
  facebook: #3b5998,
  twitter: #1da1f2,
  instagram: #e4405f,
  linkedin: #0077b5,
  youtube: #ff0000,
  github: #333333
);

@each $platform, $color in $social-colors {
  .social-#{$platform} {
    background-color: $color;
    color: white;
    
    &:hover {
      background-color: darken($color, 10%);
      transform: translateY(-2px);
    }
    
    &::before {
      content: '';
      display: inline-block;
      width: 20px;
      height: 20px;
      background-image: url('icons/#{$platform}.svg');
      background-size: contain;
      margin-right: 0.5rem;
    }
  }
}
```

#### 響應式斷點
```scss
$breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);

@each $breakpoint, $value in $breakpoints {
  @if $value > 0 {
    @media (min-width: $value) {
      .container-#{$breakpoint} {
        max-width: $value - 12px;
        margin: 0 auto;
        padding: 0 1rem;
      }
      
      // 顯示/隱藏工具類別
      .d-#{$breakpoint}-block { display: block !important; }
      .d-#{$breakpoint}-inline { display: inline !important; }
      .d-#{$breakpoint}-flex { display: flex !important; }
      .d-#{$breakpoint}-none { display: none !important; }
    }
  }
}
```

#### 字體大小階層
```scss
$font-sizes: (
  xs: 0.75rem,
  sm: 0.875rem,
  base: 1rem,
  lg: 1.125rem,
  xl: 1.25rem,
  2xl: 1.5rem,
  3xl: 1.875rem,
  4xl: 2.25rem,
  5xl: 3rem
);

@each $size-name, $size-value in $font-sizes {
  .text-#{$size-name} {
    font-size: $size-value;
    
    @if $size-name == xs or $size-name == sm {
      line-height: 1.4;
    } @else if $size-name == base or $size-name == lg {
      line-height: 1.5;
    } @else {
      line-height: 1.2;
    }
  }
}
```

### 複雜的 @each 應用

#### 多重賦值
```scss
$margins: (
  (t, top),
  (r, right),
  (b, bottom),
  (l, left),
  (x, left right),
  (y, top bottom)
);

$spacing-values: 0, 0.25rem, 0.5rem, 1rem, 1.5rem, 3rem;

@each $direction-short, $direction-long in $margins {
  @for $i from 0 through length($spacing-values) - 1 {
    $value: nth($spacing-values, $i + 1);
    
    .m#{$direction-short}-#{$i} {
      @each $side in $direction-long {
        margin-#{$side}: $value;
      }
    }
  }
}
```

#### 嵌套循環
```scss
$button-variants: primary, secondary, success, danger;
$button-sizes: sm, md, lg;

@each $variant in $button-variants {
  @each $size in $button-sizes {
    .btn-#{$variant}-#{$size} {
      @extend .btn;
      @extend .btn-#{$variant};
      @extend .btn-#{$size};
    }
  }
}
```

## @while 循環指令

### 基本語法

```scss
@while condition {
  // 循環體
  // 記得更新條件變數以避免無限循環
}
```

### 實際應用範例

#### 生成斐波那契數列
```scss
$fibonacci-list: 1, 1;
$a: 1;
$b: 1;
$i: 2;

@while $i < 10 {
  $next: $a + $b;
  $fibonacci-list: append($fibonacci-list, $next);
  $a: $b;
  $b: $next;
  $i: $i + 1;
}

// 使用斐波那契數列生成間距
@for $i from 1 through length($fibonacci-list) {
  .fib-spacing-#{$i} {
    margin: #{nth($fibonacci-list, $i)}px;
  }
}
```

#### 動態計算最佳字體大小
```scss
@function optimal-font-size($container-width, $text-length) {
  $font-size: 16px;
  $estimated-width: $text-length * $font-size * 0.6; // 粗略估算
  
  @while $estimated-width > $container-width and $font-size > 12px {
    $font-size: $font-size - 1px;
    $estimated-width: $text-length * $font-size * 0.6;
  }
  
  @return $font-size;
}
```

## 實際項目應用

### 設計系統生成器

```scss
// 設計系統配置
$design-system: (
  colors: (
    brand: (
      primary: #3498db,
      secondary: #2ecc71,
      tertiary: #e74c3c
    ),
    semantic: (
      success: #27ae60,
      warning: #f39c12,
      error: #e74c3c,
      info: #3498db
    ),
    neutral: (
      100: #f8f9fa,
      200: #e9ecef,
      300: #dee2e6,
      400: #ced4da,
      500: #adb5bd,
      600: #6c757d,
      700: #495057,
      800: #343a40,
      900: #212529
    )
  ),
  spacing: (
    0: 0,
    1: 0.25rem,
    2: 0.5rem,
    3: 1rem,
    4: 1.5rem,
    5: 3rem
  ),
  typography: (
    xs: 0.75rem,
    sm: 0.875rem,
    base: 1rem,
    lg: 1.125rem,
    xl: 1.25rem,
    2xl: 1.5rem,
    3xl: 1.875rem,
    4xl: 2.25rem
  )
);

// 生成顏色工具類別
@each $palette-name, $palette in map-get($design-system, colors) {
  @each $color-name, $color-value in $palette {
    $class-name: if($palette-name == brand, $color-name, #{$palette-name}-#{$color-name});
    
    .text-#{$class-name} {
      color: $color-value;
    }
    
    .bg-#{$class-name} {
      background-color: $color-value;
    }
    
    .border-#{$class-name} {
      border-color: $color-value;
    }
  }
}

// 生成間距工具類別
$spacing-directions: (
  m: margin,
  p: padding
);

$spacing-sides: (
  t: top,
  r: right,
  b: bottom,
  l: left,
  x: (left, right),
  y: (top, bottom)
);

@each $direction-key, $direction-property in $spacing-directions {
  @each $spacing-key, $spacing-value in map-get($design-system, spacing) {
    // 全方向間距
    .#{$direction-key}-#{$spacing-key} {
      #{$direction-property}: $spacing-value;
    }
    
    // 特定方向間距
    @each $side-key, $side-properties in $spacing-sides {
      .#{$direction-key}#{$side-key}-#{$spacing-key} {
        @if type-of($side-properties) == list {
          @each $side in $side-properties {
            #{$direction-property}-#{$side}: $spacing-value;
          }
        } @else {
          #{$direction-property}-#{$side-properties}: $spacing-value;
        }
      }
    }
  }
}

// 生成字體大小工具類別
@each $size-name, $size-value in map-get($design-system, typography) {
  .text-#{$size-name} {
    font-size: $size-value;
    
    // 根據字體大小設定適當的行高
    @if $size-value <= 1rem {
      line-height: 1.5;
    } @else if $size-value <= 1.5rem {
      line-height: 1.4;
    } @else {
      line-height: 1.2;
    }
  }
}
```

### 響應式網格系統

```scss
$grid-columns: 12;
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);

// 生成基礎網格類別
@for $i from 1 through $grid-columns {
  .col-#{$i} {
    flex: 0 0 percentage($i / $grid-columns);
    max-width: percentage($i / $grid-columns);
  }
}

// 生成響應式網格類別
@each $breakpoint, $min-width in $grid-breakpoints {
  @if $min-width > 0 {
    @media (min-width: $min-width) {
      @for $i from 1 through $grid-columns {
        .col-#{$breakpoint}-#{$i} {
          flex: 0 0 percentage($i / $grid-columns);
          max-width: percentage($i / $grid-columns);
        }
      }
      
      // 偏移類別
      @for $i from 0 through $grid-columns - 1 {
        .offset-#{$breakpoint}-#{$i} {
          margin-left: percentage($i / $grid-columns);
        }
      }
    }
  }
}
```

## 最佳實踐

### 1. 避免過度複雜的邏輯
```scss
// ❌ 避免：過於複雜的條件
@if $theme == dark and $size == large and $variant == primary and $state == active {
  // 太複雜了
}

// ✅ 推薦：分解複雜邏輯
@if $theme == dark {
  @if $size == large {
    @if $variant == primary and $state == active {
      // 更清晰
    }
  }
}
```

### 2. 使用有意義的變數名
```scss
// ❌ 避免：無意義的變數名
@for $i from 1 through 5 {
  .class-#{$i} {
    property: $i * 10px;
  }
}

// ✅ 推薦：有意義的變數名
@for $level from 1 through 5 {
  .heading-#{$level} {
    font-size: 2rem - ($level - 1) * 0.25rem;
  }
}
```

### 3. 適當的註釋
```scss
// 生成響應式顯示工具類別
@each $breakpoint, $min-width in $breakpoints {
  @if $min-width > 0 {
    @media (min-width: $min-width) {
      // 為每個斷點生成顯示類別
      .d-#{$breakpoint}-block { display: block !important; }
      .d-#{$breakpoint}-flex { display: flex !important; }
      .d-#{$breakpoint}-none { display: none !important; }
    }
  }
}
```

### 4. 性能考量
```scss
// ❌ 避免：生成過多不必要的類別
@for $i from 1 through 1000 {
  .margin-#{$i} {
    margin: #{$i}px;
  }
}

// ✅ 推薦：只生成需要的類別
$useful-margins: 0, 5, 10, 15, 20, 25, 30, 40, 50;

@each $margin in $useful-margins {
  .m-#{$margin} {
    margin: #{$margin}px;
  }
}
```

## 小結

SCSS 控制指令提供了強大的邏輯控制能力：

- **@if**：條件判斷，根據不同條件生成不同樣式
- **@for**：數字循環，適合生成序列化的類別
- **@each**：遍歷列表和映射，適合批量處理資料
- **@while**：條件循環，適合複雜的動態計算

這些控制指令讓你能夠創建更動態、更靈活的樣式系統，特別適合用於生成工具類別、響應式系統和設計系統。在下一章節中，我們將學習 Maps 資料結構，了解如何更好地組織和操作複雜的資料。