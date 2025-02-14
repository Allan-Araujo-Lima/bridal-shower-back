import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { Table } from './entities/table.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from '../event/event.module';

@Module({
  imports: [TypeOrmModule.forFeature([Table]), EventModule],
  controllers: [TablesController],
  providers: [TablesService],
  exports: [TablesModule]
})
export class TablesModule { }
