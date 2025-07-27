+++
title = "嵌套 (Nesting)"
description = "學習 SCSS 嵌套語法，組織更清晰的樣式結構"
weight = 2
date = 2024-01-16
+++

# SCSS 嵌套 (Nesting)

嵌套是 SCSS 的核心功能之一，它讓你可以將 CSS 規則嵌套在其他規則內部，使樣式結構更清晰，更符合 HTML 的層級關係。

## 基本嵌套語法

### 基礎嵌套
```scss
.navbar {
  background-color: #333;
  padding: 1rem;
  
  .nav-item {
    display: inline-block;
    margin-right: 1rem;
    
    .nav-link {
      color: white;
      text-decoration: none;
      
      &:hover {
        color: #ccc;
      }
    }
  }
}
```

編譯後的 CSS：
```css
.navbar {
  background-color: #333;
  padding: 1rem;
}

.navbar .nav-item {
  display: inline-block;
  margin-right: 1rem;
}

.navbar .nav-item .nav-link {
  color: white;
  text-decoration: none;
}

.navbar .nav-item .nav-link:hover {
  color: #ccc;
}
```

## 父選擇器引用 (&)

`&` 符號代表父選擇器，是嵌套中最重要的概念之一。

### 偽類和偽元素
```scss
.button {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  
  &:hover {
    background-color: #0056b3;
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &::before {
    content: '';
    display: inline-block;
  }
}
```

### 修飾符類別
```scss
.card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  
  &.card-primary {
    border-color: #007bff;
    
    .card-header {
      background-color: #007bff;
      color: white;
    }
  }
  
  &.card-large {
    padding: 2rem;
    font-size: 1.2rem;
  }
  
  &.card-shadow {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
}
```

### 父選擇器後綴
```scss
.icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  
  &-small {
    width: 12px;
    height: 12px;
  }
  
  &-large {
    width: 24px;
    height: 24px;
  }
  
  &-primary {
    color: #007bff;
  }
}
```

編譯結果：
```css
.icon {
  display: inline-block;
  width: 16px;
  height: 16px;
}

.icon-small {
  width: 12px;
  height: 12px;
}

.icon-large {
  width: 24px;
  height: 24px;
}

.icon-primary {
  color: #007bff;
}
```

## 屬性嵌套

SCSS 允許嵌套具有相同命名空間的 CSS 屬性：

```scss
.text {
  font: {
    family: 'Helvetica Neue', sans-serif;
    size: 16px;
    weight: bold;
    style: italic;
  }
  
  margin: {
    top: 10px;
    bottom: 15px;
    left: 20px;
    right: 20px;
  }
  
  border: {
    width: 1px;
    style: solid;
    color: #ccc;
    radius: 4px;
  }
}
```

編譯結果：
```css
.text {
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 16px;
  font-weight: bold;
  font-style: italic;
  margin-top: 10px;
  margin-bottom: 15px;
  margin-left: 20px;
  margin-right: 20px;
  border-width: 1px;
  border-style: solid;
  border-color: #ccc;
  border-radius: 4px;
}
```

## 媒體查詢嵌套

SCSS 允許在選擇器內部嵌套媒體查詢：

```scss
.sidebar {
  width: 300px;
  background-color: #f8f9fa;
  padding: 1rem;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 0.5rem;
  }
  
  @media (max-width: 480px) {
    display: none;
  }
  
  .sidebar-item {
    padding: 0.5rem;
    border-bottom: 1px solid #dee2e6;
    
    @media (max-width: 768px) {
      padding: 0.25rem;
      font-size: 0.9rem;
    }
  }
}
```

## 實際應用範例

### 導航選單
```scss
.navigation {
  background-color: #2c3e50;
  
  .nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    
    .nav-item {
      position: relative;
      
      .nav-link {
        display: block;
        padding: 1rem 1.5rem;
        color: white;
        text-decoration: none;
        transition: background-color 0.3s;
        
        &:hover {
          background-color: #34495e;
        }
        
        &.active {
          background-color: #3498db;
        }
      }
      
      // 下拉選單
      .dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        background-color: #34495e;
        min-width: 200px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s;
        
        .dropdown-item {
          .dropdown-link {
            padding: 0.75rem 1.5rem;
            color: white;
            text-decoration: none;
            display: block;
            
            &:hover {
              background-color: #3498db;
            }
          }
        }
      }
      
      &:hover .dropdown {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
    }
  }
}
```

