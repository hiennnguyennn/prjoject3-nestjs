import { Departure } from 'src/modules/admin-departure/entities/departure.entity';
import { User } from 'src/modules/user/entity/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'rate' })
  rate: number;

  @Column({ nullable: true, name: 'messge', select: false })
  message: string;

  @ManyToOne(() => User, (user) => user.tickets)
  owner: User;

  @ManyToOne(() => Departure, (departure) => departure.tickets, {
    onDelete: 'CASCADE',
  })
  departure: Departure;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
