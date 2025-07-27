+++
title = "繼承 (Inheritance)"
description = "學習使用 @extend 指令來共享樣式規則"
weight = 4
date = 2024-01-18
+++

# SCSS 繼承 (Inheritance)

繼承是 SCSS 中另一種重用樣式的方法，通過 `@extend` 指令，一個選擇器可以繼承另一個選擇器的所有樣式。這種方法在生成的 CSS 中會將選擇器組合在一起，而不是複製樣式規則。

## 基本語法

### 基礎繼承
```scss
.button {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  font-size: 1rem;
}

.button-primary {
  @extend .button;
  background-color: #007bff;
  color: white;
}

.button-secondary {
  @extend .button;
  background-color: #6c757d;
  color: white;
}
```

編譯結果：
```css
.button, .button-primary, .button-secondary {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  font-size: 1rem;
}

.button-primary {
  background-color: #007bff;
  color: white;
}

.button-secondary {
  background-color: #6c757d;
  color: white;
}
```

## 佔位符選擇器 (Placeholder Selectors)

佔位符選擇器以 `%` 開頭，它們不會出現在編譯後的 CSS 中，除非被繼承：

```scss
%button-base {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  font-size: 1rem;
  transition: all 0.2s;
}

.btn-primary {
  @extend %button-base;
  background-color: #007bff;
  color: white;
  
  &:hover {
    background-color: #0056b3;
  }
}

.btn-success {
  @extend %button-base;
  background-color: #28a745;
  color: white;
  
  &:hover {
    background-color: #1e7e34;
  }
}
```

編譯結果：
```css
.btn-primary, .btn-success {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  font-size: 1rem;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #1e7e34;
}
```

## 複雜選擇器繼承

### 繼承偽類
```scss
%link-style {
  color: #007bff;
  text-decoration: none;
  
  &:hover {
    color: #0056b3;
    text-decoration: underline;
  }
  
  &:visited {
    color: #6f42c1;
  }
}

.nav-link {
  @extend %link-style;
  font-weight: 500;
}

.footer-link {
  @extend %link-style;
  font-size: 0.9rem;
}
```

### 繼承嵌套選擇器
```scss
%card-base {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  .card-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e9ecef;
    font-weight: 600;
  }
  
  .card-body {
    padding: 1.5rem;
  }
}

.product-card {
  @extend %card-base;
  
  .card-header {
    background-color: #f8f9fa;
  }
}

.user-card {
  @extend %card-base;
  
  .card-body {
    text-align: center;
  }
}
```

## 實際應用範例

### 表單元素
```scss
%form-element {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
  
  &:disabled {
    background-color: #e9ecef;
    opacity: 1;
  }
}

.form-input {
  @extend %form-element;
}

.form-textarea {
  @extend %form-element;
  resize: vertical;
  min-height: 100px;
}

.form-select {
  @extend %form-element;
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23666' d='m2 0-2 2h4zm0 5 2-2h-4z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
}
```

### 狀態樣式
```scss
%alert-base {
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 4px;
  
  .alert-heading {
    color: inherit;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .alert-link {
    font-weight: 600;
  }
}

.alert-success {
  @extend %alert-base;
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
  
  .alert-link {
    color: #0b2e13;
  }
}

.alert-danger {
  @extend %alert-base;
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  
  .alert-link {
    color: #491217;
  }
}

.alert-warning {
  @extend %alert-base;
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeaa7;
  
  .alert-link {
    color: #533f03;
  }
}
```

### 佈局系統
```scss
%container-base {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.container {
  @extend %container-base;
  max-width: 1140px;
}

.container-fluid {
  @extend %container-base;
}

.container-sm {
  @extend %container-base;
  max-width: 540px;
}

%flex-base {
  display: flex;
  flex-wrap: wrap;
}

.row {
  @extend %flex-base;
  margin-right: -15px;
  margin-left: -15px;
}

.d-flex {
  @extend %flex-base;
}
```

## 多重繼承

一個選擇器可以繼承多個選擇器：

