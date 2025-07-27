+++
title = "維護最佳實踐"
description = "保持代碼品質的方法和技巧"
weight = 2
date = 2024-01-29
+++

# SCSS 維護最佳實踐

良好的維護實踐是確保 SCSS 項目長期可持續發展的關鍵。本章將介紹如何建立可維護、可擴展的 SCSS 代碼庫。

## 代碼組織和架構

### 模組化架構

```scss
// 使用 @use 建立清晰的模組邊界
// _config.scss
$primary-color: #007bff !default;
$secondary-color: #6c757d !default;
$font-family-base: 'Helvetica Neue', Arial, sans-serif !default;

// _mixins.scss
@use 'config';

@mixin button-variant($bg-color: config.$primary-color, $text-color: white) {
  background-color: $bg-color;
  color: $text-color;
  
  &:hover {
    background-color: darken($bg-color, 10%);
  }
}

// _buttons.scss
@use 'config';
@use 'mixins';

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: config.$font-family-base;
  
  &--primary {
    @include mixins.button-variant(config.$primary-color);
  }
  
  &--secondary {
    @include mixins.button-variant(config.$secondary-color);
  }
}

// main.scss
@use 'config';
@use 'buttons';
```

### 依賴管理

```scss
// 明確的依賴關係
// abstracts/_index.scss
@forward 'variables';
@forward 'functions';
@forward 'mixins';

// components/_index.scss
@forward 'buttons';
@forward 'cards';
@forward 'forms';

// main.scss
@use 'abstracts';
@use 'base';
@use 'components';
@use 'layout';
@use 'pages';
@use 'themes';

// 避免循環依賴
// ❌ 錯誤：A 依賴 B，B 又依賴 A
// _buttons.scss
@use 'forms'; // buttons 依賴 forms

// _forms.scss  
@use 'buttons'; // forms 又依賴 buttons

// ✅ 正確：提取共同依賴
// _shared.scss
%input-base {
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

// _buttons.scss
@use 'shared';

.btn {
  @extend %input-base;
  background: #007bff;
  color: white;
  border-color: #007bff;
}

// _forms.scss
@use 'shared';

.form-input {
  @extend %input-base;
  width: 100%;
}
```

## 命名規範和文檔

### 一致的命名規範

```scss
// BEM 命名規範
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  // Elements
  &__header {
    padding: 1.5rem;
    border-bottom: 1px solid #e9ecef;
  }
  
  &__title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  &__body {
    padding: 1.5rem;
  }
  
  &__footer {
    padding: 1rem 1.5rem;
    background: #f8f9fa;
    border-top: 1px solid #e9ecef;
  }
  
  // Modifiers
  &--featured {
    border-top: 4px solid #007bff;
  }
  
  &--compact {
    .card__header,
    .card__body,
    .card__footer {
      padding: 1rem;
    }
  }
}

// 變數命名規範
$color-primary: #007bff;
$color-secondary: #6c757d;
$color-success: #28a745;
$color-danger: #dc3545;

$font-size-xs: 0.75rem;
$font-size-sm: 0.875rem;
$font-size-base: 1rem;
$font-size-lg: 1.125rem;

$spacing-xs: 0.25rem;
$spacing-sm: 0.5rem;
$spacing-md: 1rem;
$spacing-lg: 1.5rem;
$spacing-xl: 3rem;

// 函數命名規範
@function get-color($name) {
  // 獲取顏色值
}

@function calculate-spacing($multiplier) {
  // 計算間距值
}

@function is-light-color($color) {
  // 判斷顏色是否為淺色
}
```

### 詳細的文檔註釋

