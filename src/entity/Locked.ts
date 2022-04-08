import { type } from "os";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity()
export default class Locked {

    @PrimaryGeneratedColumn()
    private id!: number;

    @OneToOne(type => User, user => user.id)
    private user!: User;

    @Column()
    private tries!: number
}