+++
title = "儀表板界面範例"
description = "現代化的管理後台界面設計"
weight = 2
date = 2024-01-31
+++

# 儀表板界面範例

本章將通過一個完整的管理後台儀表板項目，展示如何使用 SCSS
建立複雜的企業級界面。這個範例涵蓋了現代儀表板的所有核心功能和最佳實踐。

## 項目概述

### 功能需求

- 響應式側邊欄導航
- 數據視覺化圖表
- 表格和列表組件
- 表單和輸入組件
- 通知和提示系統
- 用戶權限管理界面
- 深色/淺色主題切換

### 技術架構

- ITCSS 架構模式
- CSS Grid 和 Flexbox 佈局
- CSS 自定義屬性主題系統
- 組件化設計方法
- 性能優化策略

## 項目結構

```
dashboard/
├── scss/
│   ├── settings/
│   │   ├── _colors.scss
│   │   ├── _typography.scss
│   │   ├── _spacing.scss
│   │   └── _breakpoints.scss
│   ├── tools/
│   │   ├── _functions.scss
│   │   ├── _mixins.scss
│   │   └── _placeholders.scss
│   ├── generic/
│   │   ├── _reset.scss
│   │   └── _normalize.scss
│   ├── elements/
│   │   ├── _typography.scss
│   │   ├── _forms.scss
│   │   └── _tables.scss
│   ├── objects/
│   │   ├── _layout.scss
│   │   ├── _grid.scss
│   │   └── _media.scss
│   ├── components/
│   │   ├── _sidebar.scss
│   │   ├── _topbar.scss
│   │   ├── _cards.scss
│   │   ├── _charts.scss
│   │   ├── _tables.scss
│   │   ├── _forms.scss
│   │   ├── _buttons.scss
│   │   ├── _modals.scss
│   │   └── _notifications.scss
│   ├── utilities/
│   │   ├── _spacing.scss
│   │   ├── _colors.scss
│   │   └── _display.scss
│   └── main.scss
├── css/
├── js/
├── images/
└── index.html
```

## 設計系統基礎

### 顏色系統 (settings/_colors.scss)

```scss
// 主題顏色定義
:root {
    // 品牌色彩
    --color-primary: #3b82f6;
    --color-primary-light: #60a5fa;
    --color-primary-dark: #1d4ed8;

    --color-secondary: #8b5cf6;
    --color-secondary-light: #a78bfa;
    --color-secondary-dark: #7c3aed;

    --color-accent: #f59e0b;
    --color-accent-light: #fbbf24;
    --color-accent-dark: #d97706;

    // 語義色彩
    --color-success: #10b981;
    --color-success-light: #34d399;
    --color-success-dark: #059669;

    --color-warning: #f59e0b;
    --color-warning-light: #fbbf24;
    --color-warning-dark: #d97706;

    --color-error: #ef4444;
    --color-error-light: #f87171;
    --color-error-dark: #dc2626;

    --color-info: #06b6d4;
    --color-info-light: #22d3ee;
    --color-info-dark: #0891b2;

    // 中性色彩
    --color-gray-50: #f9fafb;
    --color-gray-100: #f3f4f6;
    --color-gray-200: #e5e7eb;
    --color-gray-300: #d1d5db;
    --color-gray-400: #9ca3af;
    --color-gray-500: #6b7280;
    --color-gray-600: #4b5563;
    --color-gray-700: #374151;
    --color-gray-800: #1f2937;
    --color-gray-900: #111827;

    // 語義化別名
    --color-background: var(--color-gray-50);
    --color-surface: #ffffff;
    --color-surface-hover: var(--color-gray-100);

    --color-text-primary: var(--color-gray-900);
    --color-text-secondary: var(--color-gray-600);
    --color-text-muted: var(--color-gray-500);
    --color-text-inverse: #ffffff;

    --color-border: var(--color-gray-200);
    --color-border-hover: var(--color-gray-300);
    --color-border-focus: var(--color-primary);

    // 陰影
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md:
        0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg:
        0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl:
        0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(
        0,
        0,
        0,
        0.04
    );
}

// 深色主題
[data-theme="dark"] {
    --color-background: var(--color-gray-900);
    --color-surface: var(--color-gray-800);
    --color-surface-hover: var(--color-gray-700);

    --color-text-primary: var(--color-gray-100);
    --color-text-secondary: var(--color-gray-300);
    --color-text-muted: var(--color-gray-400);

    --color-border: var(--color-gray-700);
    --color-border-hover: var(--color-gray-600);

    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
    --shadow-md:
        0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
    --shadow-lg:
        0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
    --shadow-xl:
        0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(
        0,
        0,
        0,
        0.3
    );
}
```

### 間距系統 (settings/_spacing.scss)

