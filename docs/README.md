# AUI Review · 投研看板

用 [AUI-Review](https://github.com/zacklin111/AUI-Review) 看本仓库过往生图。框架能力没改：记录网格、详情弹窗、生成方式、双条并排对比。数据换成 ai-research-board 的真实稿。

## 本地预览

看板本体：

```bash
npm run dev
```

对比台：

```bash
npm run review
```

打开 http://127.0.0.1:4173/ 。必须走 HTTP；直接打开 `index.html` 时浏览器可能读不到 JSON。

## 记录怎么读

| 生成方式 | 这条线上的稿 |
| --- | --- |
| 需求直出 | 带窗铬的第一版评级、风险第一张表 |
| 参考图引导 | 半圆仪中文卡、Volume / Analyst 三卡、风险竞品口径 |
| 标准卡约束 | 锁定英文评级、六卡瀑布流 |
| 决策改版 | 风险过权轨、新闻 Watch |

建议对比：

1. `技术评级 · 带窗铬的第一版` × `技术评级 · 锁定标准卡`
2. `组合风险 · 第一版对照表` × `组合风险 · 过权轨`
3. `看板 · Rating + Volume + Analyst` × `看板 · 纵向瀑布流`

## 替换或追加

1. 预览图放 `assets/`。
2. 在 `data/reviews.json` 里加 `records`。
3. `generatedAt` 用 ISO 8601，页面按时间倒序。
