import { IsUUID } from 'class-validator';

export class CreateDialogDto {
  @IsUUID()
  targetUserId: string;
}
