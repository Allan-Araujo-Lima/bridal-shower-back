import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Repository } from 'typeorm';
import { Table } from './entities/table.entity';
import { EventService } from '../event/event.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TablesService {

  constructor(
    @InjectRepository(Table)
    private readonly tablesRepository: Repository<Table>,
    private readonly eventService: EventService
  ) {

  }

  async create(eventId: string, createTableDto: CreateTableDto) {
    const event = await this.eventService.findOne(eventId);

    if (!event)
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND)

    return this.tablesRepository.save({ ...createTableDto, event });
  }

  findAll() {
    return this.tablesRepository.find({ select: { event: { id: true } } });
  }

  findOne(id: string) {
    return this.tablesRepository.findOne({ where: { id }, select: { event: { id: true } } });
  }

  findByEvent(eventId: string) {
    return this.tablesRepository.find({
      relations: ['event'],
      where: { event: { id: eventId } },
      select: { event: { id: true } }
    })
  }

  update(id: string, updateTableDto: UpdateTableDto) {
    return this.tablesRepository.update(id, updateTableDto);
  }

  remove(id: string) {
    return this.tablesRepository.delete(id)
  }
}
