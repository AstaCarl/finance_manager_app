import { UserEntity } from '../../../src/users/entities/user';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Category } from '../../../src/categories/entities/category.entity';

@Entity()
export class Entry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  date: Date;

  //Relation to the user
  @ManyToOne(() => Category, (category) => category.entries, { onDelete: 'CASCADE', eager: true })
  category: Category;

  //Relation to the user
  @ManyToOne(() => UserEntity, (user) => user.entries, { onDelete: 'CASCADE' })
  user: UserEntity;
}
