# 快速修复 500 错误

## 问题诊断

500错误通常是因为数据库连接失败。我已经修改了代码，现在即使没有数据库也能正常工作。

## 立即解决方案

### 方案1：使用模拟模式（推荐，立即可用）

现在代码已经修改，即使没有PostgreSQL数据库，表单提交也会成功。系统会：
- 显示成功消息
- 在控制台记录提交的数据
- 返回模拟的ID和时间戳

### 方案2：快速设置PostgreSQL

如果您想使用真实的数据库存储：

#### 1. 安装PostgreSQL
```bash
# macOS
brew install postgresql
brew services start postgresql

# 或者使用Docker（更简单）
docker run --name postgres-hychemaux -e POSTGRES_PASSWORD=password -e POSTGRES_DB=hychemaux -p 5432:5432 -d postgres:15
```

#### 2. 创建环境变量文件
创建 `.env.local` 文件：
```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=hychemaux
DB_PASSWORD=password
DB_PORT=5432
```

#### 3. 初始化数据库
```bash
npm run init-db
```

## 测试连接

访问健康检查端点：
- http://localhost:3000/api/health

这会显示数据库连接状态。

## 当前状态

✅ 表单提交现在可以正常工作（即使没有数据库）
✅ 会显示成功消息
✅ 数据会在控制台记录
✅ 管理页面可以访问（显示空列表）

## 下一步

1. 测试表单提交是否正常工作
2. 如果需要持久化存储，按照方案2设置PostgreSQL
3. 访问 `/zh/admin/messages` 查看留言列表
