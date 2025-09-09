import { Controller, Get, HttpCode, UsePipes, ValidationPipe, Post, Query, Put, Body } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { AwardService } from './award.service';
import { AwardCreateDto, AwardUpdateDto } from './dto/award.dto';

@Controller('award')
export class AwardController {
  constructor(private readonly awardService: AwardService) { }

  @Get()
  @Auth()
  async get(@CurrentUser("id") userId: string) {
    return await this.awardService.get(userId)
  }

  @Post()
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async create(@CurrentUser("id") userId: string, @Body() dto: AwardCreateDto) {
    return await this.awardService.create(dto, userId)
  }

  @Put(":id")
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async update(@Query("id") id: string, @Body() dto: AwardUpdateDto) {
    return await this.awardService.update(dto, id)
  }
}
