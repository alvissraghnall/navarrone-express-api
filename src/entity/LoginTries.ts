import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export default class LoginTries {

    @PrimaryGeneratedColumn()
    private id!: number;

    @Column()
    times!: number;

    @OneToOne(type => User, user => user.id)
    user!: User;

    constructor(_user: User) {
        this.times = 1;
        this.user = _user;
    }

    /**
     * getTimes 
     */
    // public getTimes (): number {
    //     return this.times;
    // }

    // public getUser (): User {
    //     return this.user;
    // }

    // /**
    //  * setUser
    //  */
    // public setUser(_user: User): void {
    //     this.user = _user;
    // }

    // public setTimes(times: number): void {
    //     this.times = times;
    // }
    
}