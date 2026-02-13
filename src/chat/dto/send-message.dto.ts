import { IsString, Length, IsUUID } from 'class-validator';

export class SendMessageDto {
    @IsUUID()
    chatId: string;

    @IsString()
    @Length(1, 2000)
    text: string;
}