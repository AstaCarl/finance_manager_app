import { Entry } from '../../../src/entries/entities/entry.entity';
import { UserEntity } from '../../../src/users/entities/user';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Entry, (entry) => entry.category, {cascade: true, onDelete: 'CASCADE'})
  entries: Entry[];

  @ManyToOne(() => UserEntity, (user) => user.categories, { onDelete: 'CASCADE' })
  user: UserEntity;
}


