import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDTO } from './dto/create-event.dto';
import { UpdateEventDTO } from './dto/update-event.dto';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import * as AWS from 'aws-sdk';

@Injectable()
export class EventService {
  private AWS_S3_BUCKET = "wedding-now";

  private s3: AWS.S3;

  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private readonly userService: UserService) {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async create(userId: string, createEventDTO: CreateEventDTO) {
    const user = await this.userService.findOne(userId)

    if (!user) {
      throw new HttpException('User not Found', HttpStatus.NOT_FOUND)
    }

    const event = await this.eventRepository.save({ ...createEventDTO, user })

    const folder = await this.createFolder(user.id, event.id)

    console.log(folder)

    return event
  }

  findAll() {
    return this.eventRepository.findAndCount()
  }

  findOne(id: string) {
    return this.eventRepository.findOne({ where: { id } })
  }

  findAllByUser(req: any) {
    const id = req.user_data?.sub;

    return this.eventRepository.find({ relations: ['user'], where: { user: { id } } })
  }

  async update(id: string, updateEventDTO: UpdateEventDTO) {
    const user = await this.eventRepository.findOne({ where: { id } })

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return await this.eventRepository.update(id, updateEventDTO)
  }

  async remove(id: string) {
    const event = await this.eventRepository.findOne({ where: { id } });

    if (!event) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND)
    };

    return this.eventRepository.delete(id)
  }

  async createFolder(userID: string, folderPath: string): Promise<void> {
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: `${userID}/${folderPath}/`,
    };

    try {
      await this.s3.putObject(params).promise();
      console.log(`Folder ${folderPath} created successfully in bucket ${this.AWS_S3_BUCKET} in the folder ${userID}`);
    } catch (error) {
      console.error(`Error creating folder: ${error.message}`);
      throw error;
    }
  }
}
