+++
title = "主題系統"
description = "實作靈活的主題切換機制"
weight = 2
date = 2024-01-26
+++

# 主題系統實作

主題系統讓用戶能夠在不同的視覺風格之間切換，是現代 Web 應用的重要功能。本章將介紹如何使用 SCSS 建立靈活、可擴展的主題系統。

## 主題系統設計原則

### 1. 分離關注點
將主題相關的樣式與組件邏輯分離：

```scss
// 組件結構（不包含顏色）
.card {
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

// 主題樣式（只包含顏色和視覺效果）
.theme-light .card {
  background-color: #ffffff;
  color: #212529;
}

.theme-dark .card {
  background-color: #2c3e50;
  color: #ecf0f1;
}
```

### 2. 可預測性
主題變更應該是可預測和一致的：

```scss
// 定義主題變數
$themes: (
  light: (
    primary: #007bff,
    secondary: #6c757d,
    background: #ffffff,
    surface: #f8f9fa,
    text: #212529,
    text-muted: #6c757d
  ),
  dark: (
    primary: #0d6efd,
    secondary: #6c757d,
    background: #212529,
    surface: #343a40,
    text: #ffffff,
    text-muted: #adb5bd
  )
);
```

### 3. 可擴展性
系統應該容易添加新主題：

```scss
$themes: map-merge($themes, (
  high-contrast: (
    primary: #ffff00,
    secondary: #ffffff,
    background: #000000,
    surface: #333333,
    text: #ffffff,
    text-muted: #cccccc
  )
));
```

## CSS 自定義屬性方法

### 基礎實作

```scss
// 定義 CSS 自定義屬性
:root {
  // 亮色主題（預設）
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-background: #ffffff;
  --color-surface: #f8f9fa;
  --color-text: #212529;
  --color-text-muted: #6c757d;
  --color-border: #dee2e6;
  
  // 陰影
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.15);
}

// 暗色主題
[data-theme="dark"] {
  --color-primary: #0d6efd;
  --color-secondary: #6c757d;
  --color-background: #212529;
  --color-surface: #343a40;
  --color-text: #ffffff;
  --color-text-muted: #adb5bd;
  --color-border: #495057;
  
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.25);
  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.4);
}

// 高對比主題
[data-theme="high-contrast"] {
  --color-primary: #ffff00;
  --color-secondary: #ffffff;
  --color-background: #000000;
  --color-surface: #333333;
  --color-text: #ffffff;
  --color-text-muted: #cccccc;
  --color-border: #666666;
  
  --shadow-sm: 0 1px 3px rgba(255, 255, 255, 0.3);
  --shadow-md: 0 4px 6px rgba(255, 255, 255, 0.25);
  --shadow-lg: 0 10px 25px rgba(255, 255, 255, 0.4);
}
```

### 組件中使用自定義屬性

```scss
.btn {
  background-color: var(--color-primary);
  color: var(--color-background);
  border: 1px solid var(--color-primary);
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--color-primary);
    filter: brightness(0.9);
  }
  
  &--secondary {
    background-color: var(--color-secondary);
    border-color: var(--color-secondary);
  }
  
  &--outline {
    background-color: transparent;
    color: var(--color-primary);
    border-color: var(--color-primary);
    
    &:hover {
      background-color: var(--color-primary);
      color: var(--color-background);
    }
  }
}

.card {
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
  
  .card__title {
    color: var(--color-text);
    margin-bottom: 1rem;
  }
  
  .card__text {
    color: var(--color-text-muted);
    line-height: 1.6;
  }
}
```

## SCSS 變數方法

### 主題映射系統

```scss
// 主題定義
$themes: (
  light: (
    colors: (
      primary: #007bff,
      secondary: #6c757d,
      success: #28a745,
      warning: #ffc107,
      danger: #dc3545,
      info: #17a2b8,
      background: #ffffff,
      surface: #f8f9fa,
      text: #212529,
      text-muted: #6c757d,
      border: #dee2e6
    ),
    shadows: (
      sm: (0 1px 3px rgba(0, 0, 0, 0.12)),
      md: (0 4px 6px rgba(0, 0, 0, 0.1)),
      lg: (0 10px 25px rgba(0, 0, 0, 0.15))
    )
  ),
  dark: (
    colors: (
      primary: #0d6efd,
      secondary: #6c757d,
      success: #198754,
      warning: #fd7e14,
      danger: #dc3545,
      info: #0dcaf0,
      background: #212529,
      surface: #343a40,
      text: #ffffff,
      text-muted: #adb5bd,
      border: #495057
    ),
    shadows: (
      sm: (0 1px 3px rgba(0, 0, 0, 0.3)),
      md: (0 4px 6px rgba(0, 0, 0, 0.25)),
      lg: (0 10px 25px rgba(0, 0, 0, 0.4))
    )
  )
);

// 主題函數
@function theme-color($theme, $color-name) {
  $theme-map: map-get($themes, $theme);
  $colors: map-get($theme-map, colors);
  @return map-get($colors, $color-name);
}

@function theme-shadow($theme, $shadow-name) {
  $theme-map: map-get($themes, $theme);
  $shadows: map-get($theme-map, shadows);
  @return map-get($shadows, $shadow-name);
}

// 主題混合器
@mixin theme($theme-name) {
  .theme-#{$theme-name} & {
    @content;
  }
}
```

