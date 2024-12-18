import {
    Column,
    Entity,
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
}