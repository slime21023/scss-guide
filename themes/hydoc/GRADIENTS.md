# Hydoc 主題漸層設定指南

Hydoc 主題支援豐富的顏色自訂和漸層效果，讓你的教育內容更加生動和專業。

## 🎨 基本顏色設定

### 1. Hyde 主題顏色

通過 `config.toml` 設定基本主題顏色：

```toml
[extra]
hyde_theme = "theme-base-0d"  # 藍色主題
```

**可用顏色選項：**
- `theme-base-08`: 紅色 (#ac4142)
- `theme-base-09`: 橙色 (#d28445)
- `theme-base-0a`: 黃色 (#f4bf75)
- `theme-base-0b`: 綠色 (#90a959)
- `theme-base-0c`: 青色 (#75b5aa)
- `theme-base-0d`: 藍色 (#6a9fb5)
- `theme-base-0e`: 洋紅 (#aa759f)
- `theme-base-0f`: 棕色 (#8f5536)

### 2. 自訂教育顏色

在你的自訂 CSS 中覆蓋教育顏色變數：

```css
:root {
  /* 主要顏色 */
  --edu-primary: #1a365d;      /* 深藍色 */
  --edu-secondary: #3182ce;    /* 藍色 */
  --edu-accent: #e53e3e;       /* 紅色 */
  --edu-success: #38a169;      /* 綠色 */
  --edu-warning: #d69e2e;      /* 黃色 */
  --edu-info: #3182ce;         /* 資訊藍 */
}
```

## 🌈 漸層效果

### 1. 預設漸層變數

主題提供了預設的漸層變數：

```css
:root {
  --edu-gradient-primary: linear-gradient(135deg, var(--edu-primary), var(--edu-secondary));
  --edu-gradient-accent: linear-gradient(135deg, var(--edu-accent), #ff6b6b);
  --edu-gradient-success: linear-gradient(135deg, var(--edu-success), #4ecdc4);
  --edu-gradient-warning: linear-gradient(135deg, var(--edu-warning), #ffa726);
  --edu-gradient-info: linear-gradient(135deg, var(--edu-info), #42a5f5);
  --edu-gradient-code: linear-gradient(135deg, var(--edu-code-bg), #374151);
}
```

### 2. 自訂漸層

你可以創建自己的漸層：

```css
:root {
  /* 自訂漸層 */
  --my-gradient-sunset: linear-gradient(45deg, #ff6b6b, #ffa726, #42a5f5);
  --my-gradient-ocean: linear-gradient(135deg, #667eea, #764ba2);
  --my-gradient-forest: linear-gradient(135deg, #11998e, #38ef7d);
  
  /* 徑向漸層 */
  --my-radial-gradient: radial-gradient(circle, #667eea, #764ba2);
  
  /* 多色漸層 */
  --my-rainbow: linear-gradient(90deg, 
    #ff6b6b 0%, 
    #ffa726 25%, 
    #42a5f5 50%, 
    #11998e 75%, 
    #764ba2 100%
  );
}
```

## 🎯 使用漸層

### 1. 漸層背景類別

使用預設的漸層背景類別：

```html
<!-- 基本漸層背景 -->
<div class="gradient-bg">
  這是主要漸層背景
</div>

<!-- 不同類型的漸層 -->
<div class="gradient-bg accent">強調漸層</div>
<div class="gradient-bg success">成功漸層</div>
<div class="gradient-bg warning">警告漸層</div>
<div class="gradient-bg info">資訊漸層</div>
```

### 2. 漸層 Callouts

創建更吸引人的教育提示框：

```html
<!-- 漸層提示框 -->
<div class="callout gradient tip">
這是一個漸層提示框，更加醒目和專業！
</div>

<div class="callout gradient warning">
漸層警告框，讓重要資訊更突出。
</div>

<div class="callout gradient important">
漸層重要資訊框，確保關鍵內容不被忽略。
</div>
```

### 3. 漸層代碼區塊

為代碼區塊添加漸層邊框：

```html
<pre class="gradient-border"><code>
// 這個代碼區塊有漸層邊框
$primary-color: #3498db;
$gradient: linear-gradient(45deg, $primary-color, #e74c3c);

.button {
  background: $gradient;
}
</code></pre>
```

### 4. 漸層章節標題

創建引人注目的章節標題：

```html
<header class="section-header gradient">
  <h1 class="section-title">SCSS 進階技巧</h1>
  <p class="section-description">
    深入學習 SCSS 的高級功能和最佳實踐
  </p>
</header>
```

## 🛠️ 進階自訂

### 1. 動態漸層

創建動畫漸層效果：

```css
.animated-gradient {
  background: linear-gradient(45deg, #667eea, #764ba2, #667eea);
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

### 2. 響應式漸層

根據螢幕大小調整漸層：

```css
.responsive-gradient {
  background: var(--edu-gradient-primary);
}

@media (max-width: 768px) {
  .responsive-gradient {
    background: var(--edu-gradient-info);
  }
}
```

### 3. 漸層文字

創建漸層文字效果：

```css
.gradient-text {
  background: var(--edu-gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}
```

使用方式：

```html
<h2 class="gradient-text">漸層標題效果</h2>
```

## 🎨 漸層設計建議

### 1. 顏色搭配

**互補色漸層：**
```css
--gradient-complementary: linear-gradient(135deg, #3498db, #e74c3c);
```

**類似色漸層：**
```css
--gradient-analogous: linear-gradient(135deg, #3498db, #2ecc71, #1abc9c);
```

**單色漸層：**
```css
--gradient-monochrome: linear-gradient(135deg, #2c3e50, #34495e, #3498db);
```

### 2. 方向選擇

```css
/* 對角線 (推薦) */
--gradient-diagonal: linear-gradient(135deg, color1, color2);

/* 垂直 */
--gradient-vertical: linear-gradient(to bottom, color1, color2);

/* 水平 */
--gradient-horizontal: linear-gradient(to right, color1, color2);

/* 徑向 */
--gradient-radial: radial-gradient(circle, color1, color2);
```

### 3. 透明度效果

```css
--gradient-fade: linear-gradient(135deg, 
  rgba(52, 152, 219, 1) 0%, 
  rgba(52, 152, 219, 0.8) 50%, 
  rgba(52, 152, 219, 0.4) 100%
);
```

## 📱 行動裝置優化

### 1. 效能考量

```css
/* 避免複雜漸層在行動裝置上 */
@media (max-width: 768px) {
  .complex-gradient {
    background: var(--edu-primary); /* 改用純色 */
  }
}
```

### 2. 觸控友好

```css
.gradient-button {
  background: var(--edu-gradient-primary);
  padding: 1rem 2rem;
  border-radius: 8px;
  transition: transform 0.2s ease;
}

.gradient-button:active {
  transform: scale(0.98);
}
```

## 🔧 除錯和測試

### 1. 瀏覽器支援檢查

```css
/* 漸層降級 */
.gradient-element {
  background: #3498db; /* 降級顏色 */
  background: linear-gradient(135deg, #3498db, #e74c3c); /* 漸層 */
}
```

### 2. 對比度測試

確保漸層背景上的文字有足夠對比度：

```css
.gradient-bg {
  background: var(--edu-gradient-primary);
  color: white; /* 確保文字可讀 */
}
```

## 🌟 實際範例

### 完整的漸層卡片

```html
<div class="gradient-card">
  <div class="gradient-bg info">
    <h3>SCSS 變數</h3>
    <p>學習如何使用 SCSS 變數來管理樣式</p>
  </div>
  
  <div class="callout gradient tip">
    使用變數可以讓你的代碼更易維護！
  </div>
  
  <pre class="gradient-border"><code class="language-scss">
$primary: #3498db;
$gradient: linear-gradient(45deg, $primary, #e74c3c);
  </code></pre>
</div>
```

這樣你就可以創建出既美觀又專業的教育內容！