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

    @Column()
    // @ManyToOne( )
    author!: string

    @Column()
    stars!: number;
}

