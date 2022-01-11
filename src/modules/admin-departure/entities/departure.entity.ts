import { Ticket } from 'src/modules/tour/entities/ticket.entity';
import { Tour } from 'src/modules/tour/entities/tour.entity';
import { User } from 'src/modules/user/entity/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Departure extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'max' })
  max: number; //

  @Column({ nullable: false, name: 'status' })
  status: number; //0:disable, 1: pending,2: on going, 3: done

  @Column({ nullable: false, name: 'start' })
  start: Date; //

  @Column({ nullable: false, name: 'end' })
  end: Date;

  // @Column({ nullable: true, name: 'hotel' })
  // hotel: string;

  @Column({ nullable: true, name: 'flight_departure' })
  flightDeparture: string;

  @Column({ nullable: true, name: 'flight_return' })
  flightReturn: string;

  @Column({ nullable: true, name: 'flight_time_departure' })
  flightTimeDeparture: Date;

  @Column({ nullable: true, name: 'flight_time_return' })
  flightTimeReturn: Date;

  @Column({ nullable: true, name: 'flight_duration_departure' })
  flightDurationDeparture: string;

  @Column({ nullable: true, name: 'flight_duration_return' })
  flightDurationReturn: string;

  @ManyToOne(() => User, (user) => user.departures)
  creator: User;

  @ManyToOne(() => Tour, (tour) => tour.departures, {
    onDelete: 'CASCADE',
  })
  tour: Tour; //

  @OneToMany(() => Ticket, (ticket) => ticket.departure, {
    onDelete: 'CASCADE',
  })
  tickets: Ticket[]; //

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
