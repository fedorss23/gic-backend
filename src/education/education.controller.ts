import { Controller, Get, HttpCode, UsePipes, ValidationPipe, Post, Query, Put, Body } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { EducactionCreateDto, EducationUpdateDto } from './dto/education.dto';
import { EducationService } from './education.service';

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) { }

  @Get()
  @Auth()
  async get(@CurrentUser("id") userId: string) {
    return await this.educationService.get(userId)
  }

  @Post()
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async create(@CurrentUser("id") userId: string, @Body() dto: EducactionCreateDto) {
    return await this.educationService.create(dto, userId)
  }

  @Put(":id")
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async update(@Query("id") id: string, @Body() dto: EducationUpdateDto) {
    return await this.educationService.update(dto, id)
  }
}
