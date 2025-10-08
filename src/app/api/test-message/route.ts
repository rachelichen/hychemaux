import { NextRequest, NextResponse } from 'next/server';
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

    // 使用内存存储添加留言
    const savedMessage = memoryStorage.addMessage({
      name,
      email,
      phone: phone || undefined,
      message,
      product_id: productId || undefined
    });

    return NextResponse.json({
      success: true,
      message: 'Test message submitted successfully',
      data: savedMessage
    });

  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const messages = memoryStorage.getAllMessages();
    return NextResponse.json({
      success: true,
      data: messages,
      count: messages.length
    });
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