### 組件主題化

```scss
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  font-weight: 500;
  transition: all 0.2s ease;
  
  // 亮色主題
  @include theme(light) {
    background-color: theme-color(light, primary);
    color: theme-color(light, background);
    box-shadow: theme-shadow(light, sm);
    
    &:hover {
      background-color: darken(theme-color(light, primary), 10%);
    }
  }
  
  // 暗色主題
  @include theme(dark) {
    background-color: theme-color(dark, primary);
    color: theme-color(dark, background);
    box-shadow: theme-shadow(dark, sm);
    
    &:hover {
      background-color: lighten(theme-color(dark, primary), 10%);
    }
  }
  
  // 變體
  &--secondary {
    @include theme(light) {
      background-color: theme-color(light, secondary);
    }
    
    @include theme(dark) {
      background-color: theme-color(dark, secondary);
    }
  }
}
```

## 動態主題生成

### 自動生成主題樣式

```scss
// 自動為所有主題生成樣式
@each $theme-name, $theme-config in $themes {
  .theme-#{$theme-name} {
    $colors: map-get($theme-config, colors);
    $shadows: map-get($theme-config, shadows);
    
    // 生成顏色工具類別
    @each $color-name, $color-value in $colors {
      .text-#{$color-name} {
        color: $color-value;
      }
      
      .bg-#{$color-name} {
        background-color: $color-value;
      }
      
      .border-#{$color-name} {
        border-color: $color-value;
      }
    }
    
    // 生成陰影工具類別
    @each $shadow-name, $shadow-value in $shadows {
      .shadow-#{$shadow-name} {
        box-shadow: $shadow-value;
      }
    }
    
    // 組件樣式
    .card {
      background-color: map-get($colors, surface);
      color: map-get($colors, text);
      border-color: map-get($colors, border);
      box-shadow: map-get($shadows, md);
    }
    
    .btn {
      background-color: map-get($colors, primary);
      color: map-get($colors, background);
      
      &:hover {
        background-color: if($theme-name == light, 
          darken(map-get($colors, primary), 10%), 
          lighten(map-get($colors, primary), 10%)
        );
      }
    }
  }
}
```

### 主題變數注入

```scss
// 主題變數注入混合器
@mixin with-theme($theme-name) {
  $theme-config: map-get($themes, $theme-name);
  $theme-colors: map-get($theme-config, colors);
  $theme-shadows: map-get($theme-config, shadows);
  
  // 注入主題變數到全域作用域
  $primary: map-get($theme-colors, primary) !global;
  $secondary: map-get($theme-colors, secondary) !global;
  $background: map-get($theme-colors, background) !global;
  $surface: map-get($theme-colors, surface) !global;
  $text: map-get($theme-colors, text) !global;
  $text-muted: map-get($theme-colors, text-muted) !global;
  $border: map-get($theme-colors, border) !global;
  
  $shadow-sm: map-get($theme-shadows, sm) !global;
  $shadow-md: map-get($theme-shadows, md) !global;
  $shadow-lg: map-get($theme-shadows, lg) !global;
  
  @content;
}

// 使用範例
@each $theme-name, $theme-config in $themes {
  .theme-#{$theme-name} {
    @include with-theme($theme-name) {
      .navigation {
        background-color: $surface;
        border-bottom: 1px solid $border;
        box-shadow: $shadow-sm;
        
        .nav-link {
          color: $text;
          
          &:hover {
            color: $primary;
          }
          
          &.active {
            color: $primary;
            background-color: rgba($primary, 0.1);
          }
        }
      }
    }
  }
}
```

## 主題切換動畫

### 平滑過渡效果

```scss
// 全域過渡設定
* {
  transition: 
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

// 特定組件的過渡
.card {
  transition: 
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.2s ease;
}

.btn {
  transition: 
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.1s ease;
}
```

### 主題切換動畫

