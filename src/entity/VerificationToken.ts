import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { VerificationTokenIntFace } from "../types/VerificationToken.type";
import { User } from "./User";

@Entity()
export class VerificationToken implements VerificationTokenIntFace {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        nullable: false
    })
    token!: string;

    @Column({
        type: "timestamp with time zone",
        nullable: false
    })
    expiresAt!: Date;

    @Column({
        type: "timestamp with time zone",
        nullable: true
    })
    verifiedAt!: Date;

    @OneToOne(type => User, user => user.id)
    user!: User;

}