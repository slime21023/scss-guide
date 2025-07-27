+++
title = "變數 (Variables)"
description = "學習如何使用 SCSS 變數來管理樣式值"
weight = 1
date = 2024-01-15
+++

# SCSS 變數 (Variables)

變數是 SCSS 最基本也是最實用的功能之一。它讓你可以將常用的值（如顏色、字體大小、間距等）儲存在變數中，方便重複使用和統一管理。

<div class="callout tip">
使用有意義的變數名稱可以讓你的代碼更容易理解和維護。例如使用 `$primary-color` 而不是 `$blue`。
</div>


## 基本語法

SCSS 變數以 `$` 符號開頭，使用 `:` 來賦值：

```scss
// 定義變數
$primary-color: #3498db;
$font-size-base: 16px;
$margin-default: 20px;

// 使用變數
.button {
  background-color: $primary-color;
  font-size: $font-size-base;
  margin: $margin-default;
}
```

編譯後的 CSS：

```css
.button {
  background-color: #3498db;
  font-size: 16px;
  margin: 20px;
}
```

## 變數類型

SCSS 支援多種資料類型的變數：

### 1. 數字 (Numbers)
```scss
$width: 100px;
$ratio: 1.5;
$percentage: 50%;
```

### 2. 字串 (Strings)
```scss
$font-family: 'Helvetica Neue', sans-serif;
$image-path: '/images/';
```

### 3. 顏色 (Colors)
```scss
$primary: #3498db;
$secondary: rgb(231, 76, 60);
$accent: hsl(120, 100%, 50%);
```

### 4. 布林值 (Booleans)
```scss
$rounded: true;
$shadow: false;
```

### 5. 空值 (Null)
```scss
$border: null;
```

### 6. 列表 (Lists)
```scss
$margins: 10px 15px 20px 25px;
$fonts: 'Helvetica', 'Arial', sans-serif;
```

### 7. 映射 (Maps)
```scss
$breakpoints: (
  small: 480px,
  medium: 768px,
  large: 1024px
);
```

## 變數作用域

### 全域變數
在任何選擇器外部定義的變數是全域變數：

```scss
$global-color: #333; // 全域變數

.header {
  color: $global-color; // 可以使用
}

.footer {
  color: $global-color; // 也可以使用
}
```

### 區域變數
在選擇器內部定義的變數是區域變數：

```scss
.component {
  $local-padding: 15px; // 區域變數
  padding: $local-padding;
  
  .inner {
    padding: $local-padding; // 可以使用
  }
}

.other-component {
  // padding: $local-padding; // 錯誤！無法存取
}
```

### !global 標誌
使用 `!global` 可以在區域作用域中修改全域變數：

```scss
$color: red; // 全域變數

.component {
  $color: blue !global; // 修改全域變數
}

.other {
  color: $color; // 現在是 blue
}
```

## !default 標誌

`!default` 標誌讓變數只在未定義時才賦值，常用於函式庫：

```scss
$base-font-size: 16px !default;
$primary-color: #007bff !default;

// 如果之前已經定義過，則不會被覆蓋
$primary-color: #28a745; // 這個值會被使用
$base-font-size: 14px !default; // 這個不會覆蓋上面的值
```

## 變數插值 (Interpolation)

使用 `#{}` 可以在選擇器名稱、屬性名稱或字串中插入變數：

```scss
$prefix: 'app';
$property: 'margin';

.#{$prefix}-header {
  #{$property}-top: 20px;
}

// 編譯結果
.app-header {
  margin-top: 20px;
}
```

## 實際應用範例

### 色彩系統
```scss
// 主要色彩
$primary: #007bff;
$secondary: #6c757d;
$success: #28a745;
$danger: #dc3545;
$warning: #ffc107;
$info: #17a2b8;

// 灰階色彩
$white: #fff;
$gray-100: #f8f9fa;
$gray-200: #e9ecef;
$gray-300: #dee2e6;
$gray-800: #343a40;
$black: #000;

// 使用範例
.btn-primary {
  background-color: $primary;
  border-color: $primary;
  color: $white;
}

.alert-success {
  background-color: lighten($success, 45%);
  border-color: $success;
  color: darken($success, 20%);
}
```

### 字體系統
```scss
// 字體家族
$font-family-base: 'Helvetica Neue', Arial, sans-serif;
$font-family-monospace: 'Monaco', 'Consolas', monospace;

// 字體大小
$font-size-xs: 0.75rem;   // 12px
$font-size-sm: 0.875rem;  // 14px
$font-size-base: 1rem;    // 16px
$font-size-lg: 1.25rem;   // 20px
$font-size-xl: 1.5rem;    // 24px

// 行高
$line-height-base: 1.5;
$line-height-sm: 1.25;
$line-height-lg: 2;

// 使用範例
body {
  font-family: $font-family-base;
  font-size: $font-size-base;
  line-height: $line-height-base;
}

.text-small {
  font-size: $font-size-sm;
  line-height: $line-height-sm;
}
```

### 間距系統
```scss
// 基礎間距單位
$spacer: 1rem; // 16px

// 間距比例
$spacers: (
  0: 0,
  1: $spacer * 0.25,  // 4px
  2: $spacer * 0.5,   // 8px
  3: $spacer,         // 16px
  4: $spacer * 1.5,   // 24px
  5: $spacer * 3      // 48px
);

// 使用範例
.mb-3 {
  margin-bottom: map-get($spacers, 3);
}

.p-4 {
  padding: map-get($spacers, 4);
}
```

## 最佳實踐

### 1. 使用有意義的命名
```scss
// 好的命名
$primary-color: #007bff;
$header-height: 60px;
$border-radius-small: 4px;

// 避免的命名
$blue: #007bff;
$height: 60px;
$radius: 4px;
```

### 2. 組織變數結構
```scss
// 將相關變數分組
// ===== 色彩 =====
$primary: #007bff;
$secondary: #6c757d;

// ===== 字體 =====
$font-family-base: sans-serif;
$font-size-base: 1rem;

// ===== 間距 =====
$padding-base: 1rem;
$margin-base: 1rem;
```

### 3. 使用 !default 建立可配置的系統
```scss
// 在函式庫或框架中
$primary-color: #007bff !default;
$font-size-base: 1rem !default;

// 使用者可以在引入前覆蓋
$primary-color: #28a745;
@import 'your-framework';
```

## 常見錯誤

### 1. 變數未定義
```scss
.button {
  color: $undefined-variable; // 錯誤：變數未定義
}
```

### 2. 作用域問題
```scss
.component {
  $local-var: red;
}

.other {
  color: $local-var; // 錯誤：無法存取區域變數
}
```

### 3. 循環引用
```scss
$a: $b;
$b: $a; // 錯誤：循環引用
```

## 小結

SCSS 變數是建立可維護樣式系統的基礎。透過合理使用變數，你可以：

- 提高代碼的可維護性
- 確保設計的一致性
- 簡化全域樣式的修改
- 建立可重用的樣式系統

掌握變數的使用是學習 SCSS 的第一步，也是最重要的一步。在接下來的章節中，我們將學習如何結合變數使用其他 SCSS 功能。