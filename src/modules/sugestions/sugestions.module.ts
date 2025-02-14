import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sugestions } from "./entities/sugestions.entity";
import { SugestionsController } from "./sugestions.controller";
import { SugestionsService } from "./sugestions.service";
import { EventModule } from "../event/event.module";
import { UserModule } from "../user/user.module";
import { InsertImageMapper } from "src/utils/mappers/insert-images.mapper";

@Module({
    imports: [TypeOrmModule.forFeature([Sugestions]), EventModule, UserModule],
    controllers: [SugestionsController],
    providers: [SugestionsService, InsertImageMapper],
    exports: [SugestionsService]
})
export class SugestionsModule { }