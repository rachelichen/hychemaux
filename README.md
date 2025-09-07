# 珩钰科技有限公司网站

这是一个使用Next.js、React和Tailwind CSS构建的现代化珩钰科技有限公司网站，支持中英文双语切换和响应式设计。

## 功能特性

- 🌐 中英文双语支持
- 📱 完全响应式设计，支持移动端和PC端
- ⚡ 基于Next.js 14 App Router
- 🎨 使用Tailwind CSS进行样式设计
- 🎭 集成Framer Motion动画效果
- 🔍 SEO友好的国际化路由
- 🎯 组件化架构，易于维护和扩展

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **UI库**: React 18
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Lucide React
- **国际化**: next-intl
- **语言**: TypeScript

## 项目结构

```
src/
├── app/                    # Next.js App Router页面
│   └── [locale]/          # 国际化路由
│       ├── page.tsx       # 首页
│       ├── about/         # 关于我们页面
│       ├── products/      # 产品页面
│       ├── news/          # 新闻页面
│       └── contact/       # 联系我们页面
├── components/            # React组件
│   ├── Navigation.tsx    # 导航组件
│   ├── Hero.tsx          # 首页横幅
│   ├── About.tsx         # 关于我们组件
│   ├── Products.tsx      # 产品展示组件
│   ├── News.tsx          # 新闻组件
│   ├── Contact.tsx       # 联系我们组件
│   └── Footer.tsx        # 页脚组件
└── i18n.ts               # 国际化配置

messages/                  # 国际化消息文件
├── zh.json               # 中文消息
└── en.json               # 英文消息
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 启动生产版本

```bash
npm start
```

## 国际化使用

网站支持中英文切换，默认语言为中文。用户可以通过导航栏的语言切换按钮进行语言切换。

### 添加新语言

1. 在`src/i18n.ts`中的`locales`数组添加新语言代码
2. 在`messages/`目录下创建对应的语言文件
3. 更新组件中的翻译文本

### 添加新翻译

在对应的语言文件中添加新的翻译键值对：

```json
{
  "newSection": {
    "title": "新标题",
    "description": "新描述"
  }
}
```

## 响应式设计

网站采用移动优先的设计理念，使用Tailwind CSS的响应式类名确保在各种设备上都有良好的显示效果：

- `sm:` - 小屏幕 (640px+)
- `md:` - 中等屏幕 (768px+)
- `lg:` - 大屏幕 (1024px+)
- `xl:` - 超大屏幕 (1280px+)

## 组件开发

所有组件都使用TypeScript编写，支持类型检查。组件采用函数式组件和Hooks，易于测试和维护。

### 添加新组件

1. 在`src/components/`目录下创建新的组件文件
2. 使用`useTranslations` hook获取国际化文本
3. 使用Tailwind CSS类名进行样式设计
4. 在需要的页面中导入和使用

## 部署

网站可以部署到任何支持Next.js的平台：

- Vercel (推荐)
- Netlify
- AWS Amplify
- 自托管服务器

## 许可证

MIT License
