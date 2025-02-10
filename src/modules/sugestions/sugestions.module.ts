import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sugestions } from "./entities/sugestions.entity";
import { SugestionsController } from "./sugestions.controller";
import { SugestionsService } from "./sugestions.service";
import { EventModule } from "../event/event.module";
import { UserModule } from "../user/user.module";

@Module({
    imports: [TypeOrmModule.forFeature([Sugestions]), EventModule, UserModule],
    controllers: [SugestionsController],
    providers: [SugestionsService],
    exports: [SugestionsService]
})
export class SugestionsModule { }