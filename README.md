# SCSS 使用指南

詳盡的 SCSS 學習指南，從基礎到進階的完整教程。

## 項目結構

```
scss-guide/
├── config.toml          # Zola 配置文件
├── content/             # 內容目錄
│   ├── _index.md       # 首頁內容
│   ├── basics/         # 基礎語法章節
│   ├── organization/   # 項目組織章節
│   └── advanced/       # 進階功能章節
├── themes/hyde/        # Hyde 主題
└── static/             # 靜態資源
    └── js/             # JavaScript 文件
```

## 開發環境設置

### 必要工具

1. **Zola** - 靜態網站生成器
   - 安裝方法: https://www.getzola.org/documentation/getting-started/installation/

### 開發命令

```bash
# 啟動開發伺服器 (包含熱重載)
zola serve

# 建構生產版本
zola build

# 檢查網站配置和連結
zola check

# 清理建構文件
rm -rf public
```

## 主題設定

本項目使用 [Hyde 主題](https://github.com/getzola/hyde)，一個簡潔的雙欄佈局主題：

- **側邊欄導航**: 固定側邊欄包含主要導航連結
- **響應式設計**: 自動適應不同螢幕尺寸
- **主題色彩**: 支援多種配色方案
- **簡潔佈局**: 專注於內容展示

## 貢獻指南

1. Fork 此專案
2. 創建功能分支
3. 提交變更
4. 發起 Pull Request

## 授權

MIT License