# Hydoc 主題 Sidebar 顏色設定指南

## 🎨 目前可用的 Sidebar 顏色選項

### 1. **基本純色主題** (Hyde 原生)

在 `config.toml` 中設定：

```toml
[extra]
hyde_theme = "theme-base-XX"  # 替換 XX 為下面的代碼
```

| 主題代碼 | 顏色名稱 | 顏色值 | 預覽 |
|---------|---------|--------|------|
| `theme-base-08` | 紅色 | `#ac4142` | 🔴 |
| `theme-base-09` | 橙色 | `#d28445` | 🟠 |
| `theme-base-0a` | 黃色 | `#f4bf75` | 🟡 |
| `theme-base-0b` | 綠色 | `#90a959` | 🟢 |
| `theme-base-0c` | 青色 | `#75b5aa` | 🔵 |
| `theme-base-0d` | 藍色 | `#6a9fb5` | 🔵 |
| `theme-base-0e` | 洋紅 | `#aa759f` | 🟣 |
| `theme-base-0f` | 棕色 | `#8f5536` | 🟤 |

### 2. **漸層主題** (Hydoc 新增)

#### 基本漸層主題

```toml
[extra]
hyde_theme = "theme-gradient-XX"  # 替換 XX 為下面的代碼
```

| 主題代碼 | 漸層名稱 | 漸層顏色 | 效果描述 |
|---------|---------|---------|---------|
| `theme-gradient-08` | 紅橙漸層 | `#ac4142` → `#d28445` | 溫暖的紅橙漸變 |
| `theme-gradient-09` | 橙黃漸層 | `#d28445` → `#f4bf75` | 陽光般的橙黃漸變 |
| `theme-gradient-0a` | 黃綠漸層 | `#f4bf75` → `#90a959` | 自然的黃綠漸變 |
| `theme-gradient-0b` | 綠青漸層 | `#90a959` → `#75b5aa` | 清新的綠青漸變 |
| `theme-gradient-0c` | 青藍漸層 | `#75b5aa` → `#6a9fb5` | 海洋般的青藍漸變 |
| `theme-gradient-0d` | 藍紫漸層 | `#6a9fb5` → `#aa759f` | 夢幻的藍紫漸變 |
| `theme-gradient-0e` | 紫棕漸層 | `#aa759f` → `#8f5536` | 復古的紫棕漸變 |
| `theme-gradient-0f` | 棕紅漸層 | `#8f5536` → `#ac4142` | 大地色調的棕紅漸變 |

#### 特殊漸層主題

| 主題代碼 | 漸層名稱 | 漸層顏色 | 適用場景 |
|---------|---------|---------|---------|
| `theme-gradient-ocean` | 海洋主題 | `#667eea` → `#764ba2` | 科技、專業內容 |
| `theme-gradient-sunset` | 夕陽主題 | `#ff6b6b` → `#ffa726` | 創意、設計內容 |
| `theme-gradient-forest` | 森林主題 | `#11998e` → `#38ef7d` | 環保、自然主題 |
| `theme-gradient-purple` | 紫色主題 | `#667eea` → `#764ba2` | 高端、奢華感 |
| `theme-gradient-fire` | 火焰主題 | `#ff416c` → `#ff4b2b` | 熱情、動感內容 |
| `theme-gradient-coolblue` | 冷藍主題 | `#2196f3` → `#21cbf3` | 清爽、現代感 |
| `theme-gradient-dark` | 暗色主題 | `#2c3e50` → `#34495e` | 專業、低調風格 |

## 🛠️ 設定方法

### 方法 1：修改 config.toml (推薦)

```toml
# 基本設定
theme = "hydoc"
title = "你的網站標題"
base_url = "https://your-site.com"

[extra]
# 選擇你喜歡的主題
hyde_theme = "theme-gradient-ocean"  # 使用海洋漸層主題

# 其他設定
hyde_sticky = true
hyde_reverse = false

hyde_links = [
    {url = "/basics/", name = "基礎語法"},
    {url = "/advanced/", name = "進階功能"},
    # ... 更多連結
]
```