```scss
// 主題切換時的淡入淡出效果
.theme-transition {
  position: relative;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-background);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 9999;
  }
  
  &.transitioning::before {
    opacity: 1;
  }
}

// JavaScript 控制
// document.body.classList.add('transitioning');
// setTimeout(() => {
//   document.body.setAttribute('data-theme', newTheme);
//   document.body.classList.remove('transitioning');
// }, 150);
```

## 系統主題偵測

### 自動主題切換

```scss
// 支援系統主題偵測
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --color-primary: #0d6efd;
    --color-secondary: #6c757d;
    --color-background: #212529;
    --color-surface: #343a40;
    --color-text: #ffffff;
    --color-text-muted: #adb5bd;
    --color-border: #495057;
  }
}

@media (prefers-color-scheme: light) {
  :root:not([data-theme]) {
    --color-primary: #007bff;
    --color-secondary: #6c757d;
    --color-background: #ffffff;
    --color-surface: #f8f9fa;
    --color-text: #212529;
    --color-text-muted: #6c757d;
    --color-border: #dee2e6;
  }
}
```

### 高對比度支援

```scss
@media (prefers-contrast: high) {
  :root {
    --color-primary: #0000ff;
    --color-secondary: #000000;
    --color-background: #ffffff;
    --color-surface: #f0f0f0;
    --color-text: #000000;
    --color-text-muted: #333333;
    --color-border: #000000;
  }
  
  .btn {
    border: 2px solid currentColor;
  }
  
  .card {
    border: 2px solid var(--color-border);
  }
}
```

## 主題管理工具

### 主題切換器組件

```scss
.theme-switcher {
  position: relative;
  display: inline-block;
  
  .theme-switcher__button {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-text);
    
    &:hover {
      background: var(--color-background);
    }
  }
  
  .theme-switcher__icon {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
  
  .theme-switcher__dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    box-shadow: var(--shadow-lg);
    min-width: 150px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.2s ease;
    z-index: 1000;
  }
  
  &.is-open .theme-switcher__dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  .theme-switcher__option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    cursor: pointer;
    color: var(--color-text);
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    
    &:hover {
      background: var(--color-background);
    }
    
    &.is-active {
      background: var(--color-primary);
      color: var(--color-background);
    }
  }
  
  .theme-switcher__option-icon {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
}
```

### 主題預覽

```scss
.theme-preview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
  
  .theme-preview__item {
    border: 2px solid transparent;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    &.is-active {
      border-color: var(--color-primary);
    }
  }
  
  .theme-preview__header {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .theme-preview__title {
    font-weight: 600;
    margin: 0;
  }
  
  .theme-preview__colors {
    display: flex;
    gap: 0.25rem;
  }
  
  .theme-preview__color {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  
  .theme-preview__content {
    padding: 1rem;
    
    .preview-card {
      background: rgba(255, 255, 255, 0.1);
      padding: 0.75rem;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }
    
    .preview-button {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      border: none;
      font-size: 0.875rem;
    }
  }
}
```

## 主題最佳實踐

### 1. 語義化命名
```scss
// ✅ 好的命名
--color-primary
--color-background
--color-text
--color-surface

// ❌ 避免的命名
--color-blue
--color-white
--color-black
--color-gray
```

### 2. 一致的色彩系統
```scss
// 建立一致的色彩階層
$color-scales: (
  primary: (
    50: #e3f2fd,
    100: #bbdefb,
    500: #2196f3,
    900: #0d47a1
  )
);
```

### 3. 可訪問性考量
```scss
// 確保足夠的對比度
@function ensure-contrast($color, $background, $min-contrast: 4.5) {
  $contrast: contrast-ratio($color, $background);
  
  @if $contrast < $min-contrast {
    @warn "Insufficient contrast ratio: #{$contrast}";
    @return adjust-color($color, $lightness: if(lightness($background) > 50%, -20%, 20%));
  }
  
  @return $color;
}
```

### 4. 性能優化
```scss
// 避免過度的過渡效果
.performance-optimized {
  // 只對必要的屬性添加過渡
  transition: background-color 0.2s ease;
  
  // 避免對所有屬性添加過渡
  // transition: all 0.2s ease; // ❌
}
```

## 小結

主題系統是提升用戶體驗的重要功能。通過合理的架構設計和 SCSS 技術，我們可以建立：

- **靈活的主題切換機制**
- **一致的視覺體驗**
- **良好的可訪問性支援**
- **高效的性能表現**

選擇適合的實作方法（CSS 自定義屬性 vs SCSS 變數），並遵循最佳實踐，能夠創建出專業級的主題系統。