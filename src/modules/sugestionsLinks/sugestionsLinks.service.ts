import { Injectable } from "@nestjs/common";
import { SugestionsService } from "../sugestions/sugestions.service";
import { InjectRepository } from "@nestjs/typeorm";
import { SugestionsLinks } from "./entities/sugestionsLinks.entity";
import { Repository } from "typeorm";

@Injectable()
export class SugestionsLinksService {
    constructor(
        @InjectRepository(SugestionsLinks)
        private sugestionsLinks: Repository<SugestionsLinks>,
        private readonly sugestionsService: SugestionsService
    ) { }

    async create(id: string, createSugestionsLinksDTO: any) {
        const suggestion = await this.sugestionsService.find(id)
        const suggestionLink = this.sugestionsLinks.create({ ...createSugestionsLinksDTO, suggestion })
        return this.sugestionsLinks.save(suggestionLink)
    }

    async findAllBySugestion(id: string) {
        return this.sugestionsLinks.find({ relations: ['suggestion'], where: { suggestion: { id } } })
    }
}