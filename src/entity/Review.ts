import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    ManyToOne,
    
} from "typeorm";
import { User } from "./User";

@Entity()
export default class Review {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        unique: true
    })
    content!: string

    @ManyToOne(type => User, user => user.id, {
        onUpdate: 'CASCADE', onDelete: 'CASCADE'
    })
    author!: User

    @Column()
    stars!: number;
}

