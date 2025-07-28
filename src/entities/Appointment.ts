import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Doctor } from './Doctor';
import { Patient } from './Patient';
import { AvailabilitySlot } from './AvailabilitySlot';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reason: string;

  @Column({ default: 'scheduled' })
  status: 'scheduled' | 'cancelled' | 'completed';

  @Column()
  date: Date;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @ManyToOne(() => Doctor, doctor => doctor.appointments, { onDelete: 'CASCADE' })
  doctor: Doctor;

  @ManyToOne(() => Patient, patient => patient.appointments, { onDelete: 'CASCADE' })
  patient: Patient;

  @ManyToOne(() => AvailabilitySlot, slot => slot.appointments, { onDelete: 'CASCADE' })
  slot: AvailabilitySlot;

  
}
