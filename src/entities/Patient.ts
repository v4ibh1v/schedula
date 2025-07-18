import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Appointment } from './Appointment';
import { User } from './User';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  address: string;

  // ✅ Link to User entity (like name, email, etc.)
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  // ✅ Appointments relation
  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];
}
