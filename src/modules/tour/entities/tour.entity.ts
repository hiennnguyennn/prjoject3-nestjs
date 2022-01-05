import { Category } from 'src/modules/admin-category/entities/category.entity';
import { Departure } from 'src/modules/admin-departure/entities/departure.entity';
import { Destination } from 'src/modules/destination/entity/destination.entity';
import { User } from 'src/modules/user/entity/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Plan } from './plan.enity';

@Entity()
export class Tour extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'name' })
  name: string;

  @Column({ nullable: false, name: 'description' })
  description: string;

  @Column({ nullable: false, name: 'count' })
  price: string;

  @Column({ nullable: true, name: 'minAge' })
  minAge: number;

  @Column({ nullable: false, name: 'days' })
  days: number;

  @Column({ nullable: false, name: 'departureAddr' })
  departureAddr: string;

  @Column({ nullable: true, name: 'timeStart', select: false })
  timeStart: string;

  @Column({ nullable: true, name: 'timeReturn', select: false })
  timeReturn: string;

  @Column({ nullable: true, name: 'dresscode', select: false })
  dresscode: string;

  @Column({ nullable: true, name: 'included', select: false })
  included: string;

  @Column({ nullable: true, name: 'notIncluded', select: false })
  notIncluded: string;

  @Column({ nullable: true, name: 'status', select: false })
  status: number;
  //0:hide, 1: display

  @Column('simple-array', {
    nullable: true,
    name: 'image',
    select: false,
  })
  image: string[];

  @ManyToOne(() => User, (user) => user.tours)
  creator: User;

  @ManyToOne(() => Destination, (destination) => destination.fromTours, {
    onDelete: 'CASCADE',
  })
  fromDestintion: Destination[];

  @ManyToMany(() => Destination, (destination) => destination.tours, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  destinations: Destination[];

  @ManyToMany(() => Category, (category) => category.tours, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Departure, (departure) => departure.tour, {
    cascade: true,
    eager: true,
  })
  departures: Departure[];

  @OneToMany(() => Plan, (plan) => plan.tour, {
    cascade: true,
    eager: true,
  })
  plans: Plan[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  @Column({ nullable: true, name: 'is_hot', select: false, default: 0 })
  isHot: number;
}