### 方法 2：自訂 CSS

如果你想要完全自訂的漸層，可以在 `static/css/custom.css` 中添加：

```css
/* 自訂漸層 sidebar */
.theme-custom .sidebar {
  background: linear-gradient(135deg, #your-color1, #your-color2);
}

.theme-custom .content a,
.theme-custom .related-posts li a:hover {
  color: #your-accent-color;
}
```

然後在 `config.toml` 中設定：

```toml
[extra]
hyde_theme = "theme-custom"
```

## 🎯 推薦搭配

### 教育內容推薦

```toml
# 專業教學 - 藍色系
hyde_theme = "theme-gradient-coolblue"

# 程式設計 - 暗色系
hyde_theme = "theme-gradient-dark"

# 創意設計 - 夕陽系
hyde_theme = "theme-gradient-sunset"

# 科學技術 - 海洋系
hyde_theme = "theme-gradient-ocean"
```

### 根據內容類型選擇

| 內容類型 | 推薦主題 | 原因 |
|---------|---------|------|
| 程式設計教學 | `theme-gradient-dark` | 專業、護眼 |
| 設計教學 | `theme-gradient-sunset` | 創意、溫暖 |
| 科學內容 | `theme-gradient-ocean` | 理性、專業 |
| 商業內容 | `theme-gradient-coolblue` | 信任、現代 |
| 環保主題 | `theme-gradient-forest` | 自然、清新 |
| 藝術創作 | `theme-gradient-purple` | 高雅、獨特 |

## 🔧 進階自訂

### 1. 動態漸層

```css
.theme-animated .sidebar {
  background: linear-gradient(45deg, #667eea, #764ba2, #667eea);
  background-size: 200% 200%;
  animation: gradientShift 5s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

### 2. 響應式漸層

```css
.theme-responsive .sidebar {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

@media (max-width: 768px) {
  .theme-responsive .sidebar {
    background: linear-gradient(180deg, #667eea, #764ba2);
  }
}
```

### 3. 透明度漸層

```css
.theme-fade .sidebar {
  background: linear-gradient(135deg, 
    rgba(102, 126, 234, 1) 0%, 
    rgba(118, 75, 162, 0.9) 100%
  );
}
```

## 📱 行動裝置考量

### 效能優化

```css
@media (max-width: 768px) {
  /* 在行動裝置上使用純色以提升效能 */
  .theme-gradient-ocean .sidebar {
    background: #667eea; /* 降級為純色 */
  }
}
```

## 🎨 顏色搭配建議

### 1. 對比度

確保 sidebar 文字與背景有足夠對比度：

```css
.sidebar {
  color: white; /* 白色文字在深色漸層上 */
}

.sidebar a {
  color: rgba(255, 255, 255, 0.9);
}

.sidebar a:hover {
  color: white;
}
```

### 2. 品牌一致性

選擇與你的品牌顏色相符的漸層：

```css
/* 品牌色：藍色 #3498db */
.theme-brand .sidebar {
  background: linear-gradient(135deg, #3498db, #2980b9);
}
```

## 🚀 快速開始

### 1. 立即應用

修改你的 `config.toml`：

```toml
[extra]
hyde_theme = "theme-gradient-ocean"  # 選擇一個漸層主題
```

### 2. 重新構建

```bash
zola build
```

### 3. 預覽效果

```bash
zola serve
```

在瀏覽器中打開 `http://127.0.0.1:1111` 查看效果。

## 💡 小貼士

1. **測試不同主題**：嘗試不同的漸層主題，找到最適合你內容的風格
2. **考慮可讀性**：確保導航文字在漸層背景上清晰可讀
3. **保持一致性**：選定主題後在整個網站中保持一致
4. **行動優先**：在行動裝置上測試漸層效果
5. **效能考量**：複雜漸層可能影響載入速度，適度使用

現在你可以輕鬆為你的 SCSS 學習指南選擇完美的 sidebar 漸層主題了！