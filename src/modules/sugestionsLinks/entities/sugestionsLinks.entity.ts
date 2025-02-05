import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SugestionsLinks {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    loja: string;

    @Column()
    url: string;
}