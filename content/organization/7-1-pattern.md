+++
title = "7-1 模式"
description = "學習業界廣泛採用的 SCSS 項目架構模式"
weight = 1
date = 2024-01-19
+++

# 7-1 模式 (7-1 Pattern)

7-1 模式是目前最受歡迎的 SCSS 項目組織方法之一，由 Sass 社群廣泛採用。這個模式將樣式文件組織成 7 個資料夾和 1 個主要的匯入文件，提供清晰的結構和良好的可維護性。

## 基本結構

```
scss/
│
├── abstracts/          # 工具和輔助文件
│   ├── _variables.scss
│   ├── _functions.scss
│   ├── _mixins.scss
│   └── _placeholders.scss
│
├── base/              # 基礎樣式
│   ├── _reset.scss
│   ├── _typography.scss
│   └── _base.scss
│
├── components/        # 組件樣式
│   ├── _buttons.scss
│   ├── _carousel.scss
│   ├── _cover.scss
│   └── _dropdown.scss
│
├── layout/           # 佈局相關
│   ├── _navigation.scss
│   ├── _grid.scss
│   ├── _header.scss
│   ├── _footer.scss
│   └── _sidebar.scss
│
├── pages/            # 頁面特定樣式
│   ├── _home.scss
│   ├── _contact.scss
│   └── _about.scss
│
├── themes/           # 主題樣式
│   ├── _theme.scss
│   └── _admin.scss
│
├── vendors/          # 第三方樣式
│   ├── _normalize.scss
│   └── _bootstrap.scss
│
└── main.scss         # 主要匯入文件
```

## 各資料夾詳細說明

### 1. abstracts/ - 抽象層
存放不會直接輸出 CSS 的工具文件：

#### _variables.scss
```scss
// 色彩系統
$primary-color: #3498db;
$secondary-color: #2ecc71;
$accent-color: #e74c3c;
$text-color: #2c3e50;
$background-color: #ecf0f1;

// 字體系統
$font-primary: 'Helvetica Neue', Arial, sans-serif;
$font-secondary: 'Georgia', serif;
$font-monospace: 'Monaco', 'Consolas', monospace;

// 尺寸
$base-font-size: 16px;
$base-line-height: 1.6;

// 斷點
$breakpoint-mobile: 480px;
$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;
$breakpoint-wide: 1200px;

// Z-index 層級
$z-dropdown: 1000;
$z-sticky: 1020;
$z-fixed: 1030;
$z-modal-backdrop: 1040;
$z-modal: 1050;
$z-popover: 1060;
$z-tooltip: 1070;
```

#### _mixins.scss
```scss
// 響應式斷點
@mixin respond-to($breakpoint) {
  @if $breakpoint == mobile {
    @media (max-width: $breakpoint-mobile) { @content; }
  }
  @if $breakpoint == tablet {
    @media (min-width: $breakpoint-tablet) { @content; }
  }
  @if $breakpoint == desktop {
    @media (min-width: $breakpoint-desktop) { @content; }
  }
}

// Flexbox 佈局
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// 按鈕樣式
@mixin button-variant($bg-color, $text-color) {
  background-color: $bg-color;
  color: $text-color;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: darken($bg-color, 10%);
  }
}
```

#### _functions.scss
```scss
// 計算 rem 值
@function rem($pixels, $context: $base-font-size) {
  @return #{$pixels / $context}rem;
}

// 獲取 z-index 值
@function z($layer) {
  @if map-has-key($z-layers, $layer) {
    @return map-get($z-layers, $layer);
  }
  @warn "Unknown `#{$layer}` in $z-layers.";
  @return null;
}

// 色彩函數
@function color($color-name) {
  @if map-has-key($colors, $color-name) {
    @return map-get($colors, $color-name);
  }
  @warn "Unknown `#{$color-name}` in $colors.";
  @return null;
}
```

### 2. base/ - 基礎層
包含項目的基礎樣式：

#### _reset.scss
```scss
/* Reset CSS */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: $base-font-size;
  line-height: $base-line-height;
}

body {
  margin: 0;
  font-family: $font-primary;
  color: $text-color;
  background-color: $background-color;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0 0 1rem;
}

p {
  margin: 0 0 1rem;
}

a {
  color: $primary-color;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
}
```

#### _typography.scss
```scss
// 標題樣式
h1 {
  font-size: rem(32px);
  font-weight: 700;
  line-height: 1.2;
}

