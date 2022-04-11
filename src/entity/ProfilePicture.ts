import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity()
export default class ProfilePicture {

    @PrimaryGeneratedColumn()
    private id!: number;

    @Column()
    private fileName: string;

    @OneToOne(type => User, user => user.id)
    @JoinColumn()
    private user: User;

    constructor (fileName: string, user: User) {
        this.fileName = fileName;
        this.user = user;
    }
}