import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { PlaceService } from './place.service';
import { CreatePlaceDto, UpdatePlaceDto } from './dto/place.dto';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) { }

  @Get()
  async getAll() {
    return this.placeService.getAll();
  }

  @Get("getById:id")
  async getById(@Param('id') id: string) {
    return this.placeService.getById(id);
  }

  @Post("create")
  @Auth()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreatePlaceDto, @CurrentUser("id") userId: string) {
    return this.placeService.create(dto, userId);
  }


  @Put("update:id")
  @Auth()
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() dto: UpdatePlaceDto) {
    return this.placeService.update(id, dto);
  }

  @Delete("delete:id")
  @Auth()
  @UsePipes(new ValidationPipe())
  async delete(@Param('id') id: string) {
    return this.placeService.delete(id);
  }
}
