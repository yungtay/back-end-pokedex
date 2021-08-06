import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Session from './Sessions'
import UserPokemon from './UserPokemon'


@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Session, user => user.id, { cascade: true })
  sessions: Session[]

  @OneToMany(() => UserPokemon, userPokemon => userPokemon.userId, { cascade: true })
  usersPokemons: UserPokemon[]
}
