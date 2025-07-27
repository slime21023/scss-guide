+++
title = "性能優化"
description = "如何編寫高效的 SCSS 代碼"
weight = 1
date = 2024-01-28
+++

# SCSS 性能優化

性能優化是 SCSS 開發中的重要考量。本章將介紹如何編寫高效的 SCSS 代碼，減少 CSS 輸出大小，並提升網站載入速度。

## CSS 輸出優化

### 減少選擇器複雜度

```scss
// ❌ 避免：過度複雜的選擇器
.page .container .content .article .header .title {
  font-size: 2rem;
}

// ✅ 推薦：簡化選擇器
.article-title {
  font-size: 2rem;
}

// ❌ 避免：不必要的嵌套
.navigation {
  .nav-list {
    .nav-item {
      .nav-link {
        .nav-text {
          color: blue;
        }
      }
    }
  }
}

// ✅ 推薦：扁平化結構
.nav-link-text {
  color: blue;
}
```

### 優化 @extend 使用

```scss
// ✅ 好的 @extend 使用
%button-base {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  @extend %button-base;
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  @extend %button-base;
  background-color: #6c757d;
  color: white;
}

// 輸出結果（高效）：
// .btn-primary, .btn-secondary {
//   display: inline-block;
//   padding: 0.75rem 1.5rem;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
// }

// ❌ 避免：@extend 真實類別
.button-base {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  @extend .button-base; // 會產生不必要的 .button-base 類別
}
```

### 合理使用 @mixin

```scss
// ✅ 適合使用 @mixin：需要參數化
@mixin button-variant($bg-color, $text-color) {
  background-color: $bg-color;
  color: $text-color;
  
  &:hover {
    background-color: darken($bg-color, 10%);
  }
}

.btn-custom-1 {
  @include button-variant(#ff6b6b, white);
}

.btn-custom-2 {
  @include button-variant(#4ecdc4, #2c3e50);
}

// ❌ 避免：簡單樣式使用 @mixin
@mixin red-text {
  color: red;
}

.error {
  @include red-text; // 不如直接寫 color: red;
}

// ✅ 推薦：使用變數或 @extend
$error-color: red;

.error {
  color: $error-color;
}
```

## 編譯優化

### 條件編譯

```scss
// 功能開關
$enable-rounded: true !default;
$enable-shadows: true !default;
$enable-gradients: false !default;

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  
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

### 選擇性匯入

```scss
// 使用 @use 而不是 @import
// main.scss
@use 'abstracts/variables';
@use 'abstracts/mixins';
@use 'base/reset';
@use 'components/buttons';

// 只匯入需要的部分
@use 'bootstrap/scss/functions';
@use 'bootstrap/scss/variables';
@use 'bootstrap/scss/mixins';
@use 'bootstrap/scss/buttons';
// 不匯入整個 Bootstrap

// 命名空間避免衝突
@use 'theme1' as theme1;
@use 'theme2' as theme2;

.component {
  color: theme1.$primary-color;
  background: theme2.$surface-color;
}
```

### 死代碼消除

```scss
// 使用 PurgeCSS 或類似工具的配置
// purge.config.js
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.vue'
  ],
  css: ['./dist/css/*.css'],
  
  // 保留動態類別
  safelist: [
    'btn-primary',
    'btn-secondary',
    /^btn-/,
    {
      pattern: /^(text|bg|border)-(primary|secondary|success|danger)$/,
      variants: ['hover', 'focus']
    }
  ]
}

// SCSS 中標記關鍵樣式
/* purgecss start ignore */
.critical-component {
  // 這些樣式不會被移除
}
/* purgecss end ignore */
```

## 關鍵 CSS 策略

### 首屏關鍵樣式

```scss
// critical.scss - 內聯到 HTML
// 只包含首屏可見內容的樣式

// 重置樣式（關鍵）
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
}

// 頁面標頭（關鍵）
.header {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

// 主導航（關鍵）
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

// 英雄區域（關鍵）
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 1rem;
  text-align: center;
}

