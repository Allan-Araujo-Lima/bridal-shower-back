import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sugestions } from './repository/sugestions.entity';
import { UpdateSugestion } from './dto/update-sugestion.dto';
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { UserService } from '../user/user.service';

@Injectable()
export class SugestionsService {

    private AWS_S3_BUCKET = "wedding-now";

    private s3: AWS.S3;

    constructor(
        @InjectRepository(Sugestions)
        private readonly sugestionsRepository: Repository<Sugestions>,
        private readonly userService: UserService,
    ) {
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
    }

    findAll() {
        return this.sugestionsRepository.find();
    }

    async create(userId: string, createSugestionDto: any) {
        const user = await this.userService.findOne(userId);
        const sugestion = this.sugestionsRepository.create({ ...createSugestionDto, user });
        return this.sugestionsRepository.save(sugestion);
    }

    findAllByGuest(guest: string) {
        return this.sugestionsRepository.find({ where: { guest } });
    }

    findAllByUser(id: string) {
        return this.sugestionsRepository.find({ relations: ['user'], where: { user: { id } } });
    }

    update(id: string, updateSugestion: UpdateSugestion) {
        return this.sugestionsRepository.update(id, updateSugestion)
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