```scss
/**
 * Button Component
 * 
 * A flexible button component with multiple variants, sizes, and states.
 * Follows the BEM naming convention and supports accessibility features.
 * 
 * @example
 * <button class="btn btn--primary">Primary Button</button>
 * <button class="btn btn--secondary btn--large">Large Secondary</button>
 * <button class="btn btn--outline" disabled>Disabled Outline</button>
 * 
 * @since 1.0.0
 * @author Design System Team
 */
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  margin: 0;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  transition: all 0.15s ease-in-out;
  
  // Remove default button styles
  background: none;
  appearance: none;
  
  /**
   * Button States
   * 
   * Handles hover, focus, active, and disabled states
   * with proper accessibility considerations.
   */
  &:hover {
    text-decoration: none;
    transform: translateY(-1px);
  }
  
  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  }
  
  &:disabled,
  &.disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      transform: none;
    }
  }
  
  /**
   * Button Variants
   * 
   * @variant primary - Main call-to-action button
   * @variant secondary - Secondary action button  
   * @variant outline - Outlined button style
   * @variant ghost - Transparent button with text only
   */
  &--primary {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    
    &:hover {
      background-color: #0056b3;
      border-color: #004085;
    }
    
    &:focus {
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
    }
  }
  
  &--secondary {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
    
    &:hover {
      background-color: #545b62;
      border-color: #4e555b;
    }
  }
  
  /**
   * Button Sizes
   * 
   * @size small - Compact button for tight spaces
   * @size large - Prominent button for important actions
   */
  &--small {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    border-radius: 0.25rem;
  }
  
  &--large {
    padding: 1rem 2rem;
    font-size: 1.125rem;
    border-radius: 0.5rem;
  }
}

/**
 * Color System
 * 
 * Centralized color definitions following a consistent naming scheme.
 * Colors are organized by purpose (brand, semantic, neutral) and include
 * accessibility-compliant contrast ratios.
 * 
 * @group Colors
 * @since 1.0.0
 */

/// Primary brand color
/// @type Color
/// @group Brand Colors
$color-primary: #007bff !default;

/// Secondary brand color  
/// @type Color
/// @group Brand Colors
$color-secondary: #6c757d !default;

/// Success state color (WCAG AA compliant)
/// @type Color
/// @group Semantic Colors
$color-success: #28a745 !default;

/**
 * Responsive Breakpoint Mixin
 * 
 * Generates media queries for responsive design using predefined breakpoints.
 * Supports both min-width and max-width queries with optional custom values.
 * 
 * @param {String} $breakpoint - Breakpoint name or custom value
 * @param {String} $type [min] - Query type: 'min', 'max', or 'between'
 * @param {String} $max-breakpoint - Maximum breakpoint for 'between' type
 * 
 * @example scss
 *   .component {
 *     @include respond-to(md) {
 *       display: flex;
 *     }
 *   }
 * 
 * @example scss
 *   .component {
 *     @include respond-to(sm, max) {
 *       display: block;
 *     }
 *   }
 * 
 * @since 1.2.0
 * @author Frontend Team
 */
@mixin respond-to($breakpoint, $type: min, $max-breakpoint: null) {
  // Implementation here
}
```

## 版本控制和變更管理

### Git 工作流程

```bash
# 功能分支命名規範
git checkout -b feature/button-component
git checkout -b fix/navigation-mobile-issue
git checkout -b refactor/color-system-update

# 提交訊息規範
git commit -m "feat(buttons): add new button variants and sizes

- Add outline and ghost button variants
- Implement small and large size modifiers  
- Update documentation with usage examples
- Add accessibility improvements

Closes #123"

git commit -m "fix(navigation): resolve mobile menu toggle issue

- Fix JavaScript event listener binding
- Improve touch event handling
- Update SCSS for better mobile experience

Fixes #456"

git commit -m "refactor(colors): reorganize color system structure

- Move color definitions to separate module
- Implement new naming convention
- Update all component references
- Add color contrast validation

BREAKING CHANGE: Color variable names have changed from $blue to $color-primary"
```

### 變更日誌維護

```markdown
# Changelog

All notable changes to this project will be documented in this file.

## [2.1.0] - 2024-01-15

### Added
- New button component variants (outline, ghost)
- Dark theme support for all components
- Accessibility improvements across all form elements
- New utility classes for spacing and typography

### Changed
- Updated color system with better contrast ratios
- Improved responsive breakpoint system
- Enhanced documentation with more examples

### Deprecated
- Old color variable names (will be removed in v3.0.0)
- Legacy grid system mixins

### Removed
- Unused CSS classes from previous versions
- Deprecated browser prefixes

### Fixed
- Mobile navigation menu toggle issue
- Form validation styling inconsistencies
- Typography scaling on small screens

### Security
- Updated dependencies to address security vulnerabilities
```

## 代碼品質保證

### Linting 和格式化

```json
// .stylelintrc.json
{
  "extends": [
    "stylelint-config-standard-scss",
    "stylelint-config-prettier-scss"
  ],
  "plugins": [
    "stylelint-scss",
    "stylelint-order"
  ],
  "rules": {
    // SCSS 特定規則
    "scss/at-import-partial-extension": "never",
    "scss/at-rule-no-unknown": true,
    "scss/selector-no-redundant-nesting-selector": true,
    
    // 命名規範
    "selector-class-pattern": "^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$",
    "selector-id-pattern": null,
    "custom-property-pattern": "^[a-z]([a-z0-9-]+)*$",
    
    // 代碼組織
    "order/properties-alphabetical-order": true,
    "declaration-block-no-redundant-longhand-properties": true,
    "shorthand-property-no-redundant-values": true,
    
    // 性能相關
    "selector-max-compound-selectors": 4,
    "selector-max-specificity": "0,4,0",
    "max-nesting-depth": 3,
    
    // 可訪問性
    "color-no-hex": null,
    "unit-allowed-list": ["px", "rem", "em", "%", "vh", "vw", "deg", "s", "ms"]
  }
}

// .prettierrc
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### 自動化測試

```javascript
// 視覺回歸測試
// tests/visual-regression.test.js
const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });

