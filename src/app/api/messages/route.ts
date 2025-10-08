import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { memoryStorage } from '@/lib/memory-storage';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, productId } = body;

    // 验证必填字段
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // 尝试连接数据库
    try {
      // 插入数据到数据库
      const query = `
        INSERT INTO messages (name, email, phone, message, product_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, created_at
      `;
      
      const values = [name, email, phone || null, message, productId || null];
      
      const result = await pool.query(query, values);
      
      return NextResponse.json({
        success: true,
        message: 'Message submitted successfully',
        data: {
          id: result.rows[0].id,
          createdAt: result.rows[0].created_at
        }
      });
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      
      // 如果数据库连接失败，使用内存存储
      console.log('Database not available, using memory storage');
      const savedMessage = memoryStorage.addMessage({
        name,
        email,
        phone: phone || undefined,
        message,
        product_id: productId || undefined
      });
      
      return NextResponse.json({
        success: true,
        message: 'Message submitted successfully (saved in memory)',
        data: {
          id: savedMessage.id,
          createdAt: savedMessage.created_at
        }
      });
    }

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    try {
      const query = `
        SELECT id, name, email, phone, message, product_id, created_at
        FROM messages
        ORDER BY created_at DESC
        LIMIT 100
      `;
      
      const result = await pool.query(query);
      
      return NextResponse.json({
        success: true,
        data: result.rows
      });
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      
      // 如果数据库连接失败，从内存存储获取数据
      console.log('Database not available, using memory storage');
      const messages = memoryStorage.getAllMessages();
      return NextResponse.json({
        success: true,
        data: messages,
        message: 'Data from memory storage'
      });
    }

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
