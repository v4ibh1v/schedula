import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { AvailabilitySlot } from './AvailabilitySlot';
import { Appointment } from './Appointment'; // ✅ Import added

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  specialization: string;

  @Column()
  experience: number;

  @Column({ nullable: true })
  userid: number;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userid' })
  user?: User;

  @OneToMany(() => AvailabilitySlot, (slot) => slot.doctor, { cascade: true })
  availabilitySlots: AvailabilitySlot[];

  // ✅ Add this to fix the error
  @OneToMany(() => Appointment, (appointment) => appointment.doctor, { cascade: true })
  appointments: Appointment[];
}