describe('Visual Regression Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Button component renders correctly', async () => {
    await page.goto('http://localhost:3000/components/buttons');
    await page.setViewport({ width: 1200, height: 800 });
    
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot({
      threshold: 0.2,
      thresholdType: 'percent'
    });
  });

  test('Navigation component is responsive', async () => {
    await page.goto('http://localhost:3000/components/navigation');
    
    // 測試不同螢幕尺寸
    const viewports = [
      { width: 320, height: 568 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1200, height: 800 }  // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewport(viewport);
      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot({
        customSnapshotIdentifier: `navigation-${viewport.width}x${viewport.height}`
      });
    }
  });
});

// CSS 輸出測試
// tests/css-output.test.js
const sass = require('sass');
const fs = require('fs');

describe('CSS Output Tests', () => {
  test('Main stylesheet compiles without errors', () => {
    const result = sass.compile('src/main.scss');
    expect(result.css).toBeDefined();
    expect(result.css.length).toBeGreaterThan(0);
  });

  test('CSS output size is within budget', () => {
    const result = sass.compile('src/main.scss', { style: 'compressed' });
    const sizeInKB = Buffer.byteLength(result.css, 'utf8') / 1024;
    
    expect(sizeInKB).toBeLessThan(100); // 100KB 預算
  });

  test('No duplicate selectors in output', () => {
    const result = sass.compile('src/main.scss');
    const selectors = result.css.match(/[^{}]+(?=\s*\{)/g) || [];
    const uniqueSelectors = [...new Set(selectors)];
    
    expect(selectors.length).toBe(uniqueSelectors.length);
  });
});
```

### 性能監控

```javascript
// 性能預算檢查
// scripts/check-performance.js
const fs = require('fs');
const gzipSize = require('gzip-size');

const performanceBudget = {
  'dist/main.css': {
    maxSize: 50 * 1024, // 50KB
    maxGzipSize: 15 * 1024 // 15KB gzipped
  },
  'dist/critical.css': {
    maxSize: 10 * 1024, // 10KB
    maxGzipSize: 3 * 1024 // 3KB gzipped
  }
};

async function checkPerformanceBudget() {
  for (const [filePath, budget] of Object.entries(performanceBudget)) {
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      process.exit(1);
    }

    const content = fs.readFileSync(filePath);
    const size = content.length;
    const gzippedSize = await gzipSize(content);

    console.log(`${filePath}:`);
    console.log(`  Size: ${(size / 1024).toFixed(2)}KB (budget: ${(budget.maxSize / 1024).toFixed(2)}KB)`);
    console.log(`  Gzipped: ${(gzippedSize / 1024).toFixed(2)}KB (budget: ${(budget.maxGzipSize / 1024).toFixed(2)}KB)`);

    if (size > budget.maxSize) {
      console.error(`❌ Size budget exceeded for ${filePath}`);
      process.exit(1);
    }

    if (gzippedSize > budget.maxGzipSize) {
      console.error(`❌ Gzipped size budget exceeded for ${filePath}`);
      process.exit(1);
    }

    console.log(`✅ Performance budget OK for ${filePath}`);
  }
}

checkPerformanceBudget().catch(console.error);
```

## 重構和技術債務管理

### 代碼重構策略

```scss
// 重構前：重複的代碼
.btn-primary {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #6c757d;
  color: white;
}

