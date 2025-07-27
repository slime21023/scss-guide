+++
title = "映射 (Maps)"
description = "學習 SCSS Maps 資料結構和操作方法"
weight = 3
date = 2024-01-24
+++

# SCSS 映射 (Maps)

Maps 是 SCSS 中的關聯陣列資料結構，類似於其他程式語言中的字典或物件。它們讓你能夠儲存鍵值對，是組織複雜資料和建立可配置系統的強大工具。

## 基本語法

### 定義 Maps

```scss
// 基本語法
$map: (
  key1: value1,
  key2: value2,
  key3: value3
);

// 實際範例
$colors: (
  primary: #3498db,
  secondary: #2ecc71,
  danger: #e74c3c
);

$breakpoints: (
  small: 480px,
  medium: 768px,
  large: 1024px
);
```

### 嵌套 Maps

```scss
$theme-colors: (
  light: (
    primary: #007bff,
    secondary: #6c757d,
    background: #ffffff,
    text: #212529
  ),
  dark: (
    primary: #0d6efd,
    secondary: #6c757d,
    background: #212529,
    text: #ffffff
  )
);

$design-system: (
  colors: (
    brand: (
      primary: #3498db,
      secondary: #2ecc71
    ),
    semantic: (
      success: #27ae60,
      warning: #f39c12,
      error: #e74c3c
    )
  ),
  spacing: (
    xs: 0.25rem,
    sm: 0.5rem,
    md: 1rem,
    lg: 1.5rem,
    xl: 3rem
  ),
  typography: (
    sizes: (
      small: 0.875rem,
      base: 1rem,
      large: 1.125rem
    ),
    weights: (
      light: 300,
      normal: 400,
      bold: 700
    )
  )
);
```

## Map 函數

### 基本操作函數

#### map-get() - 獲取值
```scss
$colors: (
  primary: #3498db,
  secondary: #2ecc71,
  danger: #e74c3c
);

.button {
  background-color: map-get($colors, primary);    // #3498db
  border-color: map-get($colors, secondary);      // #2ecc71
}

// 獲取嵌套值
$theme: (
  light: (
    background: #ffffff,
    text: #212529
  )
);

.component {
  background: map-get(map-get($theme, light), background); // #ffffff
}
```

#### map-has-key() - 檢查鍵是否存在
```scss
$colors: (
  primary: #3498db,
  secondary: #2ecc71
);

@if map-has-key($colors, primary) {
  .button-primary {
    background-color: map-get($colors, primary);
  }
}

@if not map-has-key($colors, tertiary) {
  @warn "Tertiary color not defined";
}
```

#### map-keys() - 獲取所有鍵
```scss
$colors: (
  primary: #3498db,
  secondary: #2ecc71,
  danger: #e74c3c
);

$color-names: map-keys($colors); // (primary, secondary, danger)

// 使用鍵生成類別
@each $color-name in map-keys($colors) {
  .text-#{$color-name} {
    color: map-get($colors, $color-name);
  }
}
```

#### map-values() - 獲取所有值
```scss
$spacing: (
  small: 0.5rem,
  medium: 1rem,
  large: 2rem
);

$spacing-values: map-values($spacing); // (0.5rem, 1rem, 2rem)
```

#### map-merge() - 合併 Maps
```scss
$base-colors: (
  primary: #3498db,
  secondary: #2ecc71
);

$extended-colors: (
  danger: #e74c3c,
  warning: #f39c12
);

$all-colors: map-merge($base-colors, $extended-colors);
// 結果：(primary: #3498db, secondary: #2ecc71, danger: #e74c3c, warning: #f39c12)

// 覆蓋現有值
$updated-colors: map-merge($base-colors, (primary: #007bff));
// 結果：(primary: #007bff, secondary: #2ecc71)
```

#### map-remove() - 移除鍵值對
```scss
$colors: (
  primary: #3498db,
  secondary: #2ecc71,
  danger: #e74c3c,
  warning: #f39c12
);

$filtered-colors: map-remove($colors, danger, warning);
// 結果：(primary: #3498db, secondary: #2ecc71)
```

## 實際應用範例

### 顏色系統管理

