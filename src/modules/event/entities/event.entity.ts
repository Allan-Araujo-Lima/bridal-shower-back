import { IsOptional } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/modules/user/repository/index.entity";

@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    noivo_a1: string;

    @Column()
    noivo_a2: string;

    @Column({ nullable: true })
    wedding_name: string;

    @Column({ type: 'timestamp' })
    wedding_date: Date;

    @Column({ nullable: true })
    confirm_presence_until: Date;

    @OneToOne(() => User, (user) => user.id)
    @JoinColumn()
    user: User

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
