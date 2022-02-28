import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
} from "typeorm";
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
}