// 基礎按鈕（關鍵）
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
```

### 非關鍵樣式延遲載入

```scss
// non-critical.scss - 異步載入
// 包含首屏下方或互動時才需要的樣式

// 頁尾樣式
.footer {
  background: #2c3e50;
  color: white;
  padding: 3rem 1rem;
  margin-top: 4rem;
}

// 彈窗樣式
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

// 輪播樣式
.carousel {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

// 表單樣式
.form {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

## 圖片和媒體優化

### 響應式圖片

```scss
// 響應式圖片容器
.responsive-image {
  position: relative;
  overflow: hidden;
  
  // 使用 aspect-ratio 避免佈局偏移
  &--16-9 {
    aspect-ratio: 16 / 9;
  }
  
  &--4-3 {
    aspect-ratio: 4 / 3;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    
    // 延遲載入時的佔位符
    &[data-loading] {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }
  }
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

// 漸進式圖片載入
.progressive-image {
  position: relative;
  overflow: hidden;
  
  .image-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    filter: blur(5px);
    transform: scale(1.1);
    transition: opacity 0.3s ease;
    
    &.loaded {
      opacity: 0;
    }
  }
  
  .image-full {
    opacity: 0;
    transition: opacity 0.3s ease;
    
    &.loaded {
      opacity: 1;
    }
  }
}
```

### CSS Sprites 和圖示優化

```scss
// SVG 圖示系統
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
  
  // 不同尺寸
  &--sm {
    width: 0.875em;
    height: 0.875em;
  }
  
  &--lg {
    width: 1.25em;
    height: 1.25em;
  }
  
  &--xl {
    width: 1.5em;
    height: 1.5em;
  }
}

// CSS Sprites（適用於小圖示）
.sprite {
  background-image: url('sprites.png');
  background-repeat: no-repeat;
  display: inline-block;
  
  &--home {
    width: 16px;
    height: 16px;
    background-position: 0 0;
  }
  
  &--user {
    width: 16px;
    height: 16px;
    background-position: -16px 0;
  }
  
  &--settings {
    width: 16px;
    height: 16px;
    background-position: -32px 0;
  }
}
```

## 動畫性能優化

### GPU 加速動畫

```scss
// ✅ 推薦：使用 transform 和 opacity
.smooth-animation {
  transition: transform 0.3s ease, opacity 0.3s ease;
  
  &:hover {
    transform: translateY(-2px) scale(1.02);
    opacity: 0.9;
  }
}

// ❌ 避免：會觸發重排的屬性
.expensive-animation {
  transition: width 0.3s ease, height 0.3s ease, top 0.3s ease;
  
  &:hover {
    width: 110%;
    height: 110%;
    top: -5px;
  }
}

// 強制 GPU 加速
.gpu-accelerated {
  transform: translateZ(0); // 或 will-change: transform;
  backface-visibility: hidden;
}

// 複雜動畫優化
.complex-animation {
  // 告訴瀏覽器這個元素將會變化
  will-change: transform, opacity;
  
  &.animating {
    animation: complexMove 2s ease-in-out;
  }
  
  // 動畫結束後移除 will-change
  &.animation-complete {
    will-change: auto;
  }
}

@keyframes complexMove {
  0% {
    transform: translateX(0) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: translateX(100px) rotate(180deg);
    opacity: 0.5;
  }
  100% {
    transform: translateX(200px) rotate(360deg);
    opacity: 1;
  }
}
```

### 動畫性能監控

```scss
// 開發時的性能調試
.debug-animation {
  // 顯示重繪區域
  outline: 1px solid red;
  
  // 顯示合成層
  &::after {
    content: 'GPU Layer';
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(255, 0, 0, 0.8);
    color: white;
    padding: 2px 4px;
    font-size: 10px;
    z-index: 1000;
  }
}

// 減少動畫複雜度的媒體查詢
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

// 低性能設備優化
@media (max-width: 768px) {
  .expensive-animation {
    // 在移動設備上簡化動畫
    transition: opacity 0.2s ease;
    
    &:hover {
      opacity: 0.8;
      // 移除複雜的 transform
    }
  }
}
```

## 載入策略優化

### 字體載入優化

```scss
// 字體顯示策略
@font-face {
  font-family: 'CustomFont';
  src: url('custom-font.woff2') format('woff2'),
       url('custom-font.woff') format('woff');
  font-display: swap; // 立即顯示後備字體
  font-weight: 400;
  font-style: normal;
}

// 字體載入類別
.font-loading {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.font-loaded {
  font-family: 'CustomFont', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

// 字體大小調整（避免佈局偏移）
.text {
  // 後備字體的調整
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  
  // 自定義字體載入後的調整
  .font-loaded & {
    font-family: 'CustomFont', Arial, sans-serif;
    font-size: 15px; // 調整以匹配視覺大小
    line-height: 1.6; // 調整行高
  }
}
```

### 漸進增強

```scss
// 基礎樣式（所有瀏覽器）
.enhanced-component {
  background: #f0f0f0;
  padding: 1rem;
  border: 1px solid #ccc;
}

// CSS Grid 支援
@supports (display: grid) {
  .enhanced-component {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
}

// Flexbox 後備
@supports not (display: grid) {
  .enhanced-component {
    display: flex;
    flex-wrap: wrap;
    margin: -0.5rem;
    
    > * {
      flex: 1 1 200px;
      margin: 0.5rem;
    }
  }
}

// 自定義屬性支援
@supports (--custom: property) {
  :root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
  }
  
  .enhanced-component {
    background: var(--primary-color);
    border-color: var(--secondary-color);
  }
}
```

## 建構工具優化

### PostCSS 優化

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    // 自動添加瀏覽器前綴
    require('autoprefixer'),
    
    // 壓縮 CSS
    require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        normalizeWhitespace: false,
      }]
    }),
    
    // 移除未使用的 CSS
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.html', './src/**/*.js'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    }),
    
    // 關鍵 CSS 提取
    require('postcss-critical-css')({
      preserve: false,
      minify: true
    })
  ]
}
```

### Webpack 優化

```javascript
// webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer'],
                  ['cssnano', { preset: 'default' }]
                ]
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true,
          },
        },
      }),
    ],
    
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
};
```

## 性能監控

### 關鍵指標

```scss
// 性能預算檢查
// 在 CI/CD 中檢查 CSS 大小
// package.json
{
  "scripts": {
    "check-css-size": "bundlesize",
    "build": "sass src/main.scss dist/main.css --style=compressed"
  },
  "bundlesize": [
    {
      "path": "./dist/main.css",
      "maxSize": "50kb",
      "compression": "gzip"
    }
  ]
}

