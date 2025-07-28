import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Doctor } from './Doctor';
import { Appointment } from './Appointment'; // ✅ Add this import

@Entity()
export class AvailabilitySlot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  date: string;

  @Column({ nullable: true })
  weekday:
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday';

  @Column()
  session: 'Morning' | 'Afternoon' | 'Evening';

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column()
  mode: 'stream' | 'wave';

  @Column({ nullable: true })
  maxBookings: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.availabilitySlots, {
    onDelete: 'CASCADE',
  })
  doctor: Doctor;

  // ✅ Add this to fix the error
  @OneToMany(() => Appointment, (appointment) => appointment.slot, { cascade: true })
  appointments: Appointment[];
}
