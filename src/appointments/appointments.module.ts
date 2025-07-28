import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Appointment } from '../entities/Appointment';
import { Doctor } from '../entities/Doctor';
import { Patient } from '../entities/Patient';
import { AvailabilitySlot } from '../entities/AvailabilitySlot';

import { AppointmentService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Doctor, Patient, AvailabilitySlot])],
  controllers: [AppointmentsController],
  providers: [AppointmentService],
})
export class AppointmentsModule {}