```scss
%rounded {
  border-radius: 8px;
}

%shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

%transition {
  transition: all 0.2s ease;
}

.card {
  @extend %rounded;
  @extend %shadow;
  @extend %transition;
  background: white;
  padding: 1.5rem;
}

.modal {
  @extend %rounded;
  @extend %shadow;
  background: white;
  padding: 2rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

## 條件繼承

可以在條件語句中使用繼承：

```scss
%button-base {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

@mixin button-variant($style) {
  @extend %button-base;
  
  @if $style == primary {
    background-color: #007bff;
    color: white;
  } @else if $style == secondary {
    background-color: #6c757d;
    color: white;
  } @else if $style == outline {
    background-color: transparent;
    border: 1px solid #007bff;
    color: #007bff;
  }
}

.btn-primary {
  @include button-variant(primary);
}

.btn-outline {
  @include button-variant(outline);
}
```

## 繼承 vs 混合器

### 何時使用繼承
```scss
// ✅ 適合繼承：共享基礎樣式
%button-base {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  @extend %button-base;
  background: #007bff;
  color: white;
}

.btn-secondary {
  @extend %button-base;
  background: #6c757d;
  color: white;
}
```

### 何時使用混合器
```scss
// ✅ 適合混合器：需要參數化
@mixin button($bg-color, $text-color) {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: $bg-color;
  color: $text-color;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-custom-1 {
  @include button(#ff6b6b, white);
}

.btn-custom-2 {
  @include button(#4ecdc4, #2c3e50);
}
```

## 最佳實踐

### 1. 優先使用佔位符選擇器
```scss
// ✅ 推薦：使用佔位符
%button-base {
  display: inline-block;
  padding: 0.5rem 1rem;
}

// ❌ 避免：直接繼承類別
.button-base {
  display: inline-block;
  padding: 0.5rem 1rem;
}
```

### 2. 邏輯分組
```scss
// ✅ 按功能分組佔位符
// 基礎佈局
%flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

%flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

// 視覺效果
%card-shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

%rounded {
  border-radius: 8px;
}
```

### 3. 避免過深的繼承鏈
```scss
// ❌ 避免：過深的繼承
%base {
  color: black;
}

%extended-base {
  @extend %base;
  font-size: 1rem;
}

%super-extended {
  @extend %extended-base;
  font-weight: bold;
}

// ✅ 推薦：扁平的繼承結構
%text-base {
  color: black;
  font-size: 1rem;
}

%text-bold {
  @extend %text-base;
  font-weight: bold;
}
```

### 4. 命名規範
```scss
// ✅ 清晰的命名
%btn-base { }
%form-element { }
%card-layout { }

// ❌ 模糊的命名
%base { }
%element { }
%layout { }
```

## 常見錯誤

### 1. 繼承不存在的選擇器
```scss
.button {
  @extend .non-existent; // 錯誤：選擇器不存在
}
```

### 2. 在媒體查詢中繼承外部選擇器
```scss
%button-base {
  padding: 0.5rem 1rem;
}

@media (max-width: 768px) {
  .mobile-button {
    @extend %button-base; // 錯誤：無法跨媒體查詢繼承
  }
}

// ✅ 正確做法：在媒體查詢內定義佔位符
@media (max-width: 768px) {
  %mobile-button-base {
    padding: 0.25rem 0.5rem;
  }
  
  .mobile-button {
    @extend %mobile-button-base;
  }
}
```

### 3. 過度使用繼承
```scss
// ❌ 不必要的繼承
%red-text {
  color: red;
}

.error {
  @extend %red-text;
}

// ✅ 直接使用變數更簡單
$error-color: red;

.error {
  color: $error-color;
}
```

## 性能考量

### CSS 輸出大小比較

使用繼承：
```scss
%button-base {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
}

.btn-1 { @extend %button-base; background: red; }
.btn-2 { @extend %button-base; background: blue; }
.btn-3 { @extend %button-base; background: green; }
```

輸出：
```css
.btn-1, .btn-2, .btn-3 {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
}

.btn-1 { background: red; }
.btn-2 { background: blue; }
.btn-3 { background: green; }
```

使用混合器：
```scss
@mixin button-base {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
}

.btn-1 { @include button-base; background: red; }
.btn-2 { @include button-base; background: blue; }
.btn-3 { @include button-base; background: green; }
```

輸出：
```css
.btn-1 {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  background: red;
}

.btn-2 {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  background: blue;
}

.btn-3 {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  background: green;
}
```

繼承通常產生更小的 CSS 文件，但可能會產生複雜的選擇器組合。

## 小結

SCSS 繼承功能讓你能夠：

- 減少 CSS 輸出的大小
- 建立一致的樣式基礎
- 通過佔位符選擇器創建純粹的樣式模板
- 避免重複的樣式聲明

選擇繼承還是混合器取決於具體需求：
- **繼承**：適合共享固定的基礎樣式
- **混合器**：適合需要參數化或條件邏輯的情況

在實際項目中，兩者經常結合使用，以達到最佳的代碼組織效果。