import { IsOptional } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/modules/user/repository/index.entity";

@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    noivo_a1: string;

    @Column({ nullable: true })
    noivo_a2: string;

    @Column({ nullable: true })
    event_name: string;

    @Column()
    event_type: string;

    @Column({ type: 'timestamp' })
    event_date: Date;

    @Column({ nullable: true })
    confirm_presence_until: Date;

    @Column({ type: "integer" })
    invites: Number;

    @Column({ nullable: true })
    address: string;

    @ManyToOne(() => User, (user) => user.events)
    user: User

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
