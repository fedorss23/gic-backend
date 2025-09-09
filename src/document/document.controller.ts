import { Controller, Get, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { DocumentService } from './document.service';
import { DocumentDto } from './dto/document.dto';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Auth()
  @Get()
  async get(@CurrentUser("id") userId: string) {
    return await this.documentService.get(userId)
  }

  @Auth()
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: DocumentDto, @CurrentUser("id") userId: string) {
    return await this.documentService.create(dto, userId)
  }
}