### 卡片組件
```scss
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .card-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e9ecef;
    background-color: #f8f9fa;
    
    .card-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: #2c3e50;
    }
    
    .card-subtitle {
      margin: 0.5rem 0 0;
      color: #6c757d;
      font-size: 0.9rem;
    }
  }
  
  .card-body {
    padding: 1.5rem;
    
    .card-text {
      margin-bottom: 1rem;
      line-height: 1.6;
      color: #495057;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  
  .card-footer {
    padding: 1rem 1.5rem;
    background-color: #f8f9fa;
    border-top: 1px solid #e9ecef;
    
    .card-actions {
      display: flex;
      gap: 0.5rem;
      justify-content: flex-end;
      
      .btn {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
        
        &.btn-primary {
          background-color: #007bff;
          color: white;
          
          &:hover {
            background-color: #0056b3;
          }
        }
        
        &.btn-secondary {
          background-color: #6c757d;
          color: white;
          
          &:hover {
            background-color: #545b62;
          }
        }
      }
    }
  }
}
```

## 嵌套最佳實踐

### 1. 控制嵌套深度
避免過深的嵌套（建議不超過 3-4 層）：

```scss
// ❌ 避免：過深的嵌套
.page {
  .container {
    .row {
      .col {
        .card {
          .card-body {
            .content {
              // 太深了！
            }
          }
        }
      }
    }
  }
}

// ✅ 推薦：合理的嵌套深度
.page {
  .container {
    padding: 1rem;
  }
}

.card {
  .card-body {
    padding: 1.5rem;
    
    .content {
      line-height: 1.6;
    }
  }
}
```

### 2. 合理使用父選擇器
```scss
// ✅ 好的使用方式
.button {
  background: #007bff;
  
  &:hover {
    background: #0056b3;
  }
  
  &.button-large {
    padding: 1rem 2rem;
  }
  
  &--primary {
    background: #28a745;
  }
}

// ❌ 避免過度複雜的父選擇器操作
.component {
  .#{&}__element {
    .#{&}__element--modifier {
      // 過於複雜
    }
  }
}
```

### 3. 邏輯分組
將相關的樣式規則分組：

```scss
.form {
  // 基本樣式
  background: white;
  padding: 2rem;
  border-radius: 8px;
  
  // 標題樣式
  .form-title {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    color: #2c3e50;
  }
  
  // 輸入欄位樣式
  .form-group {
    margin-bottom: 1rem;
    
    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }
    
    .form-input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ced4da;
      border-radius: 4px;
      
      &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
      }
      
      &.error {
        border-color: #dc3545;
      }
    }
  }
  
  // 按鈕樣式
  .form-actions {
    margin-top: 2rem;
    text-align: right;
    
    .btn {
      margin-left: 0.5rem;
    }
  }
}
```

## 常見錯誤

### 1. 過度嵌套
```scss
// ❌ 錯誤：不必要的深層嵌套
.header {
  .container {
    .row {
      .col {
        .nav {
          .nav-item {
            .nav-link {
              color: blue;
            }
          }
        }
      }
    }
  }
}

// ✅ 正確：扁平化結構
.nav-link {
  color: blue;
}
```

### 2. 誤用父選擇器
```scss
// ❌ 錯誤：不必要的父選擇器
.button {
  & {
    background: blue; // 不需要 &
  }
}

// ✅ 正確：直接寫屬性
.button {
  background: blue;
}
```

### 3. 混亂的嵌套結構
```scss
// ❌ 錯誤：邏輯混亂
.card {
  background: white;
  
  .other-component {
    color: red; // 不相關的組件
  }
  
  padding: 1rem;
  
  .card-title {
    font-size: 1.2rem;
  }
  
  border: 1px solid #ddd;
}

// ✅ 正確：邏輯清晰
.card {
  background: white;
  padding: 1rem;
  border: 1px solid #ddd;
  
  .card-title {
    font-size: 1.2rem;
  }
}

.other-component {
  color: red;
}
```

## 小結

SCSS 嵌套功能讓你能夠：

- 建立更清晰的樣式結構
- 減少重複的選擇器
- 更好地組織相關的樣式規則
- 利用父選擇器創建變體和狀態

記住要適度使用嵌套，避免過深的層級，保持代碼的可讀性和可維護性。在下一章節中，我們將學習如何使用混合器 (Mixins) 來創建可重用的樣式片段。