import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity()
export class Plan {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  planName: string;

  @Column({ default: false })
  isCompleted?: boolean;

  @Column({
    type: 'date',
    transformer: {
      to: (value: string) => {
        const dateValue = new Date(value);
        return dateValue ? dateValue.toISOString().split('T')[0] : null;
      },
      from: (value: string) => (value ? new Date(value) : null), // 如果value为undefined，返回null
    },
  })
  planDay: Date;

  @Column({ default: false })
  isImportant?: boolean;

  // Many plans belong to one user
  @ManyToOne(() => User, (user) => user.planList)
  user: User;
}
