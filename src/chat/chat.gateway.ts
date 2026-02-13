import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { ChatService } from './chat.service'
import { JwtService } from '@nestjs/jwt'
import { SendMessageDto } from './dto/send-message.dto'
import { UsePipes, ValidationPipe } from '@nestjs/common'

@WebSocketGateway({
    cors: {
        origin: '*',
    },
    namespace: 'chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server

    constructor(
        private readonly chatService: ChatService,
        private readonly jwtService: JwtService,
    ) {}

    async handleConnection(client: Socket) {
        try {
            const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.split(' ')[1]

            if (!token) {
                client.disconnect()
                return
            }

            const payload = await this.jwtService.verifyAsync(token)

            client.data.user = payload
        } catch (error) {
            client.disconnect()
        }
    }

    handleDisconnect(client: Socket) {}

    @SubscribeMessage('join_chat')
    async handleJoinChat(@MessageBody() data: { chatId: string }, @ConnectedSocket() client: Socket) {
        const user = client.data.user
        if (!user) return

        await this.chatService.getDialogById(data.chatId, user.id)

        await client.join(`chat:${data.chatId}`)

        return { success: true }
    }

    @SubscribeMessage('leave_chat')
    async handleLeaveChat(@MessageBody() data: { chatId: string }, @ConnectedSocket() client: Socket) {
        await client.leave(`chat:${data.chatId}`)
        return { success: true }
    }

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @SubscribeMessage('send_message')
    async handleSendMessage(@MessageBody() dto: SendMessageDto, @ConnectedSocket() client: Socket) {
        const user = client.data.user
        if (!user) return

        const message = await this.chatService.sendMessage({
            chatId: dto.chatId,
            senderId: user.id,
            text: dto.text,
        })

        const payload = {
            id: message.id,
            chatId: message.chatId,
            text: message.text,
            createdAt: message.createdAt,
            sender: {
                id: message.sender.id,
                avatar: message.sender.avatar,
            },
        }

        this.server.to(`chat:${dto.chatId}`).emit('new_message', payload)

        return payload
    }

    @SubscribeMessage('typing')
    async handleTyping(@MessageBody() data: { chatId: string }, @ConnectedSocket() client: Socket) {
        const user = client.data.user
        if (!user) return

        client.to(`chat:${data.chatId}`).emit('user_typing', {
            userId: user.id,
            chatId: data.chatId,
        })
    }
}
