// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            port: Number(process.env.PGPORT),
            host: String(process.env.PGHOST),
            username: String(process.env.PGUSER),
            password: String(process.env.PGPASSWORD),
            database: String(process.env.PGDATABASE),
            synchronize: true,
            ssl: true,
            extra: {
                sslmode: 'require',
            },
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
        }),
    ],
    controllers: [],
    providers: [],
})
export class DatabaseModule { }