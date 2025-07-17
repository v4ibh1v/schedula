// src/entities/AvailabilitySlot.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Doctor } from './Doctor';

@Entity()
export class AvailabilitySlot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string; // Format: YYYY-MM-DD

  @Column()
  startTime: string; // Format: HH:mm

  @Column()
  endTime: string; // Format: HH:mm

  @Column()
  mode: 'stream' | 'wave';

  @Column({ nullable: true })
  maxBookings: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.availabilitySlots, {
    onDelete: 'CASCADE',
  })
  doctor: Doctor;
}
