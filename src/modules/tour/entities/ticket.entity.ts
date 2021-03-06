import { Departure } from 'src/modules/admin-departure/entities/departure.entity';
import { User } from 'src/modules/user/entity/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from './review.entity';

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'status' })
  status: number;
  //0:booking but not confirm, 1: confirm and not use yet, 2: using, 3:used and not review,4:used and review, 5:cancel

  @Column({ nullable: false, name: 'number' })
  number: number;

  @Column({ nullable: true, name: 'message', select: false })
  message: string;

  @ManyToOne(() => User, (user) => user.tickets)
  owner: User;

  @ManyToOne(() => Departure, (departure) => departure.tickets, {
    onDelete: 'CASCADE',
  })
  departure: Departure;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @OneToOne(() => Review, (review) => review.ticket)
  review: Review;

  @Column({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
