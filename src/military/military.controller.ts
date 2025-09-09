import { Controller, Get, HttpCode, UsePipes, ValidationPipe, Post, Query, Put, Body } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { MilitaryCreateDto, MilitaryUpdateDto } from './dto/military.dto';
import { MilitaryService } from './military.service';

@Controller('military')
export class MilitaryController {
  constructor(private readonly militaryService: MilitaryService) {}

  @Get()
  @Auth()
  async get(@CurrentUser("id") userId: string) {
    return await this.militaryService.get(userId)
  }
  
  @Post()
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async create(@CurrentUser("id") userId: string, @Body() dto: MilitaryCreateDto) {
    return await this.militaryService.create(dto, userId)
  }
  
  @Put(":id")
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async update(@Query("id") id: string, @Body() dto: MilitaryUpdateDto) {
    return await this.militaryService.update(dto, id)
  }
}