```scss
// 間距比例系統
$spacing-base: 1rem;
$spacing-scale: 1.5;

// 間距映射
$spacing: (
    0: 0,
    1: 0.25rem, // 4px
    2: 0.5rem, // 8px
    3: 0.75rem, // 12px
    4: 1rem, // 16px
    5: 1.25rem, // 20px
    6: 1.5rem, // 24px
    8: 2rem, // 32px
    10: 2.5rem, // 40px
    12: 3rem, // 48px
    16: 4rem, // 64px
    20: 5rem, // 80px
    24: 6rem, // 96px
    32: 8rem, // 128px
    40: 10rem, // 160px
    48: 12rem, // 192px
    56: 14rem, // 224px
    64: 16rem, // 256px
);

// CSS 自定義屬性
:root {
    @each $key, $value in $spacing {
        --spacing-#{$key}: #{$value};
    }
}
```

### 工具函數 (tools/_functions.scss)

```scss
// 獲取間距值
@function spacing($key) {
    @return map-get($spacing, $key);
}

// 獲取斷點值
@function breakpoint($key) {
    @return map-get($breakpoints, $key);
}

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

// 自動選擇文字顏色
@function auto-text-color($bg-color, $light: #ffffff, $dark: #000000) {
    $contrast-light: contrast-ratio($bg-color, $light);
    $contrast-dark: contrast-ratio($bg-color, $dark);

    @return if($contrast-light > $contrast-dark, $light, $dark);
}

// 狀態顏色生成
@function status-color($status, $variant: base) {
    $colors: (
        success: (
            base: var(--color-success),
            light: var(--color-success-light),
            dark: var(--color-success-dark),
        ),
        warning: (
            base: var(--color-warning),
            light: var(--color-warning-light),
            dark: var(--color-warning-dark),
        ),
        error: (
            base: var(--color-error),
            light: var(--color-error-light),
            dark: var(--color-error-dark),
        ),
        info: (
            base: var(--color-info),
            light: var(--color-info-light),
            dark: var(--color-info-dark),
        ),
    );

    @return map-get(map-get($colors, $status), $variant);
}
```

### 混合器 (tools/_mixins.scss)

```scss
// 響應式混合器
@mixin respond-to($breakpoint) {
    $value: breakpoint($breakpoint);

    @if $value {
        @media (min-width: $value) {
            @content;
        }
    }
}

// 卡片樣式
@mixin card($padding: spacing(6)) {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    box-shadow: var(--shadow-sm);
    padding: $padding;
    transition: all 0.2s ease;

    &:hover {
        box-shadow: var(--shadow-md);
    }
}

// 按鈕變體
@mixin button-variant($bg-color, $text-color: var(--color-text-inverse)) {
    background-color: $bg-color;
    color: $text-color;
    border: 1px solid $bg-color;

    &:hover {
        background-color: darken($bg-color, 8%);
        border-color: darken($bg-color, 8%);
    }

    &:active {
        background-color: darken($bg-color, 12%);
        border-color: darken($bg-color, 12%);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;

        &:hover {
            background-color: $bg-color;
            border-color: $bg-color;
        }
    }
}

// 表單控制項
@mixin form-control {
    width: 100%;
    padding: spacing(3);
    border: 1px solid var(--color-border);
    border-radius: 6px;
    font-size: 0.875rem;
    background: var(--color-surface);
    color: var(--color-text-primary);
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: var(--color-border-focus);
        box-shadow: 0 0 0 3px rgba(var(--color-primary), 0.1);
    }

    &:disabled {
        background: var(--color-gray-100);
        cursor: not-allowed;
        opacity: 0.6;
    }

    &::placeholder {
        color: var(--color-text-muted);
    }
}

// 狀態指示器
@mixin status-indicator($status) {
    $color: status-color($status);

    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: -12px;
        width: 6px;
        height: 6px;
        background: $color;
        border-radius: 50%;
        transform: translateY(-50%);
    }
}

// 載入動畫
@mixin loading-spinner($size: 20px, $color: var(--color-primary)) {
    width: $size;
    height: $size;
    border: 2px solid transparent;
    border-top-color: $color;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

// Flexbox 工具
@mixin flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

@mixin flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

@mixin flex-column {
    display: flex;
    flex-direction: column;
}
```

## 佈局組件

### 主佈局 (objects/_layout.scss)

