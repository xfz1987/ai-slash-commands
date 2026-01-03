# AI Working Agreement

A collection of structured slash command specifications for AI-assisted engineering workflows.

## 使用原则

- 所有复杂认知工作必须通过 Slash Command 执行
- 每个命令必须基于 @上下文，而不是即兴提问
- 命令输出是正式工程资产，可被 Review 与复用

## 命令流程

/需求分析 → /plan → /review → /test

## 怎么使用（进入 claude 环境）

```
┌───────────────────────────────┐
│ 1️⃣ 用户 / 开发者              │
│                               │
│ 输入命令:                     │
│ /需求分析 @analysis/需求.md   │
│ -o outputs/analysis           │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ 2️⃣ Claude 插件 / CLI         │
│                               │
│ 1. 解析命令                   │
│    - 识别 /需求分析 命令      │
│    - 识别 @analysis/需求.md   │
│    - 解析 -o 输出目录         │
│                               │
│ 2. 读取模板文件               │
│    ai-slash-commands/commands/需求分析.md │
│                               │
│ 3. 读取 @文件 内容            │
│    analysis/需求.md           │
│                               │
│ 4. 拼接 prompt               │
│    - 系统提示（模板）         │
│    - 文件内容（上下文）       │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ 3️⃣ Claude AI 模型            │
│                               │
│ 接收 prompt                    │
│ - 系统提示：生成结构化需求分析 │
│ - 文件内容：需求上下文         │
│                               │
│ 生成 Markdown 输出文档         │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ 4️⃣ 插件 / CLI 输出            │
│                               │
│ 将生成内容写入指定目录         │
│ outputs/analysis/20260103-analysis.md │
│                               │
│ 团队成员可直接查看 / 复审 / 迭代 │
└───────────────────────────────┘
```

## 文档逻辑关系

```
需求来 → / 需求分析 @文件 / @对话 输出 devdocs/analysis.md
分析完成 → /plan @analysis.md 输出 devdocs/plan.md
审阅计划 → /review @plan.md 输出 devdocs/review.md
生成测试矩阵 → /test @plan.md 输出 devdocs/test.md
UI / 交互拆解 → /design @plan.md 输出 devdocs/design.md
```

## 开发

/dev todo(你要做的事情)
