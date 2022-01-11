import { Category } from 'src/modules/admin-category/entities/category.entity';
import { Departure } from 'src/modules/admin-departure/entities/departure.entity';
import { Destination } from 'src/modules/destination/entity/destination.entity';
import { Ticket } from 'src/modules/tour/entities/ticket.entity';
import { Tour } from 'src/modules/tour/entities/tour.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'name' })
  name: string;

  @Column({ nullable: true, name: 'gender' })
  gender: number;

  @Column({ nullable: false, name: 'mail' })
  mail: string;

  @Column({ nullable: true, name: 'phone', select: false })
  phone: string;

  @Column({ nullable: true, name: 'dob', select: false })
  dob: string;

  @Column({ nullable: true, name: 'id_card', select: false })
  id_card: string;

  @Column({ nullable: true, name: 'address', select: false })
  address: string;

  @Column({ nullable: false, name: 'password' })
  password: string;

  @Column({ nullable: false, name: 'role', default: 0 })
  role: number;
  //0:user,1:staff, 2:admin

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ nullable: false, name: 'status', default: 1 })
  status: number;

  @Column({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ nullable: true, name: 'employeeId' })
  employeeId: string;
  @OneToMany(() => Destination, (destination) => destination.creator, {
    cascade: true,
    eager: true,
  })
  destinations: Destination[];

  @OneToMany(() => Tour, (tour) => tour.creator, { cascade: true, eager: true })
  tours: Tour[];

  @OneToMany(() => Departure, (departure) => departure.creator, {
    cascade: true,
    eager: true,
  })
  departures: Departure[];

  @OneToMany(() => Category, (category) => category.creator, {
    cascade: true,
    eager: true,
  })
  category: Category[];

  @OneToMany(() => Ticket, (ticket) => ticket.owner, {
    cascade: true,
    eager: true,
  })
  tickets: Ticket[];
}
