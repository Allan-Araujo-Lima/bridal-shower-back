import { SugestionsLinks } from "src/modules/sugestionsLinks/entities/sugestionsLinks.entity";
import { User } from "src/modules/user/repository/index.entity";
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

    @ManyToOne(() => User, (user) => user.id, { cascade: true })
    user: User

    @OneToMany(() => SugestionsLinks, (sugestionsLinks) => sugestionsLinks.id, { cascade: true })
    urls: SugestionsLinks
}