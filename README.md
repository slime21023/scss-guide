# SCSS 使用指南

詳盡的 SCSS 學習指南，從基礎到進階的完整教程。使用 Hydoc 主題提供優質的教育體驗。

## ✨ 特色功能

- 🎨 **漸層 Sidebar**：支援多種漸層配色方案
- 💻 **暗色代碼主題**：專業的代碼高亮顯示
- 📚 **教育 Callouts**：提示、警告、重要資訊框
- 📱 **響應式設計**：完美適配各種設備
- ⚡ **複製代碼功能**：一鍵複製代碼區塊
- 🔍 **搜索高亮**：智能搜索結果高亮

## 📁 項目結構

```
scss-guide/
├── config.toml              # Zola 配置文件
├── content/                 # 內容目錄
│   ├── _index.md           # 首頁內容
│   ├── basics/             # 基礎語法章節
│   │   ├── variables.md    # 變數教學
│   │   ├── nesting.md      # 嵌套規則
│   │   ├── mixins.md       # Mixins 使用
│   │   └── inheritance.md  # 繼承機制
│   ├── organization/       # 項目組織章節
│   │   ├── 7-1-pattern.md  # 7-1 架構模式
│   │   ├── itcss.md        # ITCSS 方法論
│   │   └── naming-conventions.md # 命名規範
│   ├── advanced/           # 進階功能章節
│   │   ├── functions.md    # 函數使用
│   │   ├── control-directives.md # 控制指令
│   │   └── maps.md         # Maps 資料結構
│   ├── patterns/           # 設計模式章節
│   ├── best-practices/     # 最佳實踐章節
│   └── examples/           # 實際範例章節
├── themes/hydoc/           # Hydoc 教育主題
│   ├── sass/               # 主題樣式
│   │   ├── hydoc.scss      # 主要樣式文件
│   │   ├── poole.scss      # 基礎樣式
│   │   └── _educational.scss # 教育增強樣式
│   ├── templates/          # 模板文件
│   ├── static/js/          # JavaScript 增強功能
│   └── *.md                # 主題文檔
└── static/                 # 靜態資源
    ├── css/                # 自定義樣式
    ├── js/                 # JavaScript 文件
    └── images/             # 圖片資源
```

## 🚀 快速開始

### 必要工具

**Zola** - 靜態網站生成器

### 開發命令

```bash
# 啟動開發伺服器 (包含熱重載)
zola serve

# 建構生產版本
zola build

# 檢查網站配置和連結
zola check

# 清理建構文件
zola clean

# 或手動清理
rm -rf public
```

## 🎨 主題設定

本項目使用 **Hydoc 主題**，基於 Hyde 主題的增強版本：

### 基本配置

```toml
# config.toml
theme = "hydoc"

[extra]
# 選擇 Sidebar 顏色主題
hyde_theme = "theme-gradient-ocean"  # 海洋漸層 (推薦)

# 基本設定
hyde_sticky = true
hyde_reverse = false

# 啟用 Hydoc 功能
hydoc_enable_code_copy = true
hydoc_educational_colors = true
```

### 🌈 Sidebar 漸層主題選項

#### 基本漸層主題
- `theme-gradient-08`: 紅橙漸層 🔴→🟠
- `theme-gradient-09`: 橙黃漸層 🟠→🟡
- `theme-gradient-0a`: 黃綠漸層 🟡→🟢
- `theme-gradient-0b`: 綠青漸層 🟢→🔵
- `theme-gradient-0c`: 青藍漸層 🔵→🔵
- `theme-gradient-0d`: 藍紫漸層 🔵→🟣
- `theme-gradient-0e`: 紫棕漸層 🟣→🟤
- `theme-gradient-0f`: 棕紅漸層 🟤→🔴

### 📚 教育功能

#### Callouts 使用

```html
<!-- 提示框 -->
<div class="callout tip">
這是一個有用的提示！
</div>

<!-- 警告框 -->
<div class="callout warning">
注意這個重要的警告信息。
</div>

<!-- 重要信息框 -->
<div class="callout important">
這是必須了解的關鍵信息。
</div>

<!-- 漸層版本 -->
<div class="callout gradient tip">
更醒目的漸層提示框！
</div>
```

#### 代碼區塊功能

- **自動複製按鈕**：每個代碼區塊都有複製功能
- **暗色主題**：護眼的暗色代碼背景
- **語法高亮**：支援 SCSS、CSS、JavaScript 等
- **漸層邊框**：可選的漸層邊框效果

```html
<!-- 漸層邊框代碼區塊 -->
<pre class="gradient-border"><code class="language-scss">
$primary: #3498db;
$gradient: linear-gradient(45deg, $primary, #e74c3c);
</code></pre>
```


## 🛠️ 自定義設定

### 自定義顏色

在 `static/css/custom.css` 中：

```css
:root {
  /* 覆蓋教育顏色 */
  --edu-primary: #1a365d;
  --edu-secondary: #3182ce;
  
  /* 自定義漸層 */
  --my-gradient: linear-gradient(135deg, #667eea, #764ba2);
}
```

### 自定義 Sidebar 漸層

```css
.theme-custom .sidebar {
  background: linear-gradient(135deg, #your-color1, #your-color2);
}
```

然後在 `config.toml` 中：

```toml
[extra]
hyde_theme = "theme-custom"
```

## 📄 授權

MIT License 