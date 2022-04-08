import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
// import { User as UserAble } from "../types/User.type";
  
@Entity()
export default class Transaction {
  
  @PrimaryGeneratedColumn()
  id!: number;
  
  //column for foreign key (user.id) +++ column name: user 
  
  @Column()
  kind!: "deposit" | "withdrawal";
  
  @Column()
  amount!: number;

  @ManyToOne(type => User, user => user.id, {
    onUpdate: 'CASCADE', onDelete: 'CASCADE'
  })
  user!: User;

  @Column({
    default: "USD"
  })
  currency!: string;
}