```scss
// 主佈局容器
.o-layout {
    display: grid;
    grid-template-areas:
        "sidebar topbar"
        "sidebar main";
    grid-template-columns: 280px 1fr;
    grid-template-rows: 64px 1fr;
    min-height: 100vh;
    background: var(--color-background);

    // 響應式佈局
    @include respond-to(lg) {
        grid-template-areas:
            "topbar"
            "main";
        grid-template-columns: 1fr;
        grid-template-rows: 64px 1fr;
    }

    // 側邊欄收合狀態
    &--collapsed {
        grid-template-columns: 64px 1fr;

        @include respond-to(lg) {
            grid-template-columns: 1fr;
        }
    }
}

// 側邊欄區域
.o-sidebar {
    grid-area: sidebar;
    background: var(--color-surface);
    border-right: 1px solid var(--color-border);
    overflow-y: auto;
    transition: all 0.3s ease;

    @include respond-to(lg) {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 1000;
        transform: translateX(-100%);

        &.active {
            transform: translateX(0);
        }
    }
}

// 頂部欄區域
.o-topbar {
    grid-area: topbar;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    @include flex-between;
    padding: 0 spacing(6);
}

// 主內容區域
.o-main {
    grid-area: main;
    padding: spacing(6);
    overflow-y: auto;

    @include respond-to(sm) {
        padding: spacing(4);
    }
}

// 內容容器
.o-container {
    max-width: 1200px;
    margin: 0 auto;
}

// 頁面標頭
.o-page-header {
    @include flex-between;
    margin-bottom: spacing(6);

    @include respond-to(sm) {
        flex-direction: column;
        align-items: flex-start;
        gap: spacing(4);
    }
}
```

### 網格系統 (objects/_grid.scss)

```scss
// 響應式網格
.o-grid {
    display: grid;
    gap: spacing(6);

    // 網格變體
    &--1 {
        grid-template-columns: 1fr;
    }
    &--2 {
        grid-template-columns: repeat(2, 1fr);
    }
    &--3 {
        grid-template-columns: repeat(3, 1fr);
    }
    &--4 {
        grid-template-columns: repeat(4, 1fr);
    }

    // 自適應網格
    &--auto-fit {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    &--auto-fill {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }

    // 響應式調整
    @include respond-to(lg) {
        &--3 {
            grid-template-columns: repeat(2, 1fr);
        }
        &--4 {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @include respond-to(md) {
        &--2,
        &--3,
        &--4 {
            grid-template-columns: 1fr;
        }
    }
}

// 網格項目
.o-grid__item {
    // 跨欄設定
    &--span-2 {
        grid-column: span 2;
    }
    &--span-3 {
        grid-column: span 3;
    }
    &--span-4 {
        grid-column: span 4;
    }

    // 跨行設定
    &--row-span-2 {
        grid-row: span 2;
    }
    &--row-span-3 {
        grid-row: span 3;
    }

    // 響應式跨欄
    @include respond-to(lg) {
        &--span-2,
        &--span-3,
        &--span-4 {
            grid-column: span 1;
        }
    }
}
```

## 核心組件

### 側邊欄導航 (components/_sidebar.scss)

```scss
.c-sidebar {
    height: 100%;
    @include flex-column;

    &__header {
        padding: spacing(6);
        border-bottom: 1px solid var(--color-border);
        @include flex-center;

        .c-sidebar--collapsed & {
            padding: spacing(4);
        }
    }

    &__logo {
        @include flex-center;
        gap: spacing(3);
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--color-text-primary);
        text-decoration: none;

        img {
            width: 32px;
            height: 32px;
        }

        span {
            transition: opacity 0.3s ease;

            .c-sidebar--collapsed & {
                opacity: 0;
                width: 0;
                overflow: hidden;
            }
        }
    }

    &__nav {
        flex: 1;
        padding: spacing(4) 0;
        overflow-y: auto;
    }

    &__section {
        margin-bottom: spacing(6);

        &:last-child {
            margin-bottom: 0;
        }
    }

    &__section-title {
        padding: 0 spacing(6) spacing(2);
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--color-text-muted);

        .c-sidebar--collapsed & {
            opacity: 0;
            height: 0;
            padding: 0;
            overflow: hidden;
        }
    }

    &__menu {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    &__item {
        margin-bottom: spacing(1);
    }

    &__link {
        display: flex;
        align-items: center;
        gap: spacing(3);
        padding: spacing(3) spacing(6);
        color: var(--color-text-secondary);
        text-decoration: none;
        border-radius: 0 25px 25px 0;
        margin-right: spacing(4);
        transition: all 0.2s ease;
        position: relative;

        &:hover {
            background: var(--color-surface-hover);
            color: var(--color-text-primary);
        }

        &.active {
            background: rgba(var(--color-primary), 0.1);
            color: var(--color-primary);

            &::before {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 3px;
                background: var(--color-primary);
            }
        }

        .c-sidebar--collapsed & {
            justify-content: center;
            padding: spacing(3);
            margin-right: 0;
            border-radius: 8px;

            span {
                display: none;
            }
        }
    }

    &__icon {
        width: 20px;
        height: 20px;
        fill: currentColor;
        flex-shrink: 0;
    }

    &__badge {
        background: var(--color-error);
        color: var(--color-text-inverse);
        font-size: 0.75rem;
        padding: 2px 6px;
        border-radius: 10px;
        margin-left: auto;

        .c-sidebar--collapsed & {
            display: none;
        }
    }

    &__footer {
        padding: spacing(4) spacing(6);
        border-top: 1px solid var(--color-border);

        .c-sidebar--collapsed & {
            padding: spacing(4);
        }
    }

    &__user {
        @include flex-center;
        gap: spacing(3);

        .c-sidebar--collapsed & {
            justify-content: center;

            .c-sidebar__user-info {
                display: none;
            }
        }
    }

    &__avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }

    &__user-info {
        flex: 1;

        h4 {
            margin: 0;
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--color-text-primary);
        }

        p {
            margin: 0;
            font-size: 0.75rem;
            color: var(--color-text-muted);
        }
    }

    &__toggle {
        background: none;
        border: none;
        cursor: pointer;
        padding: spacing(2);
        color: var(--color-text-secondary);

        &:hover {
            color: var(--color-text-primary);
        }

        svg {
            width: 16px;
            height: 16px;
            fill: currentColor;
            transition: transform 0.3s ease;
        }

        .c-sidebar--collapsed & svg {
            transform: rotate(180deg);
        }
    }
}
```

