import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Act {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  img: string;

  @Column()
  src: string;

  @Column('bigint')
  startDate: number;

  @Column('bigint')
  endDate: number;

  @Column()
  actDesc: string;

  @Column()
  actTitle: string;
}
