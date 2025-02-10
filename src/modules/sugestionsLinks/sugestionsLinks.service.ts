import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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

        if (!suggestion) {
            throw new HttpException('Suggestion not found', HttpStatus.NOT_FOUND)
        }

        const suggestionLink = this.sugestionsLinks.create({ ...createSugestionsLinksDTO, suggestion })
        return this.sugestionsLinks.save(suggestionLink)
    }

    findAll() {
        return this.sugestionsLinks.find()
    }

    async findAllBySugestion(id: string) {
        const suggestion = await this.sugestionsService.find(id)

        if (!suggestion) {
            throw new HttpException('Suggestion not found', HttpStatus.NOT_FOUND)
        }

        const link = await this.sugestionsLinks.find({ relations: ['suggestion'], where: { suggestion: { id } } })

        if (!link) {
            throw new HttpException('No content', HttpStatus.NO_CONTENT)
        }

        return link
    }
}