### 頂部欄 (components/_topbar.scss)

```scss
.c-topbar {
    &__left {
        @include flex-center;
        gap: spacing(4);
    }

    &__menu-toggle {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: spacing(2);
        color: var(--color-text-secondary);

        @include respond-to(lg) {
            display: flex;
        }

        &:hover {
            color: var(--color-text-primary);
        }

        svg {
            width: 20px;
            height: 20px;
            fill: currentColor;
        }
    }

    &__breadcrumb {
        @include flex-center;
        gap: spacing(2);
        font-size: 0.875rem;

        @include respond-to(sm) {
            display: none;
        }

        a {
            color: var(--color-text-secondary);
            text-decoration: none;

            &:hover {
                color: var(--color-primary);
            }
        }

        span {
            color: var(--color-text-muted);
        }

        .current {
            color: var(--color-text-primary);
            font-weight: 500;
        }
    }

    &__right {
        @include flex-center;
        gap: spacing(4);
    }

    &__search {
        position: relative;

        @include respond-to(md) {
            display: none;
        }

        input {
            width: 300px;
            padding: spacing(2) spacing(3) spacing(2) spacing(10);
            border: 1px solid var(--color-border);
            border-radius: 20px;
            background: var(--color-surface);
            color: var(--color-text-primary);
            font-size: 0.875rem;

            &:focus {
                outline: none;
                border-color: var(--color-primary);
                box-shadow: 0 0 0 3px rgba(var(--color-primary), 0.1);
            }

            &::placeholder {
                color: var(--color-text-muted);
            }
        }

        svg {
            position: absolute;
            left: spacing(3);
            top: 50%;
            transform: translateY(-50%);
            width: 16px;
            height: 16px;
            fill: var(--color-text-muted);
        }
    }

    &__actions {
        @include flex-center;
        gap: spacing(2);
    }

    &__action {
        position: relative;
        background: none;
        border: none;
        cursor: pointer;
        padding: spacing(2);
        border-radius: 50%;
        color: var(--color-text-secondary);
        transition: all 0.2s ease;

        &:hover {
            background: var(--color-surface-hover);
            color: var(--color-text-primary);
        }

        svg {
            width: 20px;
            height: 20px;
            fill: currentColor;
        }

        &--notification {
            &::after {
                content: "";
                position: absolute;
                top: 6px;
                right: 6px;
                width: 8px;
                height: 8px;
                background: var(--color-error);
                border-radius: 50%;
                border: 2px solid var(--color-surface);
            }
        }
    }

    &__theme-toggle {
        @extend .c-topbar__action;

        svg {
            transition: transform 0.3s ease;
        }

        &:hover svg {
            transform: rotate(180deg);
        }
    }

    &__profile {
        @include flex-center;
        gap: spacing(3);
        cursor: pointer;
        padding: spacing(2);
        border-radius: 25px;
        transition: background 0.2s ease;

        &:hover {
            background: var(--color-surface-hover);
        }

        img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            object-fit: cover;
        }

        span {
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--color-text-primary);

            @include respond-to(sm) {
                display: none;
            }
        }

        svg {
            width: 16px;
            height: 16px;
            fill: var(--color-text-muted);
            transition: transform 0.2s ease;
        }

        &.active svg {
            transform: rotate(180deg);
        }
    }
}
```

