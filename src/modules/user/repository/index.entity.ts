import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    static is_active: boolean;
    static save(user: never) {
        throw new Error('Method not implemented.');
    }
    static findOne(arg0: { where: { email: string; }; }) {
        throw new Error('Method not implemented.');
    }
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    last_name: string;

    @Column({
        select: false
    })
    password: string;

    @Column({
        default: false
    })
    is_active: boolean;

    @Column({ type: 'timestamp', default: '2025-01-01 17:37:15.589091' })
    expiration_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}