import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  private normalizeUserIds(userA: string, userB: string) {
    if (userA < userB) {
      return { user1Id: userA, user2Id: userB };
    }
    return { user1Id: userB, user2Id: userA };
  }

  async createOrGetDialog(params: {
    userId: string;
    targetUserId: string;
  }) {
    const { userId, targetUserId } = params;

    if (userId === targetUserId) {
      throw new ForbiddenException('Cannot create dialog with yourself');
    }

    const { user1Id, user2Id } = this.normalizeUserIds(
      userId,
      targetUserId,
    );


    const existingChat = await this.prisma.chat.findUnique({
      where: {
        user1Id_user2Id: {
          user1Id,
          user2Id,
        },
      },
      include: {
        user1: true,
        user2: true,
      },
    });

    if (existingChat) {
      return existingChat;
    }

    return this.prisma.chat.create({
      data: {
        user1Id,
        user2Id,
      },
      include: {
        user1: true,
        user2: true,
      },
    });
  }

  async getUserDialogs(params: {
    userId: string;
    limit: number;
  }) {
    const { userId, limit } = params;

    return this.prisma.chat.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: limit,
      include: {
        user1: true,
        user2: true,
        messages: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async getMessages(params: {
    chatId: string;
    userId: string;
    page: number;
    limit: number;
  }) {
    const { chatId, userId, page, limit } = params;

    await this.assertChatAccess(chatId, userId);

    const skip = (page - 1) * limit;

    return this.prisma.message.findMany({
      where: {
        chatId,
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit,
      include: {
        sender: true,
      },
    });
  }

  async sendMessage(params: {
    chatId: string;
    senderId: string;
    text: string;
  }) {
    const { chatId, senderId, text } = params;

    await this.assertChatAccess(chatId, senderId);

    const message = await this.prisma.message.create({
      data: {
        chatId,
        senderId,
        text,
      },
      include: {
        sender: true,
      },
    });

    await this.prisma.chat.update({
      where: { id: chatId },
      data: {
        updatedAt: new Date(),
      },
    });

    return message;
  }

  async getDialogById(chatId: string, userId: string) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        user1: true,
        user2: true,
      },
    });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    if (chat.user1Id !== userId && chat.user2Id !== userId) {
      throw new ForbiddenException('Access denied to this chat');
    }

    return chat;
  }

  private async assertChatAccess(chatId: string, userId: string) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      select: {
        user1Id: true,
        user2Id: true,
      },
    });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    const isParticipant =
      chat.user1Id === userId || chat.user2Id === userId;

    if (!isParticipant) {
      throw new ForbiddenException('You are not a participant of this chat');
    }
  }
}
