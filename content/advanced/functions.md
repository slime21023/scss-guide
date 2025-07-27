+++
title = "函數 (Functions)"
description = "學習 SCSS 內建函數和自定義函數的使用"
weight = 1
date = 2024-01-22
+++

# SCSS 函數 (Functions)

SCSS
提供了豐富的內建函數，同時也支援自定義函數。函數讓你能夠執行計算、操作資料，並返回值，是建立動態樣式系統的重要工具。

## 內建函數

### 數字函數

#### 數學運算

```scss
// 基本數學函數
$width: 100px;
$height: 50px;

.element {
  width: $width;
  height: $height;

  // 絕對值
  margin-top: abs(-10px); // 10px

  // 向上取整
  padding: ceil(15.3px); // 16px

  // 向下取整
  border-width: floor(2.8px); // 2px

  // 四捨五入
  font-size: round(16.7px); // 17px

  // 最大值
  max-width: max(200px, 300px); // 300px

  // 最小值
  min-height: min(100px, 80px); // 80px
}
```

#### 百分比和單位

```scss
$container-width: 1200px;
$sidebar-width: 300px;

.main-content {
  // 計算百分比
  width: percentage($sidebar-width / $container-width); // 25%
}

// 單位相關函數
.element {
  // 移除單位
  $value: 16px;
  line-height: unit($value); // 16

  // 檢查單位
  @if unitless(16px) {
    // false，因為有單位
  }

  @if unitless(1.5) {
    // true，沒有單位
    line-height: 1.5;
  }
}
```

### 字串函數

```scss
$prefix: "app";
$suffix: "component";

.element {
  // 字串長度
  $length: str-length($prefix); // 3

  // 字串連接
  $class-name: $prefix + "-" + $suffix; // 'app-component'

  // 更好的字串連接方式
  $better-name: str-insert($prefix, "-" + $suffix, str-length($prefix) + 1);

  // 字串切片
  $short: str-slice($class-name, 1, 3); // 'app'

  // 字串索引
  $index: str-index($class-name, "-"); // 4

  // 轉換大小寫
  $upper: to-upper-case($prefix); // 'APP'
  $lower: to-lower-case("HELLO"); // 'hello'
}

// 實際應用：生成類別名稱
@function generate-class($base, $modifier: null) {
  @if $modifier {
    @return $base + "--" + $modifier;
  }
  @return $base;
}

.#{generate-class("button", "primary")} {
  // 生成 .button--primary
  background-color: blue;
}
```

### 顏色函數

SCSS 提供了強大的顏色操作函數：

#### 顏色調整

```scss
$primary-color: #3498db;

.color-variations {
  // 原始顏色
  background-color: $primary-color;

  // 變亮
  &--lighter {
    background-color: lighten($primary-color, 20%);
  }

  // 變暗
  &--darker {
    background-color: darken($primary-color, 20%);
  }

  // 增加飽和度
  &--saturated {
    background-color: saturate($primary-color, 30%);
  }

  // 降低飽和度
  &--desaturated {
    background-color: desaturate($primary-color, 30%);
  }

  // 調整透明度
  &--transparent {
    background-color: rgba($primary-color, 0.5);
    // 或使用 transparentize
    background-color: transparentize($primary-color, 0.5);
  }

  // 增加不透明度
  &--opaque {
    background-color: opacify(rgba($primary-color, 0.5), 0.3);
  }
}
```

#### HSL 操作

```scss
$base-color: #3498db;

.hsl-adjustments {
  // 調整色相
  &--hue-shift {
    background-color: adjust-hue($base-color, 60deg);
  }

  // 調整亮度
  &--lighter {
    background-color: adjust-color($base-color, $lightness: 20%);
  }

  // 調整飽和度
  &--more-saturated {
    background-color: adjust-color($base-color, $saturation: 30%);
  }

  // 同時調整多個屬性
  &--custom {
    background-color: adjust-color(
      $base-color,
      $hue: 30deg,
      $saturation: -20%,
      $lightness: 10%
    );
  }
}
```

#### 顏色資訊

