import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvailabilitySlot } from '../entities/AvailabilitySlot';
import { CreateSlotDto } from './dto/create-slot.dto';
import { Doctor } from '../entities/Doctor';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(AvailabilitySlot)
    private readonly slotRepo: Repository<AvailabilitySlot>,

    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
  ) {}

  async getSlotsByDoctorId(doctorId: string) {
    const doctor = await this.doctorRepo.findOne({ where: { id: doctorId } });
    if (!doctor) throw new NotFoundException('Doctor not found');

    return this.slotRepo.find({
      where: { doctor: { id: doctorId } },
      relations: ['doctor'],
    });
  }

  async createSlot(doctorId: string, dto: CreateSlotDto) {
    const doctor = await this.doctorRepo.findOne({ where: { id: doctorId } });
    if (!doctor) throw new NotFoundException('Doctor not found');

    const slot = this.slotRepo.create({ ...dto, doctor });
    return this.slotRepo.save(slot);
  }

  async deleteSlot(slotId: string) {
    const slot = await this.slotRepo.findOne({ where: { id: slotId } });
    if (!slot) throw new NotFoundException('Slot not found');

    return this.slotRepo.remove(slot);
  }
}
