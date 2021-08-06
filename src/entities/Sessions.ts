import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from './User'

@Entity("sessions")
export default class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
    user: User;

    @Column()
    token: string;
}