import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sugestions } from './repository/sugestions.entity';

@Injectable()
export class SugestionsService {
    constructor(
        @InjectRepository(Sugestions)
        private readonly sugestionsRepository: Repository<Sugestions>,
    ) { }

    findAll() {
        return this.sugestionsRepository.find();
    }

    create(createSugestionDto: any) {
        const sugestion = this.sugestionsRepository.create(createSugestionDto);
        return this.sugestionsRepository.save(sugestion);
    }
}
