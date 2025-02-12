import { Sugestions } from "src/modules/sugestions/entities/sugestions.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SugestionsLinks {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    url: string;

    @ManyToOne(() => Sugestions, (sugestions) => sugestions.urls, { onDelete: 'CASCADE', })
    suggestion: Sugestions;
}