import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import SportsComplex from './sports-complex.entity';

@Entity('availabilityRange')
export class AvailabilityRange {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int8')
  @Check('start_hour >= 0 AND start_hour <= 23')
  start_hour: number;

  @Column('int8')
  @Check('end_hour <= 24 AND end_hour >= 1')
  end_hour: number;

  @ManyToOne(() => SportsComplex, (sportsComplex) => sportsComplex.availability, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'sportsComplexId' })
  sportsComplex: SportsComplex;
}
