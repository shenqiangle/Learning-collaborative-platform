import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Team } from './team';
import { User } from './user';

@Entity()
export class Resource {
  @PrimaryColumn()
  src: string;

  @Column()
  name: string;

  @Column()
  fileType: string;

  @Column({ nullable: true })
  fileDesc: string;

  // 反向关系，一个 Resource 属于多个 Team
  @ManyToOne(() => Team, (team) => team.resources)
  teams: Team[];

  // 反向关系，一个 Resource 属于多个 User
  @ManyToOne(() => User, (user) => user.resources)
  users: User[];
}
