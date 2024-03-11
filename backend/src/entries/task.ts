/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user';
import { Team } from './team';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  taskName: string;

  @Column({ nullable: true })
  taskDescription?: string;

  @Column({ default: false })
  isCompleted?: boolean;

  @Column({
    type: 'date',
    transformer: {
      to: (value: string) => {
        return value ? new Date(value).toISOString().split('T')[0] : null;
      },
      from: (value: string) => value ? new Date(value) : null, // 如果value为undefined，返回null
    },
    nullable: true
  })
  completeDay?: Date;

  @ManyToOne(() => User, (user) => user.taskList)
  performer: User;

  @ManyToOne(() => Team, (team) => team.taskList)
  team: Team;
  
}
