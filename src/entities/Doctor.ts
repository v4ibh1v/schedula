// src/entities/Doctor.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { AvailabilitySlot } from './AvailabilitySlot'; // ✅ Import this

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  specialization: string;

  @Column()
  experience: number;

  @Column({ nullable: true })
  userid: number;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userid' })
  user?: User;

  // ✅ This is what was missing and causing the error
  @OneToMany(() => AvailabilitySlot, (slot) => slot.doctor, { cascade: true })
  availabilitySlots: AvailabilitySlot[];
}
