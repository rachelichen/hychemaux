// 临时内存存储，用于在没有数据库时存储留言
interface Message {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  product_id?: string;
  created_at: string;
}

// 内存存储数组
let messages: Message[] = [];
let nextId = 1;

export const memoryStorage = {
  // 添加留言
  addMessage: (data: Omit<Message, 'id' | 'created_at'>): Message => {
    const message: Message = {
      id: nextId++,
      ...data,
      created_at: new Date().toISOString()
    };
    messages.push(message);
    console.log('Message stored in memory:', message);
    return message;
  },

  // 获取所有留言
  getAllMessages: (): Message[] => {
    return messages.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  // 获取留言数量
  getMessageCount: (): number => {
    return messages.length;
  },

  // 清空所有留言（用于测试）
  clearMessages: (): void => {
    messages = [];
    nextId = 1;
  }
};
