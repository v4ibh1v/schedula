import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../entities/Appointment';
import { Doctor } from '../entities/Doctor';
import { Patient } from '../entities/Patient';
import { AvailabilitySlot } from '../entities/AvailabilitySlot';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { RescheduleAppointmentDto } from './dto/reschedule-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,

    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,

    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,

    @InjectRepository(AvailabilitySlot)
    private slotRepo: Repository<AvailabilitySlot>,
  ) {}

  async create(dto: CreateAppointmentDto) {
    const doctor = await this.doctorRepo.findOne({ where: { id: dto.doctorId } });
    const patient = await this.patientRepo.findOne({ where: { id: dto.patientId } });
    const slot = await this.slotRepo.findOne({
      where: { id: dto.slotId },
      relations: ['doctor'],
    });

    if (!doctor || !patient || !slot) {
      throw new NotFoundException('Doctor, Patient, or Slot not found');
    }

    if (slot.mode === 'stream') {
      const existing = await this.appointmentRepo.findOne({ where: { slot } });
      if (existing) throw new ConflictException('Slot already booked');
    }

    if (slot.mode === 'wave') {
      const count = await this.appointmentRepo.count({ where: { slot } });
      if (count >= slot.maxBookings)
        throw new ConflictException('Slot is fully booked');
    }

    const appointment = this.appointmentRepo.create({
      reason: dto.reason,
      doctor,
      patient,
      slot,
      status: 'scheduled',
    });

    return this.appointmentRepo.save(appointment);
  }

  async reschedule(id: string, dto: RescheduleAppointmentDto) {
    const appointment = await this.appointmentRepo.findOne({
      where: { id },
      relations: ['slot'],
    });

    if (!appointment) throw new NotFoundException('Appointment not found');

    const newSlot = await this.slotRepo.findOne({ where: { id: dto.newSlotId } });
    if (!newSlot) throw new NotFoundException('New slot not found');

    appointment.slot = newSlot;
    appointment.status = 'scheduled';
    return this.appointmentRepo.save(appointment);
  }

  async cancel(id: string) {
    const appointment = await this.appointmentRepo.findOne({ where: { id } });
    if (!appointment) throw new NotFoundException('Appointment not found');

    appointment.status = 'cancelled';
    return this.appointmentRepo.save(appointment);
  }

  // ✅ NEW: View appointments by patient
  async getAppointmentsByPatient(patientId: string) {
    return this.appointmentRepo.find({
      where: { patient: { id: patientId } },
      relations: ['doctor', 'slot'],
    });
  }

  // ✅ NEW: View appointments by doctor
  async getAppointmentsByDoctor(doctorId: string) {
    return this.appointmentRepo.find({
      where: { doctor: { id: doctorId } },
      relations: ['patient', 'slot'],
    });
  }
}