### 儀表板卡片 (components/_cards.scss)

```scss
.c-card {
    @include card;

    &__header {
        @include flex-between;
        margin-bottom: spacing(4);

        h3 {
            margin: 0;
            font-size: 1rem;
            font-weight: 600;
            color: var(--color-text-primary);
        }

        .c-card__actions {
            @include flex-center;
            gap: spacing(2);
        }

        .c-card__action {
            background: none;
            border: none;
            cursor: pointer;
            padding: spacing(1);
            color: var(--color-text-muted);
            border-radius: 4px;

            &:hover {
                background: var(--color-surface-hover);
                color: var(--color-text-primary);
            }

            svg {
                width: 16px;
                height: 16px;
                fill: currentColor;
            }
        }
    }

    &__body {
        // 卡片主體樣式
    }

    &__footer {
        margin-top: spacing(4);
        padding-top: spacing(4);
        border-top: 1px solid var(--color-border);
        font-size: 0.875rem;
        color: var(--color-text-secondary);
    }

    // 統計卡片變體
    &--stat {
        text-align: center;

        .c-card__icon {
            width: 48px;
            height: 48px;
            margin: 0 auto spacing(4);
            @include flex-center;
            border-radius: 12px;

            svg {
                width: 24px;
                height: 24px;
                fill: currentColor;
            }

            &--primary {
                background: rgba(var(--color-primary), 0.1);
                color: var(--color-primary);
            }

            &--success {
                background: rgba(var(--color-success), 0.1);
                color: var(--color-success);
            }

            &--warning {
                background: rgba(var(--color-warning), 0.1);
                color: var(--color-warning);
            }

            &--error {
                background: rgba(var(--color-error), 0.1);
                color: var(--color-error);
            }
        }

        .c-card__value {
            font-size: 2rem;
            font-weight: 700;
            color: var(--color-text-primary);
            margin-bottom: spacing(2);
        }

        .c-card__label {
            font-size: 0.875rem;
            color: var(--color-text-secondary);
            margin-bottom: spacing(3);
        }

        .c-card__change {
            @include flex-center;
            justify-content: center;
            gap: spacing(1);
            font-size: 0.875rem;
            font-weight: 500;

            &--positive {
                color: var(--color-success);
            }

            &--negative {
                color: var(--color-error);
            }

            svg {
                width: 16px;
                height: 16px;
                fill: currentColor;
            }
        }
    }

    // 圖表卡片變體
    &--chart {
        .c-card__chart {
            height: 300px;
            margin: spacing(4) -#{spacing(6)} -#{spacing(6)};
        }
    }

    // 列表卡片變體
    &--list {
        .c-card__list {
            margin: 0 -#{spacing(6)};

            .c-card__list-item {
                @include flex-between;
                padding: spacing(3) spacing(6);
                border-bottom: 1px solid var(--color-border);

                &:last-child {
                    border-bottom: none;
                }

                &:hover {
                    background: var(--color-surface-hover);
                }
            }
        }
    }
}
```

### 數據表格 (components/_tables.scss)

