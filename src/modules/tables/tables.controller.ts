import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) { }

  @Post(':eventId')
  create(
    @Param('eventId') eventId: string,
    @Body() createTableDto: CreateTableDto
  ) {
    return this.tablesService.create(eventId, createTableDto);
  }

  @Get()
  findAll() {
    return this.tablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tablesService.findOne(id);
  }

  @Get('event/:id')
  findByEvent(@Param('id') id: string) {
    return this.tablesService.findByEvent(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tablesService.update(id, updateTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tablesService.remove(id);
  }
}
