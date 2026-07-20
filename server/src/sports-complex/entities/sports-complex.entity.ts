import Owner from 'src/owner/entities/owner.entity';
import { SportField } from 'src/sportfields/entities/sportfield.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AvailabilityRange } from './availability-range.entity';

@Entity('sportsComplex')
export class SportsComplex {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text', {
    unique: true,
  })
  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text')
  address: string;

  @Column('text')
  phone: string;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ type: 'double precision', nullable: true })
  lat: number;

  @Column({ type: 'double precision', nullable: true })
  lng: number;

  @Column('text', { nullable: true })
  images: string[];

  @Column('boolean', { default: false })
  grills?: boolean;
  @Column('boolean', { default: false })
  locker?: boolean;
  @Column('boolean', { default: false })
  showers?: boolean;
  @Column('boolean', { default: false })
  bathrooms?: boolean;
  @Column('boolean', { default: false })
  restobar?: boolean;
  @Column('boolean', { default: false })
  parking?: boolean;

  @ManyToOne(() => Owner, (owner) => owner.sportsComplex, {
    eager: true,
  })
  @JoinColumn({ name: 'ownerId' })
  owner: Owner;

  @OneToMany((type) => SportField, (sportfields) => sportfields.sportsComplex)
  sportfields: SportField[];

  @OneToMany(() => AvailabilityRange, (availabilityRanges) => availabilityRanges.sportsComplex, {
    eager: true,
    cascade: true,
  })
  availability: AvailabilityRange[];
}
export default SportsComplex;
