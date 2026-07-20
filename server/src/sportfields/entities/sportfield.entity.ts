import { Expose, Transform } from 'class-transformer';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Sport } from 'src/sports/entities/sport.entity';
import { SportsComplex } from 'src/sports-complex/entities/sports-complex.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sportfields' })
export class SportField {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  dimensions: string;

  @Column('text', {
    array: true,
    default: ['https://img.freepik.com/free-vector/sport-fields-isometric-set_1284-24824.jpg'],
  })
  images: string[];

  //Relation SportField -> sports
  @ManyToOne(
    () => Sport,
    (sport) => sport.sportfields,

    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'sportId' })
  sport: Sport;

  //Relation SportField -> sportsComplex
  // TODO: It shouldn't be null
  @ManyToOne(() => SportsComplex, (sportsComplex) => sportsComplex.sportfields, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'sportComplexId' })
  sportsComplex: SportsComplex;

  @OneToMany(() => Reservation, (reservation) => reservation.sportfields, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  reservation: Reservation[];
}
