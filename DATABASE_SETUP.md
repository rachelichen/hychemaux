# 数据库设置指南

## PostgreSQL 数据库配置

### 1. 安装 PostgreSQL

#### macOS (使用 Homebrew)
```bash
brew install postgresql
brew services start postgresql
```

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### Windows
下载并安装 PostgreSQL: https://www.postgresql.org/download/windows/

### 2. 创建数据库

```bash
# 连接到 PostgreSQL
psql -U postgres

# 创建数据库
CREATE DATABASE hychemaux;

# 创建用户（可选）
CREATE USER hychemaux_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE hychemaux TO hychemaux_user;

# 退出
\q
```

### 3. 配置环境变量

创建 `.env.local` 文件：

```env
# PostgreSQL Database Configuration
DB_USER=postgres
DB_HOST=localhost
DB_NAME=hychemaux
DB_PASSWORD=your_password
DB_PORT=5432

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. 初始化数据库表

```bash
# 安装 dotenv 依赖（如果还没有）
npm install dotenv

# 运行数据库初始化脚本
npm run init-db
```

### 5. 验证设置

启动开发服务器：

```bash
npm run dev
```

访问管理页面查看留言：
- 中文版: http://localhost:3000/zh/admin/messages
- 英文版: http://localhost:3000/en/admin/messages

## 数据库表结构

### messages 表

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | SERIAL PRIMARY KEY | 自增主键 |
| name | VARCHAR(255) | 用户姓名 |
| email | VARCHAR(255) | 用户邮箱 |
| phone | VARCHAR(50) | 用户电话（可选） |
| message | TEXT | 留言内容 |
| product_id | VARCHAR(100) | 关联产品ID（可选） |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

## API 端点

### POST /api/messages
提交新留言

请求体：
```json
{
  "name": "用户姓名",
  "email": "user@example.com",
  "phone": "13800138000",
  "message": "留言内容",
  "productId": "hy-611"
}
```

响应：
```json
{
  "success": true,
  "message": "Message submitted successfully",
  "data": {
    "id": 1,
    "createdAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### GET /api/messages
获取留言列表

响应：
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "用户姓名",
      "email": "user@example.com",
      "phone": "13800138000",
      "message": "留言内容",
      "product_id": "hy-611",
      "created_at": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

## 故障排除

### 连接错误
1. 确保 PostgreSQL 服务正在运行
2. 检查环境变量配置
3. 验证数据库用户权限

### 表创建失败
1. 确保数据库存在
2. 检查用户是否有创建表的权限
3. 查看控制台错误信息

### API 错误
1. 检查数据库连接
2. 验证请求数据格式
3. 查看服务器日志
