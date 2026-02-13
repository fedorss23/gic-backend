import { Controller, Param, Get, Post, UsePipes, ValidationPipe, Body, Put, Delete } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { SecurityService } from './security.service';
import { CreateSecutiryDto, UpdateSecurityDto } from './dto/security.dto';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) { }

  @Get()
  async getAll() {
    return this.securityService.getAll()
  }

  @Get("getById:id")
  async getById(@Param("id") id: string) {
    return this.securityService.getById(id)
  }

  @Post("create")
  @Auth()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateSecutiryDto, @CurrentUser("id") userId: string) {
    return this.securityService.create(dto, userId)
  }

  @Put("update:id")
  @Auth()
  @UsePipes(new ValidationPipe())
  async update(@Param("id") id: string, @Body() dto: UpdateSecurityDto) {
    return this.securityService.update(id, dto)
  }

  @Delete("delete:id")
  @Auth()
  @UsePipes(new ValidationPipe())
  async delete(@Param("id") id: string) {
    return this.securityService.delete(id)
  }
}
