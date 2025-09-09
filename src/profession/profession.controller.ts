import { Controller, Get, HttpCode, UsePipes, ValidationPipe, Post, Query, Put, Body } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ProfessionCreateDto, ProfessionUpdateDto } from './dto/profession.dto';
import { ProfessionService } from './profession.service';

@Controller('profession')
export class ProfessionController {
  constructor(private readonly professionService: ProfessionService) {}

  @Get()
  @Auth()
  async get(@CurrentUser("id") userId: string) {
    return await this.professionService.get(userId)
  }

  @Post()
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async create(@CurrentUser("id") userId: string, @Body() dto: ProfessionCreateDto) {
    return await this.professionService.create(dto, userId)
  }

  @Put(":id")
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async update(@Query("id") id: string, @Body() dto: ProfessionUpdateDto) {
    return await this.professionService.update(dto, id)
  }
}
