import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany
} from "typeorm";
import { User as UserAble } from "../types/User.type";
import Transaction from "./Transaction";
  
//user_name, user_display_name, user_phone_number, user_email, user_password, user_country)


@Entity()
export class User implements UserAble {
  
  @PrimaryGeneratedColumn("uuid")
  id?: string;
  
  @Column({
    type: "varchar",
    length: 500
  })
  name?: string;
  
  @Column({
    type: "varchar",
    length: 255
  })
  userName?: string;
  
  @Column({
    type: "varchar",
    length: 255
  })
  phoneNumber?: string;
  
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
  country?: string;
  
  @Column({ default: false })
  isVerified?: boolean;
  
  @Column({
    nullable: true,
    unique: true
  })
  uniqueString?: string

  // @Column({
  //   type: "boolean",
  //   nullable: false
  // })
  // isAccountLocked?: boolean;

  @OneToMany(type => Transaction, transactions => transactions.user, {
    onUpdate: 'CASCADE', onDelete: 'CASCADE'
  })
  transactions?: Transaction[];
  
  /**
  @BeforeInsert()
  hashPassword() {
    /*
    console.log("in hash pwd fn");
    await new Promise((resolve, reject) => {
      const salt = randomBytes(16).toString("hex");
      console.log(salt);
      scrypt(this.password, salt, 64, (err, derivedKey) => {
        console.log(this.password);
        err ? reject(err) : resolve(this.password = salt + ":" + derivedKey.toString("hex"));
      });
    });
    *//*
    this.password = "jesus walks!"
    return this.password;
  }
  */
  
}