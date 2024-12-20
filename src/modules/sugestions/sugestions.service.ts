import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sugestions } from './repository/sugestions.entity';
import { UpdateSugestion } from './dto/update-sugestion.dto';
import { Injectable } from '@nestjs/common';

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

    findAllByGuest(guest: string) {
        return this.sugestionsRepository.find({ where: { guest } });
    }

    update(id: string, updateSugestion: UpdateSugestion) {
        return this.sugestionsRepository.update(id, updateSugestion)
    }
}