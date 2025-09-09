import { Controller, Get, HttpCode, UsePipes, ValidationPipe, Post, Query, Put, Body } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { MissionService } from './mission.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { MissionCreateDto, MissionUpdateDto } from './dto/mission.dto';

@Controller('mission')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Get()
  @Auth()
  async get(@CurrentUser("id") userId: string) {
    return await this.missionService.get(userId)
  }

  @Post()
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async create(@CurrentUser("id") userId: string, @Body() dto: MissionCreateDto) {
    return await this.missionService.create(dto, userId)
  }

  @Put(":id")
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async update(@Query("id") id: string, @Body() dto: MissionUpdateDto) {
    return await this.missionService.update(dto, id)
  }
}
