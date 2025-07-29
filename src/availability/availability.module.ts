// src/availability/availability.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';

import { AvailabilitySlot } from '../entities/AvailabilitySlot';
import { Doctor } from '../entities/Doctor'; // ✅ Also needed if injecting DoctorRepository

@Module({
  imports: [TypeOrmModule.forFeature([AvailabilitySlot, Doctor])],
  controllers: [AvailabilityController],
  providers: [AvailabilityService],
  exports: [AvailabilityService], // Optional: if used in other modules
})
export class AvailabilityModule {}
