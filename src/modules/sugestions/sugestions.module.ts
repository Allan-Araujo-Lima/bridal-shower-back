import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sugestions } from "./repository/sugestions.entity";
import { SugestionsController } from "./sugestions.controller";
import { SugestionsService } from "./sugestions.service";

@Module({
    imports: [TypeOrmModule.forFeature([Sugestions])],
    controllers: [SugestionsController],
    providers: [SugestionsService],
    exports: [SugestionsService]
})
export class SugestionsModule { }