```scss
$color: #3498db;

.color-info {
  // 獲取顏色資訊
  $red: red($color); // 52
  $green: green($color); // 152
  $blue: blue($color); // 219
  $alpha: alpha($color); // 1

  $hue: hue($color); // 204deg
  $saturation: saturation($color); // 70%
  $lightness: lightness($color); // 53%

  // 使用這些資訊
  border-color: rgb($red, $green, $blue);
  box-shadow: 0 2px 4px hsla($hue, $saturation, $lightness, 0.3);
}
```

#### 顏色混合

```scss
$color1: #ff0000; // 紅色
$color2: #0000ff; // 藍色

.color-mixing {
  // 混合顏色
  background-color: mix($color1, $color2); // 50% 混合
  border-color: mix($color1, $color2, 75%); // 75% color1, 25% color2

  // 互補色
  color: complement($color1); // 青色

  // 反轉顏色
  background: invert($color1); // 青色
}
```

### 列表函數

```scss
$fonts: "Helvetica", "Arial", sans-serif;
$margins: 10px 15px 20px 25px;

.list-operations {
  // 列表長度
  $font-count: length($fonts); // 3

  // 獲取列表項目
  font-family: nth($fonts, 1); // 'Helvetica'

  // 獲取列表索引
  $index: index($fonts, "Arial"); // 2

  // 添加項目
  $new-fonts: append($fonts, "Georgia");

  // 合併列表
  $all-values: join($margins, $fonts);

  // 列表分隔符
  $comma-list: join($fonts, (), comma);
  $space-list: join($fonts, (), space);
}

// 實際應用：生成工具類別
$spacing-values: 0, 5px, 10px, 15px, 20px, 30px;

@each $value in $spacing-values {
  $index: index($spacing-values, $value);

  .m-#{$index - 1} {
    margin: $value;
  }

  .p-#{$index - 1} {
    padding: $value;
  }
}
```

### 映射函數

```scss
$colors: (
  primary: #3498db,
  secondary: #2ecc71,
  danger: #e74c3c,
  warning: #f39c12,
);

$breakpoints: (
  small: 480px,
  medium: 768px,
  large: 1024px,
  xlarge: 1200px,
);

.map-operations {
  // 獲取映射值
  color: map-get($colors, primary);

  // 檢查鍵是否存在
  @if map-has-key($colors, success) {
    background: map-get($colors, success);
  } @else {
    background: #28a745; // 預設值
  }

  // 獲取所有鍵
  $color-names: map-keys($colors); // (primary, secondary, danger, warning)

  // 獲取所有值
  $color-values: map-values($colors); // (#3498db, #2ecc71, #e74c3c, #f39c12)

  // 合併映射
  $extended-colors: map-merge(
    $colors,
    (
      success: #28a745,
      info: #17a2b8,
    )
  );
}
```

## 自定義函數

### 基本語法

```scss
@function function-name($parameter1, $parameter2: default-value) {
  // 函數邏輯
  @return result;
}
```

### 實用函數範例

#### 單位轉換函數

```scss
// px 轉 rem
@function px-to-rem($px, $base-font-size: 16px) {
  @if unitless($px) {
    $px: $px * 1px;
  }

  @if unitless($base-font-size) {
    $base-font-size: $base-font-size * 1px;
  }

  @return $px / $base-font-size * 1rem;
}

// 使用範例
.element {
  font-size: px-to-rem(18); // 1.125rem
  margin: px-to-rem(24, 16); // 1.5rem
}
```

#### 顏色系統函數

```scss
$colors: (
  brand: (
    primary: #3498db,
    secondary: #2ecc71,
    tertiary: #e74c3c,
  ),
  ui: (
    success: #27ae60,
    warning: #f39c12,
    error: #e74c3c,
    info: #3498db,
  ),
);

@function color($palette, $tone: primary) {
  $color-palette: map-get($colors, $palette);

  @if not $color-palette {
    @error "Unknown color palette: #{$palette}";
  }

  $color: map-get($color-palette, $tone);

  @if not $color {
    @error "Unknown color tone: #{$tone} in palette #{$palette}";
  }

  @return $color;
}

// 使用範例
.button {
  background-color: color(brand, primary); // #3498db
  border-color: color(brand, secondary); // #2ecc71
}

.alert {
  background-color: color(ui, warning); // #f39c12
  color: color(ui, error); // #e74c3c
}
```

