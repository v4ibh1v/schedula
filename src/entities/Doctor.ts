// src/entities/Doctor.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  specialization: string;

  @Column()
  experience: number;

  // ✅ Add this field explicitly
  @Column()
  userid: number;

  // ✅ Setup relation
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userid' })
  user: User;
}
