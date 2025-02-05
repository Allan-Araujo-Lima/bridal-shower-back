import { Injectable } from "@nestjs/common";
import { SugestionsService } from "../sugestions/sugestions.service";
import { InjectRepository } from "@nestjs/typeorm";
import { SugestionsLinks } from "./entities/sugestionsLinks.entity";
import { Repository } from "typeorm";

@Injectable()
export class sugestionsLinksService {
    constructor(
        @InjectRepository(SugestionsLinks)
        private sugestionsRepository: Repository<SugestionsLinks>,
        private readonly sugestionsService: SugestionsService
    ) { }

    async findAllBySugestion(id: string) {

    }
}