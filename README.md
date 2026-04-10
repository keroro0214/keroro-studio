# Keroro Studio

一个可部署到公网的多应用静态站点。根目录是工作室首页，各个小程序放在 `apps/` 下面。

## 应用

- `apps/mens-style-coach`: 男士穿搭教练

## AI 图片生成

`apps/mens-style-coach` 已经包含 AI 效果图按钮。线上生成图片需要在 Cloudflare Pages 里配置环境变量：

- `OPENAI_API_KEY`

后端函数在：

- `functions/api/generate-outfit-image.js`

本地直接双击 HTML 时不会调用这个后端函数；部署到 Cloudflare Pages 后才可用。

## 本地打开

直接双击根目录的 `index.html`，或打开某个应用：

- 工作室首页：`C:\Users\PC\mens-style-coach\index.html`
- 男士穿搭教练：`C:\Users\PC\mens-style-coach\apps\mens-style-coach\index.html`

## Cloudflare Pages 部署

1. 把整个仓库推送到 GitHub。
2. 登录 Cloudflare。
3. 打开 `Workers & Pages`。
4. 选择 `Create application`。
5. 选择 `Pages`。
6. 连接你的 GitHub 仓库。
7. 构建设置保持为静态站点：
   - Framework preset: `None`
   - Build command: 留空
   - Build output directory: `/`
8. 点击部署。

部署后你会得到一个公网网址，可以直接发给别人用。

## 目录结构

- `index.html`: 工作室首页
- `apps/mens-style-coach/`: 男士穿搭教练
