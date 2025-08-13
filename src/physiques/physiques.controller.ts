import { Controller, Post, UsePipes, ValidationPipe, HttpCode, Put, Body } from '@nestjs/common';
import { PhysiquesService } from './physiques.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { PhysiquesDto } from './dto/physiques.dto';

@Controller('physiques')
export class PhysiquesController {
  constructor(private readonly physiquesService: PhysiquesService) {}

  @Post()
  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async create(@CurrentUser('id') userId: string, @Body() dto: PhysiquesDto) {
      return this.physiquesService.create(userId, dto)
  }
  

  @Put()
  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async update(@CurrentUser('id') userId: string, @Body() dto: PhysiquesDto) {
      return this.physiquesService.update(userId, dto)
  }
}
