import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sugestions } from './entities/sugestions.entity';
import { UpdateSugestion } from './dto/update-sugestion.dto';
import { EventService } from '../event/event.service';
import { UserService } from '../user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class SugestionsService {

    private AWS_S3_BUCKET = "wedding-now";

    private s3: AWS.S3;

    constructor(
        @InjectRepository(Sugestions)
        private readonly sugestionsRepository: Repository<Sugestions>,
        private readonly eventService: EventService,
        private readonly userService: UserService
    ) {
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
    }

    findAll() {
        return this.sugestionsRepository.find();
    }

    async create(eventID: string, userID, createSugestionDto: any) {
        const event = await this.eventService.findOne(eventID);
        const user = await this.userService.findOne(userID);
        const sugestion = this.sugestionsRepository.create({ ...createSugestionDto, event, user });
        return this.sugestionsRepository.save(sugestion);
    }

    async findAllByGuest(eventID: string, guest: string) {
        const event = await this.eventService.findOne(eventID);
        if (!event) {
            throw new HttpException('Event not found', HttpStatus.NOT_FOUND)
        }

        return this.sugestionsRepository.find({
            relations: ['event'],
            where: { event: { id: eventID }, guest: guest }
        });
    }

    findAllByEvent(id: string) {
        return this.sugestionsRepository.find({ relations: ['event'], where: { event: { id } } });
    }

    find(id: string) {
        return this.sugestionsRepository.findOne({ where: { id } })
    }

    update(id: string, updateSugestion: UpdateSugestion) {
        return this.sugestionsRepository.update(id, updateSugestion)
    }

    async remove(id: string) {
        try {
            await this.sugestionsRepository.findOne({ where: { id } })
        } catch (error) {
            throw new HttpException('Suggestion not found', HttpStatus.NOT_FOUND)
        }

        return this.sugestionsRepository.delete(id)
    }

    async uploadFile(file, sugestionId, folderName) {
        return await this.s3_upload(
            file.buffer,
            this.AWS_S3_BUCKET,
            sugestionId,
            file.mimetype,
            folderName
        );
    }

    async s3_upload(file, bucket, name, mimetype, folderName) {
        const params = {
            Bucket: bucket,
            Key: String(`${folderName}/${name}`),
            Body: file,
            ACL: 'public-read',
            ContentType: mimetype,
            ContentDisposition: 'inline',
            CreateBucketConfiguration: {
                LocationConstraint: 'ap-south-1',
            },
        };

        try {
            let s3Response = await this.s3.upload(params).promise();
            return s3Response;
        } catch (e) {
            console.log(e);
        }
    }
}