import { SportsComplex } from 'src/sports-complex/entities/sports-complex.entity';
import User from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('owner')
export class Owner {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text', {
    unique: true,
  })
  DNI: string;
  @Column('text')
  address: string;
  @Column('text')
  phone: string;

  @OneToMany(() => SportsComplex, (sportsComplex) => sportsComplex.owner)
  sportsComplex: SportsComplex[];

  @OneToOne(() => User, (user) => user.owner, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;
  @Column()
  userId: string;
}
export default Owner;
