import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tour } from './tour.entity';

@Entity()
export class Plan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'title' })
  title: string;

  @Column({ nullable: false, name: 'description' })
  description: string;

  @Column({ nullable: true, name: 'included', select: false })
  included: string;

  @Column({ nullable: true, name: 'notIncluded', select: false })
  notIncluded: string;

  @ManyToOne(() => Tour, (tour) => tour.plans)
  tour: Tour;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
