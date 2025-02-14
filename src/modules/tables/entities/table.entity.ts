import { Event } from "src/modules/event/entities/event.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Table {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Event, (event) => event.tables, { onDelete: 'CASCADE' })
    event: Event;
}
