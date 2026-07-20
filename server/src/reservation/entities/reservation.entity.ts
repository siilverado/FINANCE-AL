import { SportField } from 'src/sportfields/entities/sportfield.entity';
import User from 'src/users/entities/user.entity';
import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'reservation' })
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  @Check('start_time < end_time')
  @Check('start_time >= 0')
  @Check('start_time < 24')
  start_time: number;

  @Column('int')
  @Check('end_time > 0')
  @Check('end_time < 24')
  @Check('end_time < start_time')
  end_time: number;

  @Column('int')
  day: number;

  @Column('int')
  mounth: number;

  @Column('int')
  year: number;

  @Column('date')
  date: Date;

  @ManyToOne(() => SportField, (sportfields) => sportfields.reservation)
  @JoinColumn({ name: 'sportfieldId' })
  sportfields: SportField;

  @ManyToOne(() => User, (user) => user.reservation)
  @JoinColumn({ name: 'userId' })
  user: User;
}
