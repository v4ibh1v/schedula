import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AvailabilitySlot } from '../entities/AvailabilitySlot';
import { Doctor } from '../entities/Doctor';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(AvailabilitySlot)
    private readonly slotRepo: Repository<AvailabilitySlot>,

    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
  ) {}

  async createAvailabilitySlot(dto: CreateAvailabilityDto): Promise<AvailabilitySlot[]> {
    const doctor = await this.doctorRepo.findOne({
      where: { id: dto.doctorId },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    if (!dto.date && !dto.weekday) {
      throw new Error('Either date or weekday must be provided');
    }

    // Create multiple slots from dto.sessions[]
    const slots = dto.sessions.map((session) =>
      this.slotRepo.create({
        date: dto.date ?? null,
        weekday: dto.weekday ?? null,
        startTime: session.startTime,
        endTime: session.endTime,
        session: session.session,
        mode: dto.mode,
        maxBookings: session.maxBookings ?? null,
        doctor: doctor,
      }),
    );

    return await this.slotRepo.save(slots);
  }

  async getDoctorSlots(doctorId: string): Promise<AvailabilitySlot[]> {
    return this.slotRepo.find({
      where: {
        doctor: { id: doctorId },
      },
    });
  }
}
