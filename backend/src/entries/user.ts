import { Entity, Column, PrimaryColumn, ManyToMany, OneToMany } from 'typeorm';
import { Team } from './team';
import { Task } from './task';
import { Plan } from './plan';
import { Resource } from './resource';
/**
 * user
 */
@Entity()
export class User {
  @PrimaryColumn()
  userName: string;

  @Column()
  password: string;

  @Column()
  nickName: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  major: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  university: string;

  @Column({ nullable: true })
  personalDescription: string;

  @Column({ nullable: true })
  phone: string;

  @OneToMany(() => Team, (Team) => Team.leader)
  leadTeams?: Team[];

  /**
   * 加入的队伍
   */
  @ManyToMany(() => Team, (Team) => Team.members)
  joiningTeams?: Team[];

  @ManyToMany(() => Team, (Team) => Team.requests)
  requestTeams?: Team[];

  @OneToMany(() => Task, (Task) => Task.performer)
  taskList?: Task[];

  @OneToMany(() => Plan, (plan) => plan.user, { cascade: true })
  planList?: Plan[];

  @OneToMany(() => Resource, (resource) => resource.users)
  resources: Resource[];
}