h2 {
  font-size: rem(28px);
  font-weight: 600;
  line-height: 1.3;
}

h3 {
  font-size: rem(24px);
  font-weight: 600;
  line-height: 1.4;
}

// 文字樣式
.text-large {
  font-size: rem(18px);
}

.text-small {
  font-size: rem(14px);
}

.text-muted {
  color: lighten($text-color, 30%);
}

// 程式碼樣式
code {
  font-family: $font-monospace;
  background-color: #f8f9fa;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-size: 0.9em;
}

pre {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  
  code {
    background: none;
    padding: 0;
  }
}
```

### 3. components/ - 組件層
可重用的 UI 組件：

#### _buttons.scss
```scss
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.btn-primary {
  @include button-variant($primary-color, white);
}

.btn-secondary {
  @include button-variant($secondary-color, white);
}

.btn-outline {
  background-color: transparent;
  color: $primary-color;
  border: 2px solid $primary-color;
  
  &:hover {
    background-color: $primary-color;
    color: white;
  }
}

// 按鈕尺寸
.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}
```

#### _cards.scss
```scss
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  .card-header {
    padding: 1.5rem;
    background-color: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
    
    .card-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
    }
  }
  
  .card-body {
    padding: 1.5rem;
  }
  
  .card-footer {
    padding: 1rem 1.5rem;
    background-color: #f8f9fa;
    border-top: 1px solid #e9ecef;
  }
}
```

### 4. layout/ - 佈局層
頁面佈局相關的樣式：

#### _header.scss
```scss
.header {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: z(sticky);
  
  .header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    @include flex-center;
    justify-content: space-between;
    height: 60px;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: $primary-color;
  }
}
```

#### _navigation.scss
```scss
.nav {
  .nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 2rem;
  }
  
  .nav-item {
    .nav-link {
      color: $text-color;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
      
      &:hover,
      &.active {
        color: $primary-color;
      }
    }
  }
}
```

### 5. pages/ - 頁面層
特定頁面的樣式：

#### _home.scss
```scss
.home-hero {
  background: linear-gradient(135deg, $primary-color, $secondary-color);
  color: white;
  padding: 4rem 0;
  text-align: center;
  
  .hero-title {
    font-size: rem(48px);
    margin-bottom: 1rem;
    
    @include respond-to(mobile) {
      font-size: rem(32px);
    }
  }
  
  .hero-subtitle {
    font-size: rem(20px);
    margin-bottom: 2rem;
    opacity: 0.9;
  }
}

