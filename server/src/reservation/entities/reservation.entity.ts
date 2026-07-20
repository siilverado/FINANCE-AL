import { SportField } from 'src/sportfields/entities/sportfield.entity';
import User from 'src/users/entities/user.entity';
import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'reservation' })
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  @Check('hour >= 0')
  @Check('hour < 24')
  hour: number;

  @Column('date')
  date: Date;

  @ManyToOne(() => SportField, (sportfields) => sportfields.reservation, {
    onDelete: 'CASCADE',
  })
  sportfield: SportField;

  @ManyToOne(() => User, (user) => user.reservation)
  @JoinColumn({ name: 'userId' })
  user: User;
}