```scss
// 定義完整的顏色系統
$color-palette: (
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
    white: #ffffff,
    light: #f8f9fa,
    medium: #6c757d,
    dark: #343a40,
    black: #000000
  )
);

// 輔助函數：獲取顏色
@function color($palette, $tone: primary) {
  $color-map: map-get($color-palette, $palette);
  
  @if not $color-map {
    @error "Unknown color palette: #{$palette}";
  }
  
  $color: map-get($color-map, $tone);
  
  @if not $color {
    @error "Unknown color tone: #{$tone} in palette #{$palette}";
  }
  
  @return $color;
}

// 使用範例
.button {
  background-color: color(brand, primary);     // #3498db
  color: color(neutral, white);                // #ffffff
  border-color: color(brand, secondary);       // #2ecc71
}

.alert {
  &--success {
    background-color: lighten(color(semantic, success), 40%);
    color: color(semantic, success);
    border-color: color(semantic, success);
  }
  
  &--error {
    background-color: lighten(color(semantic, error), 40%);
    color: color(semantic, error);
    border-color: color(semantic, error);
  }
}

// 批量生成顏色工具類別
@each $palette-name, $palette in $color-palette {
  @each $tone-name, $color-value in $palette {
    $class-suffix: if($palette-name == brand, $tone-name, #{$palette-name}-#{$tone-name});
    
    .text-#{$class-suffix} {
      color: $color-value;
    }
    
    .bg-#{$class-suffix} {
      background-color: $color-value;
    }
    
    .border-#{$class-suffix} {
      border-color: $color-value;
    }
  }
}
```

### 響應式斷點系統

```scss
// 定義斷點系統
$breakpoints: (
  xs: (
    min: 0,
    max: 575px
  ),
  sm: (
    min: 576px,
    max: 767px
  ),
  md: (
    min: 768px,
    max: 991px
  ),
  lg: (
    min: 992px,
    max: 1199px
  ),
  xl: (
    min: 1200px,
    max: 1399px
  ),
  xxl: (
    min: 1400px,
    max: null
  )
);

// 輔助函數：獲取斷點值
@function breakpoint($name, $type: min) {
  $breakpoint: map-get($breakpoints, $name);
  
  @if not $breakpoint {
    @error "Unknown breakpoint: #{$name}";
  }
  
  @return map-get($breakpoint, $type);
}

// 響應式混合器
@mixin respond-to($breakpoint) {
  $min: breakpoint($breakpoint, min);
  $max: breakpoint($breakpoint, max);
  
  @if $min == 0 and $max {
    @media (max-width: $max) {
      @content;
    }
  } @else if $min and not $max {
    @media (min-width: $min) {
      @content;
    }
  } @else if $min and $max {
    @media (min-width: $min) and (max-width: $max) {
      @content;
    }
  }
}

// 使用範例
.container {
  width: 100%;
  padding: 0 1rem;
  
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

### 字體系統

```scss
// 定義字體系統
$typography: (
  families: (
    primary: ('Helvetica Neue', Arial, sans-serif),
    secondary: (Georgia, 'Times New Roman', serif),
    monospace: ('Monaco', 'Consolas', monospace)
  ),
  sizes: (
    xs: 0.75rem,
    sm: 0.875rem,
    base: 1rem,
    lg: 1.125rem,
    xl: 1.25rem,
    2xl: 1.5rem,
    3xl: 1.875rem,
    4xl: 2.25rem,
    5xl: 3rem
  ),
  weights: (
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800
  ),
  line-heights: (
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2
  )
);

// 輔助函數
@function font($category, $key) {
  $category-map: map-get($typography, $category);
  
  @if not $category-map {
    @error "Unknown typography category: #{$category}";
  }
  
  $value: map-get($category-map, $key);
  
  @if not $value {
    @error "Unknown #{$category} key: #{$key}";
  }
  
  @return $value;
}

// 字體混合器
@mixin font-style($size: base, $weight: normal, $line-height: normal, $family: primary) {
  font-family: font(families, $family);
  font-size: font(sizes, $size);
  font-weight: font(weights, $weight);
  line-height: font(line-heights, $line-height);
}

// 使用範例
.heading-1 {
  @include font-style(4xl, bold, tight, primary);
}

.heading-2 {
  @include font-style(3xl, semibold, tight, primary);
}

.body-text {
  @include font-style(base, normal, normal, primary);
}

.code {
  @include font-style(sm, normal, normal, monospace);
}

// 生成字體工具類別
@each $size-name, $size-value in map-get($typography, sizes) {
  .text-#{$size-name} {
    font-size: $size-value;
  }
}

