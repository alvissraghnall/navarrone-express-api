import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, EntitySchema, EntitySchemaColumnOptions } from "typeorm";
import {Category} from "./Category";


export interface Post {
  id: number;
  title: string;
  text: string;
  categories: Category[];
}

export const PostEntity = new EntitySchema<Post>({
  name: "posts",
  columns: {
      id: {
          type: Number,
          primary: true,
          generated: true
      },
        title: {
          type: String
        },
        text: {
          type: String
        },
        categories: {
          type: []
        }
  }
})