```scss
.c-table {
    width: 100%;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    overflow: hidden;

    &__wrapper {
        overflow-x: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    &__header {
        background: var(--color-gray-50);

        [data-theme="dark"] & {
            background: var(--color-gray-800);
        }
    }

    &__header-cell {
        padding: spacing(4) spacing(6);
        text-align: left;
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--color-text-primary);
        border-bottom: 1px solid var(--color-border);
        white-space: nowrap;

        &--sortable {
            cursor: pointer;
            user-select: none;
            position: relative;

            &:hover {
                background: var(--color-surface-hover);
            }

            &::after {
                content: "";
                position: absolute;
                right: spacing(3);
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-left: 4px solid transparent;
                border-right: 4px solid transparent;
                border-bottom: 4px solid var(--color-text-muted);
                opacity: 0.5;
            }

            &.sorted-asc::after {
                border-bottom: 4px solid var(--color-primary);
                opacity: 1;
            }

            &.sorted-desc::after {
                border-bottom: none;
                border-top: 4px solid var(--color-primary);
                opacity: 1;
            }
        }

        &--center {
            text-align: center;
        }

        &--right {
            text-align: right;
        }
    }

    &__body {
        // 表格主體樣式
    }

    &__row {
        transition: background 0.2s ease;

        &:hover {
            background: var(--color-surface-hover);
        }

        &--selected {
            background: rgba(var(--color-primary), 0.05);
        }
    }

    &__cell {
        padding: spacing(4) spacing(6);
        border-bottom: 1px solid var(--color-border);
        font-size: 0.875rem;
        color: var(--color-text-primary);
        vertical-align: middle;

        &--center {
            text-align: center;
        }

        &--right {
            text-align: right;
        }

        &--nowrap {
            white-space: nowrap;
        }
    }

    &__checkbox {
        width: 16px;
        height: 16px;
        cursor: pointer;
    }

    &__avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
    }

    &__status {
        display: inline-flex;
        align-items: center;
        gap: spacing(2);
        padding: spacing(1) spacing(3);
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 500;

        &::before {
            content: "";
            width: 6px;
            height: 6px;
            border-radius: 50%;
        }

        &--active {
            background: rgba(var(--color-success), 0.1);
            color: var(--color-success);

            &::before {
                background: var(--color-success);
            }
        }

        &--inactive {
            background: rgba(var(--color-gray-500), 0.1);
            color: var(--color-gray-500);

            &::before {
                background: var(--color-gray-500);
            }
        }

        &--pending {
            background: rgba(var(--color-warning), 0.1);
            color: var(--color-warning);

            &::before {
                background: var(--color-warning);
            }
        }
    }

    &__actions {
        @include flex-center;
        gap: spacing(2);
    }

    &__action {
        background: none;
        border: none;
        cursor: pointer;
        padding: spacing(1);
        color: var(--color-text-muted);
        border-radius: 4px;
        transition: all 0.2s ease;

        &:hover {
            background: var(--color-surface-hover);
            color: var(--color-text-primary);
        }

        svg {
            width: 16px;
            height: 16px;
            fill: currentColor;
        }

        &--danger:hover {
            background: rgba(var(--color-error), 0.1);
            color: var(--color-error);
        }
    }

    &__pagination {
        @include flex-between;
        padding: spacing(4) spacing(6);
        border-top: 1px solid var(--color-border);
        background: var(--color-gray-50);

        [data-theme="dark"] & {
            background: var(--color-gray-800);
        }
    }

    &__pagination-info {
        font-size: 0.875rem;
        color: var(--color-text-secondary);
    }

    &__pagination-controls {
        @include flex-center;
        gap: spacing(2);
    }

    &__pagination-button {
        background: none;
        border: 1px solid var(--color-border);
        cursor: pointer;
        padding: spacing(2) spacing(3);
        color: var(--color-text-secondary);
        border-radius: 4px;
        font-size: 0.875rem;
        transition: all 0.2s ease;

        &:hover {
            background: var(--color-surface-hover);
            color: var(--color-text-primary);
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        &.active {
            background: var(--color-primary);
            color: var(--color-text-inverse);
            border-color: var(--color-primary);
        }
    }

    // 響應式表格
    @include respond-to(md) {
        &__wrapper {
            border-radius: 0;
        }

        &__header-cell,
        &__cell {
            padding: spacing(3) spacing(4);
            font-size: 0.8125rem;
        }
    }

    // 空狀態
    &__empty {
        text-align: center;
        padding: spacing(12) spacing(6);
        color: var(--color-text-muted);

        svg {
            width: 48px;
            height: 48px;
            fill: currentColor;
            margin-bottom: spacing(4);
        }

        h3 {
            margin-bottom: spacing(2);
            color: var(--color-text-secondary);
        }

        p {
            margin: 0;
        }
    }
}
```

## 表單組件

### 表單控制項 (components/_forms.scss)

