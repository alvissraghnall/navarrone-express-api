import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export default class LoginTries {

    @PrimaryGeneratedColumn()
    private id!: number;

    @Column()
    private times!: number;

    @OneToOne(type => User, user => user.id)
    private user!: User;
}