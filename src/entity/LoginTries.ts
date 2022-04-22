import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export default class LoginTries {

    @PrimaryGeneratedColumn()
    private id!: number;

    @Column()
    times!: number;

    @OneToOne(type => User, user => user.id)
    @JoinColumn()
    user!: User;

    @CreateDateColumn({
        type: 'timestamp with time zone',
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    createdAt?: Date;

    @UpdateDateColumn({
        type: 'timestamp with time zone',
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    updatedAt?: Date;

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