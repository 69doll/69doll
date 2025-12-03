---
name: 管理站
description: 关于管理站
globs: admin-website/**/*
---

# 金云69 管理站

## 技术栈

- **框架**: Vite, React 19
- **UI 库**: Tailwind CSS, Shadcn/ui
- **图标**: `lucide-react`
- **状态管理**: TanStack Query (Server State), Context API (Client State)
- **路由**: `react-router-dom`
- **样式**: SCSS Modules, `tailwind-merge`

## 项目结构

- `admin-website/src/pages`: 页面组件。
  - `admin-website/src/pages/*/components`: 页面内部的私有组件。
- `admin-website/src/components`: 全局可复用组件。
  - `admin-website/src/components/ui`: 由 Shadcn/ui 生成的基础 UI 组件。
- `admin-website/src/request`: 封装的 API 请求函数，按模块划分。
- `admin-website/src/hooks`: 全局可复用的自定义 Hooks (例如 `useList`, `useErrors`)。
- `admin-website/src/store`: 全局客户端状态管理 (例如用户登录状态)。
- `admin-website/src/Context`: 全局上下文提供者 (例如图片预览)。
- `admin-website/src/Router.tsx`: 应用的顶层路由配置。
- `admin-website/src/lib` 和 `admin-website/src/utils`: 工具函数。
- `admin-website/src/styles`: 全局样式文件。