#### 間距系統函數

```scss
$spacing-base: 1rem;
$spacing-scale: 1.5;

@function spacing($multiplier: 1) {
  @if $multiplier == 0 {
    @return 0;
  }

  @return $spacing-base * pow($spacing-scale, $multiplier - 1);
}

// 輔助函數：計算冪次
@function pow($base, $exponent) {
  $result: 1;

  @if $exponent > 0 {
    @for $i from 1 through $exponent {
      $result: $result * $base;
    }
  } @else if $exponent < 0 {
    @for $i from 1 through abs($exponent) {
      $result: $result / $base;
    }
  }

  @return $result;
}

// 使用範例
.element {
  margin: spacing(0); // 0
  padding: spacing(1); // 1rem
  margin-top: spacing(2); // 1.5rem
  margin-bottom: spacing(3); // 2.25rem
}
```

#### 響應式斷點函數

```scss
$breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px,
);

@function breakpoint($name) {
  $breakpoint: map-get($breakpoints, $name);

  @if not $breakpoint {
    @error "Unknown breakpoint: #{$name}. Available breakpoints: #{map-keys(
      $breakpoints
    )}";
  }

  @return $breakpoint;
}

@function breakpoint-min($name) {
  $min: breakpoint($name);
  @return if($min != 0, $min, null);
}

@function breakpoint-max($name) {
  $names: map-keys($breakpoints);
  $n: index($names, $name);

  @if not $n {
    @error "Unknown breakpoint: #{$name}";
  }

  @if $n < length($names) {
    $next: nth($names, $n + 1);
    @return breakpoint($next) - 0.02;
  }

  @return null;
}

// 使用範例
@media (min-width: breakpoint-min(md)) {
  .container {
    max-width: 720px;
  }
}

@media (max-width: breakpoint-max(sm)) {
  .mobile-only {
    display: block;
  }
}
```

#### 字串處理函數

```scss
// 首字母大寫
@function capitalize($string) {
  $first-letter: to-upper-case(str-slice($string, 1, 1));
  $rest: str-slice($string, 2);
  @return $first-letter + $rest;
}

// 駝峰命名轉連字符
@function kebab-case($string) {
  $result: "";

  @for $i from 1 through str-length($string) {
    $char: str-slice($string, $i, $i);

    @if $char == to-upper-case($char) and $i > 1 {
      $result: $result + "-" + to-lower-case($char);
    } @else {
      $result: $result + to-lower-case($char);
    }
  }

  @return $result;
}

// 使用範例
.#{kebab-case("primaryButton")} {
  // .primary-button
  background: blue;
}
```

#### 數學函數

```scss
// 計算對比度
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
  $green: if(
    $green <= 0.03928,
    $green / 12.92,
    pow(($green + 0.055) / 1.055, 2.4)
  );
  $blue: if($blue <= 0.03928, $blue / 12.92, pow(($blue + 0.055) / 1.055, 2.4));

  @return 0.2126 * $red + 0.7152 * $green + 0.0722 * $blue;
}

// 自動選擇文字顏色
@function auto-text-color($bg-color, $light: #fff, $dark: #000) {
  $contrast-light: contrast-ratio($bg-color, $light);
  $contrast-dark: contrast-ratio($bg-color, $dark);

  @return if($contrast-light > $contrast-dark, $light, $dark);
}

// 使用範例
.button {
  $bg: #3498db;
  background-color: $bg;
  color: auto-text-color($bg); // 自動選擇最佳對比度的文字顏色
}
```

## 進階函數技巧

### 可變參數

```scss
@function sum($numbers...) {
  $total: 0;

  @each $number in $numbers {
    $total: $total + $number;
  }

  @return $total;
}

.element {
  width: sum(10px, 20px, 30px); // 60px
}
```

### 遞迴函數

```scss
// 計算階乘
@function factorial($n) {
  @if $n <= 1 {
    @return 1;
  }

  @return $n * factorial($n - 1);
}

// 斐波那契數列
@function fibonacci($n) {
  @if $n <= 2 {
    @return 1;
  }

  @return fibonacci($n - 1) + fibonacci($n - 2);
}
```

