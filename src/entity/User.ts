import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn 
} from "typeorm";

//user_name, user_display_name, user_phone_number, user_email, user_password, user_country)

@Entity
export class User {
  
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column({
    length: 250
  })
  name: string;
  
  @Column({
    length: 255
  })
  userName: string;
  
  @Column()
  phoneNumber: string;
  
  @Column({
    length: 255
  })
  email: string;
  
  @Column()
  password: string;
  
  @Column()
  country: string;
  
}