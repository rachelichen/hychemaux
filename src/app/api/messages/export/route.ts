import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { memoryStorage } from '@/lib/memory-storage';

export async function GET(request: NextRequest) {
  try {
    let messages: any[] = [];

    // 尝试从数据库获取数据
    try {
      const query = `
        SELECT id, name, email, phone, message, product_id, created_at
        FROM messages
        ORDER BY created_at DESC
      `;
      
      const result = await pool.query(query);
      messages = result.rows;
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      
      // 如果数据库连接失败，从内存存储获取数据
      console.log('Database not available, using memory storage for export');
      messages = memoryStorage.getAllMessages();
    }

    // 生成CSV内容
    const csvHeaders = [
      'ID',
      '姓名',
      '邮箱',
      '电话',
      '产品ID',
      '留言内容',
      '提交时间'
    ];

    const csvRows = messages.map(message => [
      message.id,
      `"${message.name || ''}"`,
      `"${message.email || ''}"`,
      `"${message.phone || ''}"`,
      `"${message.product_id || ''}"`,
      `"${(message.message || '').replace(/"/g, '""')}"`, // 转义双引号
      message.created_at
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');

    // 添加BOM以支持中文
    const csvWithBOM = '\uFEFF' + csvContent;

    return new NextResponse(csvWithBOM, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="messages-${new Date().toISOString().split('T')[0]}.csv"`,
        'Cache-Control': 'no-cache'
      }
    });

  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Export failed' },
      { status: 500 }
    );
  }
}