### 條件函數

```scss
@function theme-color($color-name, $theme: light) {
  $light-colors: (
    primary: #007bff,
    secondary: #6c757d,
    background: #ffffff,
    text: #212529,
  );

  $dark-colors: (
    primary: #0d6efd,
    secondary: #6c757d,
    background: #212529,
    text: #ffffff,
  );

  $colors: if($theme == dark, $dark-colors, $light-colors);

  @return map-get($colors, $color-name);
}

// 使用範例
.component {
  background: theme-color(background, light);
  color: theme-color(text, light);

  .dark-theme & {
    background: theme-color(background, dark);
    color: theme-color(text, dark);
  }
}
```

## 函數最佳實踐

### 1. 錯誤處理

```scss
@function safe-divide($dividend, $divisor) {
  @if $divisor == 0 {
    @error "Cannot divide by zero";
  }

  @return $dividend / $divisor;
}

@function get-color($name) {
  @if not map-has-key($colors, $name) {
    @warn "Color '#{$name}' not found. Using fallback.";
    @return #000;
  }

  @return map-get($colors, $name);
}
```

### 2. 參數驗證

```scss
@function validate-unit($value, $unit) {
  @if unit($value) != $unit {
    @error "Expected #{$unit} but got #{unit($value)}";
  }

  @return $value;
}

@function px-to-rem($px) {
  $validated: validate-unit($px, "px");
  @return $validated / 16px * 1rem;
}
```

### 3. 文檔化

```scss
/// 將 px 值轉換為 rem
/// @param {Number} $px - 要轉換的 px 值
/// @param {Number} $base-font-size [16px] - 基礎字體大小
/// @return {Number} - 轉換後的 rem 值
/// @example scss
///   font-size: px-to-rem(18px); // 1.125rem
@function px-to-rem($px, $base-font-size: 16px) {
  @return $px / $base-font-size * 1rem;
}
```

### 4. 性能考量

```scss
// ❌ 避免：複雜的重複計算
@function expensive-calculation($value) {
  // 複雜計算
  @return $value * 2.5 + 10px;
}

.element {
  width: expensive-calculation(100px);
  height: expensive-calculation(100px); // 重複計算
}

// ✅ 推薦：使用變數快取結果
$calculated-value: expensive-calculation(100px);

.element {
  width: $calculated-value;
  height: $calculated-value;
}
```

## 實際應用範例

### 設計系統函數庫

```scss
// 設計系統配置
$design-tokens: (
  colors: (
    brand: (
      primary: #3498db,
      secondary: #2ecc71,
    ),
    semantic: (
      success: #27ae60,
      warning: #f39c12,
      error: #e74c3c,
    ),
  ),
  spacing: (
    base: 1rem,
    scale: 1.5,
  ),
  typography: (
    base-size: 16px,
    scale: 1.25,
  ),
);

// 通用取值函數
@function token($path...) {
  $value: $design-tokens;

  @each $key in $path {
    $value: map-get($value, $key);

    @if not $value {
      @error "Token not found: #{$path}";
    }
  }

  @return $value;
}

// 專用函數
@function color($palette, $tone) {
  @return token(colors, $palette, $tone);
}

@function spacing($level) {
  $base: token(spacing, base);
  $scale: token(spacing, scale);
  @return $base * pow($scale, $level - 1);
}

@function font-size($level) {
  $base: token(typography, base-size);
  $scale: token(typography, scale);
  @return $base * pow($scale, $level - 1);
}

// 使用範例
.component {
  background: color(brand, primary);
  color: color(semantic, success);
  padding: spacing(2);
  font-size: font-size(3);
}
```

## 小結

SCSS 函數是建立動態、可維護樣式系統的強大工具：

- **內建函數**：提供豐富的數字、字串、顏色、列表操作
- **自定義函數**：創建專案特定的工具函數
- **錯誤處理**：確保函數的健壯性
- **文檔化**：提高代碼的可讀性和可維護性

合理使用函數可以大大提升 SCSS
代碼的重用性和一致性。在下一章節中，我們將學習控制指令，了解如何在 SCSS
中使用條件和循環邏輯。
