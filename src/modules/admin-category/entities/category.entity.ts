import { Tour } from 'src/modules/tour/entities/tour.entity';
import { User } from 'src/modules/user/entity/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'name' })
  name: string;

  @ManyToMany(() => Tour, (tour) => tour.categories)
  tours: Tour[];

  @ManyToOne(() => User, (user) => user.category, { onDelete: 'CASCADE' })
  creator: User;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
