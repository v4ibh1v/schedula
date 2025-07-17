import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid') // ✅ Force UUID generation
  id!: string;

  @Column()
  name!: string;
}
