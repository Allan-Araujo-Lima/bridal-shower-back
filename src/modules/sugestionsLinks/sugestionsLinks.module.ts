import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SugestionsModule } from "../sugestions/sugestions.module";
import { SugestionsLinksController } from "./sugestionsLinks.controller";
import { SugestionsLinksService } from "./sugestionsLinks.service";
import { SugestionsLinks } from "./entities/sugestionsLinks.entity";

@Module({
    imports: [TypeOrmModule.forFeature([SugestionsLinks]), SugestionsModule],
    controllers: [SugestionsLinksController],
    providers: [SugestionsLinksService],
    exports: [SugestionsLinksService]
})
export class SugestionsLinksModule { }