```scss
.c-form {
    &__group {
        margin-bottom: spacing(5);

        &--inline {
            display: flex;
            align-items: center;
            gap: spacing(4);

            .c-form__label {
                margin-bottom: 0;
                white-space: nowrap;
            }
        }

        &--grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: spacing(4);
        }
    }

    &__label {
        display: block;
        margin-bottom: spacing(2);
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--color-text-primary);

        &--required::after {
            content: " *";
            color: var(--color-error);
        }
    }

    &__input {
        @include form-control;

        &--error {
            border-color: var(--color-error);

            &:focus {
                border-color: var(--color-error);
                box-shadow: 0 0 0 3px rgba(var(--color-error), 0.1);
            }
        }

        &--success {
            border-color: var(--color-success);

            &:focus {
                border-color: var(--color-success);
                box-shadow: 0 0 0 3px rgba(var(--color-success), 0.1);
            }
        }
    }

    &__textarea {
        @include form-control;
        resize: vertical;
        min-height: 100px;
    }

    &__select {
        @include form-control;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
        background-position: right spacing(3) center;
        background-repeat: no-repeat;
        background-size: 16px 12px;
        padding-right: spacing(10);
        appearance: none;
    }

    &__checkbox,
    &__radio {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: spacing(2);
        cursor: pointer;
        font-size: 0.875rem;
        color: var(--color-text-primary);

        input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
        }

        .checkmark {
            width: 16px;
            height: 16px;
            border: 1px solid var(--color-border);
            background: var(--color-surface);
            transition: all 0.2s ease;

            &::after {
                content: "";
                position: absolute;
                display: none;
            }
        }

        input:checked ~ .checkmark {
            background: var(--color-primary);
            border-color: var(--color-primary);

            &::after {
                display: block;
            }
        }

        input:focus ~ .checkmark {
            box-shadow: 0 0 0 3px rgba(var(--color-primary), 0.1);
        }
    }

    &__checkbox {
        .checkmark {
            border-radius: 3px;

            &::after {
                left: 5px;
                top: 2px;
                width: 4px;
                height: 8px;
                border: solid white;
                border-width: 0 2px 2px 0;
                transform: rotate(45deg);
            }
        }
    }

    &__radio {
        .checkmark {
            border-radius: 50%;

            &::after {
                left: 4px;
                top: 4px;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: white;
            }
        }
    }

    &__help {
        margin-top: spacing(2);
        font-size: 0.8125rem;
        color: var(--color-text-muted);
    }

    &__error {
        margin-top: spacing(2);
        font-size: 0.8125rem;
        color: var(--color-error);
        @include flex-center;
        gap: spacing(1);

        svg {
            width: 14px;
            height: 14px;
            fill: currentColor;
        }
    }

    &__success {
        margin-top: spacing(2);
        font-size: 0.8125rem;
        color: var(--color-success);
        @include flex-center;
        gap: spacing(1);

        svg {
            width: 14px;
            height: 14px;
            fill: currentColor;
        }
    }

    &__actions {
        @include flex-center;
        gap: spacing(3);
        margin-top: spacing(6);

        @include respond-to(sm) {
            flex-direction: column;

            .c-button {
                width: 100%;
            }
        }
    }
}

// 文件上傳
.c-file-upload {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    border: 2px dashed var(--color-border);
    border-radius: 8px;
    background: var(--color-surface);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover,
    &.dragover {
        border-color: var(--color-primary);
        background: rgba(var(--color-primary), 0.05);
    }

    input {
        position: absolute;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }

    &__icon {
        width: 48px;
        height: 48px;
        fill: var(--color-text-muted);
        margin-bottom: spacing(4);
    }

    &__text {
        text-align: center;

        h3 {
            margin-bottom: spacing(2);
            color: var(--color-text-primary);
        }

        p {
            margin: 0;
            color: var(--color-text-muted);
            font-size: 0.875rem;
        }
    }

    &__files {
        margin-top: spacing(4);
        width: 100%;
    }

    &__file {
        @include flex-between;
        padding: spacing(3);
        background: var(--color-gray-50);
        border-radius: 6px;
        margin-bottom: spacing(2);

        [data-theme="dark"] & {
            background: var(--color-gray-800);
        }

        &:last-child {
            margin-bottom: 0;
        }
    }

    &__file-info {
        @include flex-center;
        gap: spacing(3);

        svg {
            width: 20px;
            height: 20px;
            fill: var(--color-primary);
        }

        span {
            font-size: 0.875rem;
            color: var(--color-text-primary);
        }
    }

    &__file-remove {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--color-error);
        padding: spacing(1);

        &:hover {
            background: rgba(var(--color-error), 0.1);
            border-radius: 4px;
        }

        svg {
            width: 16px;
            height: 16px;
            fill: currentColor;
        }
    }
}
```

## 通知系統

### 通知組件 (components/_notifications.scss)

```scss
.c-notification {
    position: fixed;
    top: spacing(6);
    right: spacing(6);
    z-index: 1000;
    max-width: 400px;

    @include respond-to(sm) {
        top: spacing(4);
        right: spacing(4);
        left: spacing(4);
        max-width: none;
    }

    &__item {
        @include card(spacing(4));
        margin-bottom: spacing(3);
        @include flex-center;
        gap: spacing(3);
        position: relative;
        transform: translateX(100%);
        animation: slideInRight 0.3s ease forwards;

        &--success {
            border-left: 4px solid var(--color-success);

            .c-notification__icon {
                color: var(--color-success);
            }
        }

        &--warning {
            border-left: 4px solid var(--color-warning);

            .c-notification__icon {
                color: var(--color-warning);
            }
        }

        &--error {
            border-left: 4px solid var(--color-error);

            .c-notification__icon {
                color: var(--color-error);
            }
        }

        &--info {
            border-left: 4px solid var(--color-info);

            .c-notification__icon {
                color: var(--color-info);
            }
        }

        &.removing {
            animation: slideOutRight 0.3s ease forwards;
        }
    }

    &__icon {
        width: 20px;
        height: 20px;
        fill: currentColor;
        flex-shrink: 0;
    }

    &__content {
        flex: 1;

        h4 {
            margin: 0 0 spacing(1);
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--color-text-primary);
        }

        p {
            margin: 0;
            font-size: 0.8125rem;
            color: var(--color-text-secondary);
            line-height: 1.4;
        }
    }

    &__close {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--color-text-muted);
        padding: spacing(1);
        border-radius: 4px;

        &:hover {
            background: var(--color-surface-hover);
            color: var(--color-text-primary);
        }

        svg {
            width: 16px;
            height: 16px;
            fill: currentColor;
        }
    }

    &__progress {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        background: currentColor;
        opacity: 0.3;
        animation: progress 5s linear forwards;
    }
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

@keyframes progress {
    from {
        width: 100%;
    }
    to {
        width: 0%;
    }
}
```

