# 男士穿搭教练

一个可本地打开、也可直接部署到公网的静态网页应用，用来根据场景、体型、肤色、预算和风格偏好生成男士穿搭建议。

## 本地打开

直接双击 `index.html`，或在浏览器里打开：

- `C:\Users\PC\mens-style-coach\index.html`

## 目前功能

- 根据场景生成穿搭公式
- 根据体型给出版型建议
- 根据肤色给出配色建议
- 根据预算给出采购优先级
- 根据自由输入目标生成针对性提醒

## Cloudflare Pages 部署

1. 把整个 `mens-style-coach` 文件夹上传到一个 GitHub 仓库。
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

## 文件

- `index.html`
- `styles.css`
- `app.js`
