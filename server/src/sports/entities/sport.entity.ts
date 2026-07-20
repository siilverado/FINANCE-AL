import { SportField } from 'src/sportfields/entities/sportfield.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sports' })
export class Sport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;
  @Column('text', {
    array: true,
    default: ['https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?w=2000'],
  })
  images: string[];

  // Relation -> sportsfields
  // TODO: Is this really necessary?
  @OneToMany(() => SportField, (sportfields) => sportfields.sport, {
    cascade: true,
  })
  sportfields?: SportField[];

  @Column('text', { array: true, default: [] })
  types: string[];
}
