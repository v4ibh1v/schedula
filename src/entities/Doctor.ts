import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { AvailabilitySlot } from './AvailabilitySlot';
import { Appointment } from './Appointment';
import { User } from './User';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userid: number;

  @Column()
  name: string;

  @Column()
  specialization: string;

  // ✅ Link to User entity
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  // ✅ One-to-many relation to availability slots
  @OneToMany(() => AvailabilitySlot, (slot) => slot.doctor)
  availabilitySlots: AvailabilitySlot[];

  // ✅ One-to-many relation to appointments
  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];
}