// 性能標記（開發時使用）
.perf-marker {
  &::before {
    content: 'CSS: ' counter(css-rules) ' rules';
    counter-increment: css-rules;
    position: fixed;
    top: 0;
    right: 0;
    background: rgba(255, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    font-size: 12px;
    z-index: 9999;
  }
}

body {
  counter-reset: css-rules;
}
```

### 載入時間優化

```html
<!-- 關鍵 CSS 內聯 -->
<style>
  /* 關鍵樣式直接內聯到 HTML */
  .header { /* ... */ }
  .hero { /* ... */ }
</style>

<!-- 非關鍵 CSS 異步載入 -->
<link rel="preload" href="non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="non-critical.css"></noscript>

<!-- 字體預載入 -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```

## 最佳實踐總結

### 1. 代碼組織
- 使用模組化架構
- 避免過深嵌套
- 合理使用 @extend 和 @mixin

### 2. 輸出優化
- 啟用 CSS 壓縮
- 移除未使用的樣式
- 使用關鍵 CSS 策略

### 3. 載入策略
- 內聯關鍵樣式
- 異步載入非關鍵樣式
- 優化字體載入

### 4. 動畫性能
- 使用 GPU 加速屬性
- 避免觸發重排的動畫
- 考慮用戶偏好設定

### 5. 監控和測試
- 設定性能預算
- 定期檢查輸出大小
- 使用性能分析工具

通過遵循這些性能優化原則，你可以創建出載入快速、運行流暢的 SCSS 樣式系統。