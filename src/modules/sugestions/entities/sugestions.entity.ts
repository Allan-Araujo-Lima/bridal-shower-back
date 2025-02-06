import { SugestionsLinks } from "src/modules/sugestionsLinks/entities/sugestionsLinks.entity";
import { Event } from "src/modules/event/entities/event.entity";
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm"

@Entity()
export class Sugestions {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    category: string;

    @Column({ nullable: true })
    guest: string;

    @ManyToOne(() => Event, (event) => event.suggestions)
    event: Event;

    @OneToMany(() => SugestionsLinks, (sugestionsLink) => sugestionsLink.suggestion, { nullable: true })
    urls: SugestionsLinks[];
}