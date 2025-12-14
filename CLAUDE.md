# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

這是一個營養標示生成器(Nutrition Label Generator)，基於 Vue 3 + Vite 建構的單頁應用程式，用於協助使用者根據食品成分資料庫生成符合台灣法規的營養標示。

## 開發指令

### 安裝相依套件
```sh
yarn
```

### 開發模式（Hot-Reload）
```sh
yarn dev
```

### 建置生產版本
```sh
yarn build
```

### 預覽建置結果
```sh
yarn preview
```

### 程式碼檢查與修正
```sh
yarn lint
```

### 程式碼格式化
```sh
yarn format
```

### 部署至 GitHub Pages
```sh
./deploy.sh
```
注意：此腳本會將建置結果推送至 `gh-pages` 分支

## 專案架構

### 路由結構
本專案使用 Vue Router，採用 Hash 模式 (`createWebHashHistory`)，主要路由包括：
- `/` - 首頁 (HomeView)
- `/product_list` - 產品列表 (ProductList)
- `/nutrition_label` - 營養標示生成 (NutritionLabels)
- `/mark_items` - 標示事項 (MarkItems)
- `/customize_list` - 自定義資料列表 (CustomizeList)
- `/edit_nutrition_label/:id` - 編輯營養標示
- `/edit_mark_items/:id` - 編輯標示事項
- `/added_customize_nts` - 已新增的自定義營養素
- `/QA` - 常見問題

路由設定檔位於 `src/router/index.js`，並整合 Google Analytics 追蹤頁面瀏覽。

### 狀態管理 (Pinia Stores)
專案使用 Pinia 進行狀態管理，主要 Store 包括：

1. **foodDataStore** (`src/stores/foodDataStore.js`)
   - 管理台灣食品營養成分資料庫 (`src/fooddata2023.json`)
   - 處理食品成分資料的表頭對應 (`headerMap`)
   - 管理使用者的產品列表 (localStorage: `myFoodData`)
   - 提供產品的 CRUD 操作
   - 營養素搜尋與過濾功能

2. **customizeStore** (`src/stores/customizeStore.js`)
   - 管理自定義食品資料 (localStorage: `myCustomizeData`)
   - 管理使用者自行新增的營養素 (localStorage: `myAddedNts`)
   - 處理營養素聲稱 (nutrition claims) 的基礎與新增項目
   - 提供自定義資料的 CRUD 操作

3. **messageStore** (`src/stores/messageStore.js`)
   - 管理應用程式的訊息通知系統

### 資料儲存機制
- **localStorage** 作為主要資料持久化方案
- 重要的 localStorage 鍵值：
  - `myFoodData`: 使用者建立的產品列表
  - `myCustomizeData`: 使用者建立的自定義食品資料
  - `myAddedNts`: 使用者自行新增的營養素列表
  - `myHeader`: 食品資料庫的中英文表頭對照

### 核心功能流程

#### 營養標示生成流程
1. 使用者在 `NutritionLabels.vue` 選擇食品成分
2. 可從內建資料庫 (`baseFoodData`) 或自定義資料庫 (`customizeDataList`) 選擇
3. 輸入食材克數，系統自動計算營養成分
4. 設定每份資訊、淨重等產品資訊
5. 系統根據台灣法規計算並格式化營養標示
6. 可選擇營養素聲稱項目 (nutrition claims)
7. 儲存至 localStorage 並可於 `ProductList.vue` 查看

#### 標示事項填寫流程
1. 在 `MarkItems.vue` 填寫產品的法定標示事項
2. 包括：製造商資訊、原產地、有效期限、過敏原等
3. 支援基因改造食品標示
4. 可選擇性標示過敏原資訊

### UI 框架與樣式
- 使用 **Bootstrap 5.3.3** 作為主要 UI 框架
- 使用 **Bootstrap Icons** 圖示庫
- Sass 用於客製化樣式
- 響應式設計支援桌面與行動裝置

### 特殊功能
- **html2canvas**: 用於將營養標示匯出為圖片
- **Swiper**: 用於輪播展示功能
- 支援搜尋與過濾功能（產品、食品成分、自定義營養素）
- 資料匯入/匯出功能

## 開發注意事項

### 編輯現有功能時
- 營養成分計算邏輯主要在各個 Vue 元件的 computed properties 中
- 修改營養素相關功能時，需注意 `headerMap` 的鍵值對應
- 所有表單驗證使用 Bootstrap 的 `needs-validation` 類別
- 資料更新後需同步更新 localStorage

### 新增營養素時
- 需在 `foodDataStore.js` 的 `headerMap` 新增對應
- 考慮是否需要更新 `fooddata2023.json` 的資料結構
- 自定義營養素透過 `customizeStore` 的 `myAddedNtsList` 管理

### Vite 設定
- Base URL 設定為 `/nutrition_label_tool/`（GitHub Pages 路徑）
- 路徑別名 `@` 指向 `src/` 目錄
- 開發時啟用 Vue DevTools

## 程式碼品質工具
- ESLint 9.x + Vue 插件
- Prettier 3.x 用於程式碼格式化
- 使用 `@vue/eslint-config-standard` 和 `@vue/eslint-config-prettier`

## 瀏覽器相容性
- 目標為現代瀏覽器
- 使用 ES Module 語法
