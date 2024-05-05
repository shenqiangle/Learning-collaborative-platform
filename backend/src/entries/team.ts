import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from './user';
import { Task } from './task';
import { Resource } from './resource';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  teamAvatar: string;

  @Column()
  teamName: string;

  @Column()
  theme: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  memberAddable: boolean;

  @ManyToOne(() => User, (User) => User.leadTeams)
  leader: User;

  /**
   * 队员
   */
  @ManyToMany(() => User, (User) => User.joiningTeams, { cascade: true })
  @JoinTable()
  members?: User[];

  /**
   * 请求加入的user
   */
  @ManyToMany(() => User, (User) => User.requestTeams, { cascade: true })
  @JoinTable()
  requests?: User[];

  @OneToMany(() => Task, (task) => task.team)
  taskList?: Task[];

  @OneToMany(() => Resource, (resource) => resource.team)
  resources: Resource[];
}
