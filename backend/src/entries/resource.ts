import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Team } from './team';
import { User } from './user';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  src: string;

  @Column()
  name: string;

  @Column()
  fileType: string;

  @Column({ nullable: true })
  fileDesc: string;

  // 反向关系，一个 Resource 属于多个 Team
  @ManyToOne(() => Team, (team) => team.resources, { cascade: true })
  team: Team;

  // 反向关系，一个 Resource 属于多个 User
  @ManyToOne(() => User, (user) => user.resources, { cascade: true })
  user: User;
}
