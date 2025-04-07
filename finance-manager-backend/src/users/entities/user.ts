import { Role } from '../../users/Role';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Entry } from '../../entries/entities/entry.entity'; 
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  //Role of the user
  @Column({
    type: 'enum',
    enum: Role,
    default: [Role.User],
  })
  role: Role;

  //Relation to the categories
  @OneToMany(() => Category, (category) => category.id)
  categories: Category[];

  //Relation to the entries
  @OneToMany(() => Entry, (entry) => entry.id)
  entries: Entry[];
}
