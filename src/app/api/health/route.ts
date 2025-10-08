import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // 测试数据库连接
    const client = await pool.connect();
    
    // 执行简单查询
    const result = await client.query('SELECT NOW() as current_time');
    client.release();
    
    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      timestamp: result.rows[0].current_time,
      environment: {
        db_host: process.env.DB_HOST || 'localhost',
        db_name: process.env.DB_NAME || 'hychemaux',
        db_port: process.env.DB_PORT || '5432',
        db_user: process.env.DB_USER || 'postgres'
      }
    });
    
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: {
        db_host: process.env.DB_HOST || 'localhost',
        db_name: process.env.DB_NAME || 'hychemaux',
        db_port: process.env.DB_PORT || '5432',
        db_user: process.env.DB_USER || 'postgres'
      }
    }, { status: 500 });
  }
}
