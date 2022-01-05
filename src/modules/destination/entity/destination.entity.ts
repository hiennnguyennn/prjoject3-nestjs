import { Tour } from 'src/modules/tour/entities/tour.entity';
import { User } from 'src/modules/user/entity/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Destination extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'name' })
  name: string;

  @Column({ nullable: false, name: 'description' })
  description: string;

  @Column({ nullable: false, name: 'visa' })
  visa: string;

  @Column({ nullable: false, name: 'country' })
  country: string;

  @Column({ nullable: false, name: 'language' })
  language: string;

  @Column({ nullable: false, name: 'currency' })
  currency: string;

  @Column({ nullable: true, name: 'area', select: false })
  area: number;

  @Column('simple-array', {
    nullable: true,
    name: 'image',
    select: false,
  })
  image: string[];

  @ManyToOne(() => User, (user) => user.destinations)
  creator: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToMany(() => Tour, (tour) => tour.destinations, {
    // cascade: true,
    // eager: true,
  })
  tours: Tour[];

  @ManyToMany(() => Tour, (tour) => tour.fromDestintion, {})
  fromTours: Tour[];
}
