import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn 
} from "typeorm";
import { User as UserAble } from "../types/User.type";
  
//user_name, user_display_name, user_phone_number, user_email, user_password, user_country)


@Entity()
export class User implements UserAble {
  
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  
  @Column({
    type: "varchar",
    length: 255
  })
  name!: string;
  
  @Column({
    type: "varchar",
    length: 255
  })
  userName!: string;
  
  @Column({
    type: "varchar",
    length: 255
  })
  phoneNumber!: string;
  
  @Column({
    length: 255,
    type: "varchar"
  })
  email!: string;
  
  @Column({
    type: "varchar",
    length: 255
  })
  password!: string;
  
  @Column("varchar")
  country!: string;
  
}