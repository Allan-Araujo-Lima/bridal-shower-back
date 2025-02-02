import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sugestions } from "./repository/sugestions.entity";
import { SugestionsController } from "./sugestions.controller";
import { SugestionsService } from "./sugestions.service";
import { UserModule } from "../user/user.module";

@Module({
    imports: [TypeOrmModule.forFeature([Sugestions]), UserModule],
    controllers: [SugestionsController],
    providers: [SugestionsService],
    exports: [SugestionsService]
})
export class SugestionsModule { }