@each $weight-name, $weight-value in map-get($typography, weights) {
  .font-#{$weight-name} {
    font-weight: $weight-value;
  }
}
```

### 間距系統

```scss
// 定義間距系統
$spacing-system: (
  base: 1rem,
  scale: 1.5,
  sizes: (
    0: 0,
    1: 0.25rem,
    2: 0.5rem,
    3: 1rem,
    4: 1.5rem,
    5: 3rem,
    6: 4.5rem,
    7: 6.75rem,
    8: 10.125rem
  ),
  directions: (
    t: top,
    r: right,
    b: bottom,
    l: left,
    x: (left, right),
    y: (top, bottom)
  ),
  properties: (
    m: margin,
    p: padding
  )
);

// 輔助函數
@function spacing($size) {
  $sizes: map-get($spacing-system, sizes);
  $value: map-get($sizes, $size);
  
  @if not $value {
    @error "Unknown spacing size: #{$size}";
  }
  
  @return $value;
}

// 生成間距工具類別
@each $property-key, $property-value in map-get($spacing-system, properties) {
  @each $size-key, $size-value in map-get($spacing-system, sizes) {
    // 全方向間距
    .#{$property-key}-#{$size-key} {
      #{$property-value}: $size-value;
    }
    
    // 特定方向間距
    @each $direction-key, $direction-value in map-get($spacing-system, directions) {
      .#{$property-key}#{$direction-key}-#{$size-key} {
        @if type-of($direction-value) == list {
          @each $side in $direction-value {
            #{$property-value}-#{$side}: $size-value;
          }
        } @else {
          #{$property-value}-#{$direction-value}: $size-value;
        }
      }
    }
  }
}
```

### 組件配置系統

```scss
// 按鈕組件配置
$button-config: (
  base: (
    display: inline-block,
    padding: 0.75rem 1.5rem,
    border: none,
    border-radius: 0.375rem,
    font-size: 1rem,
    font-weight: 500,
    line-height: 1.5,
    text-align: center,
    text-decoration: none,
    cursor: pointer,
    transition: all 0.2s ease
  ),
  variants: (
    primary: (
      background: color(brand, primary),
      color: color(neutral, white),
      hover-background: darken(color(brand, primary), 10%)
    ),
    secondary: (
      background: color(brand, secondary),
      color: color(neutral, white),
      hover-background: darken(color(brand, secondary), 10%)
    ),
    outline: (
      background: transparent,
      color: color(brand, primary),
      border: 2px solid color(brand, primary),
      hover-background: color(brand, primary),
      hover-color: color(neutral, white)
    )
  ),
  sizes: (
    small: (
      padding: 0.5rem 1rem,
      font-size: 0.875rem
    ),
    large: (
      padding: 1rem 2rem,
      font-size: 1.125rem
    )
  )
);

// 生成按鈕樣式
.btn {
  // 基礎樣式
  @each $property, $value in map-get($button-config, base) {
    #{$property}: $value;
  }
  
  // 變體樣式
  @each $variant-name, $variant-styles in map-get($button-config, variants) {
    &--#{$variant-name} {
      @each $property, $value in $variant-styles {
        @if $property == hover-background {
          &:hover {
            background-color: $value;
          }
        } @else if $property == hover-color {
          &:hover {
            color: $value;
          }
        } @else {
          #{$property}: $value;
        }
      }
    }
  }
  
  // 尺寸樣式
  @each $size-name, $size-styles in map-get($button-config, sizes) {
    &--#{$size-name} {
      @each $property, $value in $size-styles {
        #{$property}: $value;
      }
    }
  }
}
```

## 進階 Map 技巧

### 深層嵌套操作

```scss
// 深層獲取函數
@function deep-map-get($map, $keys...) {
  $value: $map;
  
  @each $key in $keys {
    $value: map-get($value, $key);
    
    @if $value == null {
      @return null;
    }
  }
  
  @return $value;
}

// 深層設定函數
@function deep-map-set($map, $keys, $value) {
  $maps: ($map,);
  $result: null;
  
  @if length($keys) == 1 {
    @return map-merge($map, (nth($keys, 1): $value));
  }
  
  @for $i from 1 through length($keys) - 1 {
    $current-key: nth($keys, $i);
    $current-map: nth($maps, -1);
    $current-get: map-get($current-map, $current-key);
    
    @if $current-get == null {
      $current-get: ();
    }
    
    $maps: append($maps, $current-get);
  }
  
  @for $i from length($maps) through 1 {
    $current-map: nth($maps, $i);
    $current-key: nth($keys, $i);
    $current-val: if($i == length($maps), $value, $result);
    $result: map-merge($current-map, ($current-key: $current-val));
  }
  
  @return $result;
}