// 重構後：提取共同樣式
%btn-base {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

@mixin btn-variant($bg-color, $text-color: white) {
  @extend %btn-base;
  background-color: $bg-color;
  color: $text-color;
  
  &:hover {
    background-color: darken($bg-color, 10%);
  }
}

.btn-primary {
  @include btn-variant(#007bff);
}

.btn-secondary {
  @include btn-variant(#6c757d);
}
```

### 技術債務追蹤

```scss
// TODO: 重構顏色系統以支援主題切換
// FIXME: 修復 IE11 中的 flexbox 問題
// DEPRECATED: 這個 mixin 將在 v3.0 中移除
// @deprecated Use the new `button-variant` mixin instead
@mixin old-button-style($color) {
  // 舊的實作
}

// HACK: 臨時解決方案，需要在下個版本中修正
.navigation {
  // 這是一個臨時的解決方案
  // 應該重構為更好的實作
  z-index: 9999 !important; // HACK: 避免層級問題
}

// PERFORMANCE: 這個選擇器可能影響性能
.page .container .content .article .title {
  // 考慮簡化選擇器
}
```

## 團隊協作

### 代碼審查清單

```markdown
# SCSS Code Review Checklist

## 架構和組織
- [ ] 代碼遵循項目的架構模式（7-1, ITCSS 等）
- [ ] 使用適當的 @use/@forward 而不是 @import
- [ ] 沒有循環依賴
- [ ] 模組邊界清晰

## 命名和約定
- [ ] 遵循 BEM 或其他約定的命名規範
- [ ] 變數名稱語義化且一致
- [ ] 類別名稱描述功能而非外觀

## 性能
- [ ] 避免過深的選擇器嵌套（< 4 層）
- [ ] 合理使用 @extend 和 @mixin
- [ ] 沒有不必要的重複代碼
- [ ] 考慮了 CSS 輸出大小

## 可維護性
- [ ] 代碼有適當的註釋和文檔
- [ ] 使用變數而非硬編碼值
- [ ] 邏輯清晰且易於理解

## 響應式設計
- [ ] 遵循移動優先原則
- [ ] 使用一致的斷點系統
- [ ] 考慮了不同設備的用戶體驗

## 可訪問性
- [ ] 顏色對比度符合 WCAG 標準
- [ ] 支援鍵盤導航
- [ ] 考慮了螢幕閱讀器用戶

## 瀏覽器兼容性
- [ ] 考慮了目標瀏覽器支援
- [ ] 使用了適當的後備方案
- [ ] 測試了關鍵瀏覽器
```

### 知識分享

```scss
// 團隊知識庫範例
/**
 * Design System Guidelines
 * 
 * This file contains our team's SCSS best practices and conventions.
 * Please read and follow these guidelines to maintain code consistency.
 */

// 1. 變數命名規範
// 使用語義化名稱，不要基於外觀
$color-primary: #007bff;     // ✅ 好
$color-blue: #007bff;        // ❌ 避免

// 2. 組件結構
// 遵循 BEM 命名規範
.component {
  // 基礎樣式
  
  &__element {
    // 元素樣式
  }
  
  &--modifier {
    // 修飾符樣式
  }
}

// 3. 響應式設計
// 使用團隊統一的斷點系統
@include respond-to(md) {
  // 平板樣式
}

// 4. 性能考量
// 避免過深嵌套，保持選擇器簡潔
.good-selector {
  // 簡潔明確
}

.avoid .deep .nesting .like .this .selector {
  // 避免這樣的深層嵌套
}
```

## 持續改進

### 定期審查和更新

```javascript
// 自動化代碼品質報告
// scripts/quality-report.js
const fs = require('fs');
const path = require('path');

function analyzeScssFiles(directory) {
  const report = {
    totalFiles: 0,
    totalLines: 0,
    averageNestingDepth: 0,
    duplicateSelectors: [],
    unusedVariables: [],
    performanceIssues: []
  };

  // 分析邏輯...
  
  return report;
}

function generateReport() {
  const report = analyzeScssFiles('./src/scss');
  
  console.log('SCSS Quality Report');
  console.log('==================');
  console.log(`Total files: ${report.totalFiles}`);
  console.log(`Total lines: ${report.totalLines}`);
  console.log(`Average nesting depth: ${report.averageNestingDepth}`);
  
  if (report.performanceIssues.length > 0) {
    console.log('\nPerformance Issues:');
    report.performanceIssues.forEach(issue => {
      console.log(`- ${issue}`);
    });
  }
  
  // 生成詳細報告文件
  fs.writeFileSync('quality-report.json', JSON.stringify(report, null, 2));
}

generateReport();
```

### 學習和培訓

```markdown
# SCSS 學習計劃

## 新團隊成員
1. 閱讀項目 SCSS 架構文檔
2. 學習 BEM 命名規範
3. 熟悉響應式設計模式
4. 練習代碼審查流程

## 進階主題
1. 性能優化技巧
2. 可訪問性最佳實踐
3. 現代 CSS 功能整合
4. 設計系統建構

## 定期分享
- 每月技術分享會
- 最佳實踐案例研究
- 新工具和技術評估
- 代碼重構經驗分享
```

## 小結

良好的維護實踐包括：

### 1. 代碼組織
- 清晰的模組化架構
- 明確的依賴關係
- 一致的命名規範

### 2. 品質保證
- 自動化測試和檢查
- 代碼審查流程
- 性能監控

### 3. 文檔和溝通
- 詳細的代碼註釋
- 完整的變更日誌
- 團隊知識分享

### 4. 持續改進
- 定期代碼重構
- 技術債務管理
- 學習和培訓

通過遵循這些維護最佳實踐，你可以確保 SCSS 項目的長期健康發展，提高團隊協作效率，並降低維護成本。