import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from './User'

@Entity("sessions")
export default class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @ManyToOne(() => User, user => user.id)
    user: User;

    @Column()
    token: string;
}