# Educational Callouts Usage Guide

The hydoc theme provides three types of educational callouts to enhance learning content:

## Usage Methods

### Method 1: HTML Div with Classes (Recommended)

```html
<div class="callout tip">
這是一個提示框，用於提供有用的建議和技巧。
</div>

<div class="callout warning">
這是一個警告框，用於提醒用戶注意重要事項。
</div>

<div class="callout important">
這是一個重要信息框，用於強調關鍵概念。
</div>
```

### Method 2: Blockquote with Classes (Markdown Compatible)

```markdown
> 這是一個提示框，使用 blockquote 語法。
{: .tip}

> 這是一個警告框，使用 blockquote 語法。
{: .warning}

> 這是一個重要信息框，使用 blockquote 語法。
{: .important}
```

## Callout Types

### 💡 Tip (提示)
- **Purpose**: Provide helpful suggestions and best practices
- **Color**: Blue theme
- **Usage**: Tips, suggestions, pro tips

### ⚠️ Warning (注意)
- **Purpose**: Alert users to potential issues or important considerations
- **Color**: Orange/yellow theme
- **Usage**: Warnings, cautions, things to avoid

### ❗ Important (重要)
- **Purpose**: Highlight critical information that must not be missed
- **Color**: Red theme
- **Usage**: Critical information, key concepts, must-know facts

## Features

- **Responsive Design**: Works well on all screen sizes
- **Nested Content**: Supports paragraphs, lists, and code blocks
- **Consistent Typography**: Matches the overall theme design
- **Print Friendly**: Optimized for print output
- **Accessibility**: Good color contrast and semantic structure

## Examples in Context

### Code Example with Tip

<div class="callout tip">
在使用 SCSS 變數時，建議使用有意義的命名方式，例如 `$primary-color` 而不是 `$blue`。
</div>

```scss
$primary-color: #3498db;
$secondary-color: #2c3e50;
```

### Warning with Code

<div class="callout warning">
避免過度嵌套 SCSS 規則，超過 3-4 層的嵌套會使代碼難以維護。

```scss
// 避免這樣做
.header {
  .nav {
    .menu {
      .item {
        .link {
          color: blue; // 太深的嵌套
        }
      }
    }
  }
}
```
</div>

### Important Information

<div class="callout important">
記住：SCSS 是 CSS 的預處理器，最終都會編譯成標準的 CSS。理解這一點對於調試和優化非常重要。
</div>