.home-features {
  padding: 4rem 0;
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .feature-item {
    text-align: center;
    
    .feature-icon {
      font-size: 3rem;
      color: $primary-color;
      margin-bottom: 1rem;
    }
    
    .feature-title {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  }
}
```

### 6. themes/ - 主題層
不同主題的樣式：

#### _theme.scss
```scss
// 深色主題
.theme-dark {
  --bg-color: #2c3e50;
  --text-color: #ecf0f1;
  --primary-color: #3498db;
  
  background-color: var(--bg-color);
  color: var(--text-color);
  
  .card {
    background-color: #34495e;
    color: var(--text-color);
  }
  
  .btn-primary {
    background-color: var(--primary-color);
  }
}

// 高對比主題
.theme-high-contrast {
  --bg-color: #000;
  --text-color: #fff;
  --primary-color: #ffff00;
  
  background-color: var(--bg-color);
  color: var(--text-color);
  
  a {
    color: var(--primary-color);
  }
}
```

### 7. vendors/ - 第三方層
第三方庫的樣式：

#### _normalize.scss
```scss
// 引入 normalize.css 或其他第三方重置樣式
@import url('https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css');
```

## 主要匯入文件 (main.scss)

```scss
// 1. 抽象層 - 工具和變數（不產生 CSS）
@import 'abstracts/variables';
@import 'abstracts/functions';
@import 'abstracts/mixins';
@import 'abstracts/placeholders';

// 2. 第三方庫
@import 'vendors/normalize';

// 3. 基礎層
@import 'base/reset';
@import 'base/typography';
@import 'base/base';

// 4. 佈局層
@import 'layout/navigation';
@import 'layout/grid';
@import 'layout/header';
@import 'layout/footer';
@import 'layout/sidebar';

// 5. 組件層
@import 'components/buttons';
@import 'components/cards';
@import 'components/carousel';
@import 'components/dropdown';

// 6. 頁面層
@import 'pages/home';
@import 'pages/contact';
@import 'pages/about';

// 7. 主題層
@import 'themes/theme';
@import 'themes/admin';
```

## 匯入順序的重要性

匯入順序遵循 CSS 的層疊特性和依賴關係：

1. **abstracts/** - 首先載入，因為其他文件會依賴這些變數和混合器
2. **vendors/** - 第三方樣式，作為基礎
3. **base/** - 基礎樣式，建立預設外觀
4. **layout/** - 頁面結構
5. **components/** - 可重用組件
6. **pages/** - 頁面特定樣式
7. **themes/** - 最後載入，可以覆蓋之前的樣式

## 實際項目範例

### 電商網站結構
```
scss/
├── abstracts/
│   ├── _variables.scss      # 色彩、字體、尺寸變數
│   ├── _mixins.scss         # 響應式、按鈕、動畫混合器
│   └── _functions.scss      # 計算函數
├── base/
│   ├── _reset.scss          # CSS 重置
│   ├── _typography.scss     # 字體樣式
│   └── _forms.scss          # 表單基礎樣式
├── components/
│   ├── _buttons.scss        # 按鈕組件
│   ├── _cards.scss          # 卡片組件
│   ├── _modals.scss         # 彈窗組件
│   ├── _alerts.scss         # 提示組件
│   └── _breadcrumbs.scss    # 麵包屑導航
├── layout/
│   ├── _header.scss         # 網站標頭
│   ├── _navigation.scss     # 主導航
│   ├── _footer.scss         # 網站頁尾
│   ├── _sidebar.scss        # 側邊欄
│   └── _grid.scss           # 網格系統
├── pages/
│   ├── _home.scss           # 首頁樣式
│   ├── _product.scss        # 產品頁面
│   ├── _cart.scss           # 購物車頁面
│   └── _checkout.scss       # 結帳頁面
├── themes/
│   ├── _default.scss        # 預設主題
│   └── _dark.scss           # 深色主題
├── vendors/
│   ├── _bootstrap.scss      # Bootstrap 客製化
│   └── _swiper.scss         # Swiper 輪播客製化
└── main.scss
```

## 命名規範

### 文件命名
- 所有 partial 文件以底線開頭：`_buttons.scss`
- 使用小寫字母和連字符：`_navigation.scss`
- 描述性命名：`_product-card.scss` 而不是 `_card.scss`

### 資料夾命名
- 使用複數形式：`components/` 而不是 `component/`
- 簡潔明確：`layout/` 而不是 `layouts/`

## 最佳實踐

### 1. 保持文件小而專注
```scss
// ✅ 好的做法：專注的文件
// _buttons.scss - 只包含按鈕相關樣式
.btn { }
.btn-primary { }
.btn-secondary { }

// ❌ 避免：混雜的文件
// _components.scss - 包含太多不相關的組件
.btn { }
.card { }
.modal { }
.dropdown { }
```

### 2. 合理使用抽象層
```scss
// ✅ 在 abstracts/ 中定義可重用的工具
@mixin button-variant($bg, $color) {
  background-color: $bg;
  color: $color;
}

// ✅ 在 components/ 中使用這些工具
.btn-primary {
  @include button-variant($primary-color, white);
}
```

### 3. 避免深層嵌套
```scss
// ❌ 避免過深的嵌套
.header {
  .nav {
    .nav-list {
      .nav-item {
        .nav-link {
          // 太深了
        }
      }
    }
  }
}

// ✅ 保持合理的嵌套深度
.nav-link {
  color: $text-color;
  
  &:hover {
    color: $primary-color;
  }
}
```

## 工具和自動化

### Gulp 建構範例
```javascript
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  return gulp.src('scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['sass']);
});
```

### Webpack 配置範例
```javascript
module.exports = {
  entry: './scss/main.scss',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};
```

## 小結

7-1 模式提供了一個清晰、可擴展的 SCSS 項目結構：

- **清晰的分離**：每個資料夾都有明確的職責
- **易於維護**：相關樣式集中在一起
- **可擴展性**：容易添加新的組件和頁面
- **團隊協作**：標準化的結構便於團隊開發

這個模式特別適合中大型項目，能夠有效地組織和管理複雜的樣式系統。在下一章節中，我們將學習另一種流行的組織方法：ITCSS。