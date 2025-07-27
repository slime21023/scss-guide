# SCSS 使用指南

詳盡的 SCSS 學習指南，從基礎到進階的完整教程。使用 Hydoc 主題提供優質的教育體驗。

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

## 📄 授權

MIT License 