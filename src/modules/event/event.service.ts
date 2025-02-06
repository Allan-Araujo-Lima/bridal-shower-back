import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDTO } from './dto/create-event.dto';
import { UpdateEventDTO } from './dto/update-event.dto';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private readonly userService: UserService) { }

  async create(userId: string, createEventDTO: CreateEventDTO) {
    const user = await this.userService.findOne(userId)

    if (!user) {
      throw new HttpException('User not Found', HttpStatus.NOT_FOUND)
    }

    return await this.eventRepository.save({ ...createEventDTO, user })
  }

  findAll() {
    return this.eventRepository.findAndCount()
  }

  findOne(id: string) {
    return this.eventRepository.findOne({ where: { id } })
  }

  async update(id: string, updateEventDTO: UpdateEventDTO) {
    const user = await this.eventRepository.findOne({ where: { id } })

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    await this.eventRepository.update(id, updateEventDTO)
  }

  remove(id: number) {
    return `This action removes a #${id} wedding`;
  }
}