## JavaScript 功能

### 儀表板控制器

```javascript
// dashboard.js
class Dashboard {
    constructor() {
        this.sidebar = document.querySelector(".c-sidebar");
        this.sidebarToggle = document.querySelector(".c-sidebar__toggle");
        this.mobileMenuToggle = document.querySelector(
            ".c-topbar__menu-toggle",
        );
        this.themeToggle = document.querySelector(".c-topbar__theme-toggle");

        this.init();
    }

    init() {
        this.bindEvents();
        this.initTheme();
        this.initNotifications();
    }

    bindEvents() {
        // 側邊欄切換
        if (this.sidebarToggle) {
            this.sidebarToggle.addEventListener(
                "click",
                () => this.toggleSidebar(),
            );
        }

        // 移動端選單切換
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener(
                "click",
                () => this.toggleMobileMenu(),
            );
        }

        // 主題切換
        if (this.themeToggle) {
            this.themeToggle.addEventListener(
                "click",
                () => this.toggleTheme(),
            );
        }

        // 響應式處理
        window.addEventListener("resize", () => this.handleResize());
    }

    toggleSidebar() {
        document.querySelector(".o-layout").classList.toggle(
            "o-layout--collapsed",
        );
        this.sidebar.classList.toggle("c-sidebar--collapsed");

        // 儲存狀態
        localStorage.setItem(
            "sidebarCollapsed",
            this.sidebar.classList.contains("c-sidebar--collapsed"),
        );
    }

    toggleMobileMenu() {
        this.sidebar.classList.toggle("active");
    }

    toggleTheme() {
        const currentTheme =
            document.documentElement.getAttribute("data-theme") || "light";
        const newTheme = currentTheme === "light" ? "dark" : "light";

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    }

    initTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
    }

    initNotifications() {
        this.notificationContainer = document.querySelector(".c-notification");
        if (!this.notificationContainer) {
            this.notificationContainer = document.createElement("div");
            this.notificationContainer.className = "c-notification";
            document.body.appendChild(this.notificationContainer);
        }
    }

    showNotification(type, title, message, duration = 5000) {
        const notification = document.createElement("div");
        notification.className =
            `c-notification__item c-notification__item--${type}`;

        notification.innerHTML = `
      <svg class="c-notification__icon">
        <use href="#icon-${type}"></use>
      </svg>
      <div class="c-notification__content">
        <h4>${title}</h4>
        <p>${message}</p>
      </div>
      <button class="c-notification__close">
        <svg><use href="#icon-close"></use></svg>
      </button>
      <div class="c-notification__progress"></div>
    `;

        this.notificationContainer.appendChild(notification);

        // 自動移除
        setTimeout(() => {
            this.removeNotification(notification);
        }, duration);

        // 手動關閉
        notification.querySelector(".c-notification__close").addEventListener(
            "click",
            () => {
                this.removeNotification(notification);
            },
        );
    }

    removeNotification(notification) {
        notification.classList.add("removing");
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    handleResize() {
        if (window.innerWidth >= 1024) {
            this.sidebar.classList.remove("active");
        }
    }
}

// 初始化儀表板
document.addEventListener("DOMContentLoaded", () => {
    new Dashboard();
});
```

## 小結

這個儀表板範例展示了：

### 企業級功能

- **完整的管理界面**：側邊欄、頂部欄、主內容區
- **數據展示**：統計卡片、圖表、表格
- **用戶互動**：表單、通知、主題切換
- **響應式設計**：適配各種設備尺寸

### 技術特點

- **ITCSS 架構**：清晰的樣式組織結構
- **組件化設計**：可重用的 UI 組件
- **主題系統**：完整的深色/淺色主題支援
- **性能優化**：高效的 CSS 輸出和載入策略

### 最佳實踐

- **可訪問性**：鍵盤導航、螢幕閱讀器支援
- **用戶體驗**：流暢的動畫和互動反饋
- **可維護性**：清晰的代碼結構和文檔
- **可擴展性**：易於添加新功能和組件

這個範例可以作為企業級管理後台的基礎模板，根據具體業務需求進行客製化開發。
