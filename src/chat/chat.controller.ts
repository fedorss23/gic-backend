import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  UseGuards,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateDialogDto } from './dto/create-dialog.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { GetMessagesDto } from './dto/get-messages.dto';
import { GetChatsDto } from './dto/get-chats.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async createOrGetDialog(
    @Body() dto: CreateDialogDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;

    return this.chatService.createOrGetDialog({
      userId,
      targetUserId: dto.targetUserId,
    });
  }

  @Get()
  async getMyDialogs(
    @Req() req: any,
    @Query() query: GetChatsDto,
  ) {
    const userId = req.user.id;

    return this.chatService.getUserDialogs({
      userId,
      limit: query.limit,
    });
  }

  @Get(':chatId/messages')
  async getMessages(
    @Param('chatId', ParseUUIDPipe) chatId: string,
    @Query() query: GetMessagesDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;

    return this.chatService.getMessages({
      chatId,
      userId,
      page: query.page,
      limit: query.limit,
    });
  }

  @Post(':chatId/messages')
  async sendMessage(
    @Param('chatId', ParseUUIDPipe) chatId: string,
    @Body() dto: SendMessageDto,
    @Req() req: any,
  ) {
    const senderId = req.user.id;

    return this.chatService.sendMessage({
      chatId,
      senderId,
      text: dto.text,
    });
  }
}
