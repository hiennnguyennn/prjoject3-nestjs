import { Departure } from 'src/modules/admin-departure/entities/departure.entity';
import { User } from 'src/modules/user/entity/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'rate' })
  rate: number;

  @Column({ nullable: true, name: 'message', select: false })
  message: string;

  @OneToOne(() => Ticket, (ticket) => ticket.review)
  @JoinColumn()
  ticket: Ticket;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
