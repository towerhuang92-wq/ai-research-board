# components.md

来源：控件层用 **MooPC 新框架**（先实例化，再填数）。数据模块仍自研，但色/字/距绑 token。禁止为装饰再造一套卡片。禁止上交易按钮。

完整映射见 `library-map.md`。没有这份文件不准写终稿。

| 组件 | 来源 | 语义 | 不是 |
| --- | --- | --- | --- |
| 标签 Tag | MooPC · 黑肤 | 评级 / 置信度 / 周期 / Buy / Accelerating | 不是板块名；不是手画胶囊 |
| 按钮 Button | MooPC · 基础/主色 | OmniBox 发送 | 不是交易买入 |
| 常规单行输入框 | MooPC | Ask 意图入口 | 不是顶栏搜索；浅色默认不算暗台过关 |
| 文字样式 Body/12 | MooPC Text | 表、说明、AI 注 | 不是 BR Hendrix 当中文正文 |
| padding_s* / m* / l* | MooPC 变量 | 所有 gap / 卡垫 | 不是手写 8 |
| OmniBox | 自研壳 + 上两项 | 只属于模块 B | 不是全宽顶栏 |
| Widget / 半圆仪 / 双轴图 | 自研几何 | 画布数据块 | 库无对应；色距仍绑 token |
| FlexCard 依据 | 自研 | 带列名+数的回答 | 不是无来源气泡 |

组合：OmniBox 发送 → 解释则出依据卡。不得同时变成无依据聊天气泡。
只换 Tag/Button、字号间距仍手写 = 未用设计系统。
