import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { WeddingService } from './wedding.service';
import { CreateWeddingDto } from './dto/create-wedding.dto';
import { UpdateWeddingDto } from './dto/update-wedding.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('wedding')
@Controller('wedding')
export class WeddingController {
  constructor(private readonly weddingService: WeddingService) { }

  @Post()
  create(
    @Request() req,
    @Body() createWeddingDto: CreateWeddingDto
  ) {
    const userId = req.user_data?.sub
    return this.weddingService.create(userId, createWeddingDto);
  }

  @Get()
  findAll() {
    return this.weddingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weddingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeddingDto: UpdateWeddingDto) {
    return this.weddingService.update(id, updateWeddingDto);
  }
}
