import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Doctor } from './Doctor';
import { Appointment } from './Appointment';

@Entity()
export class AvailabilitySlot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column()
  mode: 'stream' | 'wave';

  @Column({ nullable: true })
  maxBookings: number;

  @ManyToOne(() => Doctor, doctor => doctor.availabilitySlots, { onDelete: 'CASCADE' })
  doctor: Doctor;

  @OneToMany(() => Appointment, appointment => appointment.slot)
appointments: Appointment[];
}