// 使用範例
$config: (
  theme: (
    colors: (
      primary: #3498db
    )
  )
);

// 深層獲取
$primary-color: deep-map-get($config, theme, colors, primary); // #3498db

// 深層設定
$updated-config: deep-map-set($config, (theme, colors, secondary), #2ecc71);
```

### Map 驗證

```scss
// 驗證 Map 結構
@function validate-map($map, $required-keys) {
  @each $key in $required-keys {
    @if not map-has-key($map, $key) {
      @error "Missing required key: #{$key}";
    }
  }
  
  @return true;
}

// 驗證顏色 Map
@function validate-color-palette($palette) {
  $required-keys: (primary, secondary);
  @return validate-map($palette, $required-keys);
}

// 使用範例
$brand-colors: (
  primary: #3498db,
  secondary: #2ecc71
);

@if validate-color-palette($brand-colors) {
  // 安全使用顏色
}
```

### Map 轉換

```scss
// 將 Map 轉換為 CSS 自定義屬性
@mixin map-to-custom-properties($map, $prefix: '') {
  @each $key, $value in $map {
    $property-name: if($prefix != '', --#{$prefix}-#{$key}, --#{$key});
    
    @if type-of($value) == map {
      @include map-to-custom-properties($value, if($prefix != '', #{$prefix}-#{$key}, $key));
    } @else {
      #{$property-name}: #{$value};
    }
  }
}

// 使用範例
:root {
  @include map-to-custom-properties($color-palette, 'color');
}

// 生成結果：
// :root {
//   --color-brand-primary: #3498db;
//   --color-brand-secondary: #2ecc71;
//   --color-semantic-success: #27ae60;
//   ...
// }
```

## 最佳實踐

### 1. 結構化組織
```scss
// ✅ 好的組織方式
$design-tokens: (
  colors: (
    brand: (...),
    semantic: (...),
    neutral: (...)
  ),
  spacing: (...),
  typography: (...)
);

// ❌ 避免：扁平化結構
$all-values: (
  primary-color: #3498db,
  secondary-color: #2ecc71,
  small-spacing: 0.5rem,
  large-spacing: 2rem,
  base-font-size: 1rem
);
```

### 2. 使用輔助函數
```scss
// ✅ 推薦：創建輔助函數
@function color($palette, $tone) {
  @return deep-map-get($design-tokens, colors, $palette, $tone);
}

.button {
  background: color(brand, primary);
}

// ❌ 避免：直接使用 map-get
.button {
  background: map-get(map-get(map-get($design-tokens, colors), brand), primary);
}
```

### 3. 錯誤處理
```scss
@function safe-map-get($map, $key, $fallback: null) {
  @if map-has-key($map, $key) {
    @return map-get($map, $key);
  } @else {
    @if $fallback {
      @warn "Key '#{$key}' not found. Using fallback value.";
      @return $fallback;
    } @else {
      @error "Key '#{$key}' not found and no fallback provided.";
    }
  }
}
```

### 4. 文檔化
```scss
/// 設計系統顏色配置
/// @type Map
/// @prop {Map} brand - 品牌顏色
/// @prop {Color} brand.primary [#3498db] - 主要品牌色
/// @prop {Color} brand.secondary [#2ecc71] - 次要品牌色
/// @prop {Map} semantic - 語義顏色
/// @prop {Color} semantic.success [#27ae60] - 成功狀態色
$color-system: (
  brand: (
    primary: #3498db,
    secondary: #2ecc71
  ),
  semantic: (
    success: #27ae60,
    warning: #f39c12,
    error: #e74c3c
  )
);
```

## 小結

SCSS Maps 是組織複雜資料和建立可配置系統的強大工具：

- **結構化資料**：以鍵值對形式組織相關資料
- **嵌套支援**：支援多層嵌套結構
- **豐富的函數**：提供完整的操作函數集
- **動態生成**：結合控制指令批量生成樣式

Maps 特別適合用於：
- 設計系統配置
- 主題管理
- 響應式斷點
- 組件配置
- 工具類別生成

合理使用 Maps 可以讓你的 SCSS 代碼更加模組化、可配置和易於維護。這是建立大型樣式系統的重要基礎。