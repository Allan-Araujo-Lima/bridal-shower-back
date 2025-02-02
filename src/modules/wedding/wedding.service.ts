import { HttpException, Injectable } from '@nestjs/common';
import { CreateWeddingDto } from './dto/create-wedding.dto';
import { UpdateWeddingDto } from './dto/update-wedding.dto';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Wedding } from './entities/wedding.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WeddingService {
  constructor(
    @InjectRepository(Wedding)
    private weddingRepository: Repository<Wedding>,
    private readonly userService: UserService) { }

  async create(userId: string, createWeddingDto: CreateWeddingDto) {
    const user = await this.userService.findOne(userId)
    return await this.weddingRepository.save({ ...createWeddingDto, user })
  }

  findAll() {
    return this.weddingRepository.findAndCount()
  }

  findOne(id: string) {
    return this.weddingRepository.findOne({ where: { id } })
  }

  async update(id: string, updateWeddingDto: UpdateWeddingDto) {
    const user = await this.weddingRepository.findOne({ where: { id } })

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    await this.weddingRepository.update(id, updateWeddingDto)
  }

  remove(id: number) {
    return `This action removes a #${id} wedding`;
  }
}
