import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, In } from 'typeorm';
import { Appointment } from '../entities/Appointment';
import { Doctor } from '../entities/Doctor';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
  ) {}

  async rescheduleAllFuture(doctorId: string, shiftMinutes: number) {
    this.validateShiftAmount(shiftMinutes);
    const now = new Date();

    const appointments = await this.appointmentRepo.find({
      where: {
        doctor: { id: doctorId },
        date: MoreThanOrEqual(now),
      },
    });

    if (appointments.length === 0) {
      throw new NotFoundException('No future appointments found for this doctor.');
    }

    return this.updateAppointments(appointments, shiftMinutes);
  }

  async rescheduleSelected(
    doctorId: string,
    appointmentIds: number[],
    shiftMinutes: number,
  ) {
    this.validateShiftAmount(shiftMinutes);

    const appointments = await this.appointmentRepo.find({
      where: {
        id: In(appointmentIds),
        doctor: { id: doctorId },
      },
    });

    if (appointments.length !== appointmentIds.length) {
      throw new NotFoundException(
        'Some appointments were not found or do not belong to this doctor.',
      );
    }

    return this.updateAppointments(appointments, shiftMinutes);
  }

  private validateShiftAmount(shiftMinutes: number) {
    if (shiftMinutes < 10 || shiftMinutes > 180) {
      throw new BadRequestException(
        'Shift must be between 10 minutes and 3 hours.',
      );
    }
  }

  private async updateAppointments(
    appointments: Appointment[],
    shiftMinutes: number,
  ) {
    const updated = appointments.map((app) => ({
      ...app,
      date: this.addMinutes(app.date, shiftMinutes),
      startTime: this.addMinutesToTime(app.startTime, shiftMinutes),
      endTime: this.addMinutesToTime(app.endTime, shiftMinutes),
    }));

    return this.appointmentRepo.save(updated);
  }

  private addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }

  private addMinutesToTime(timeString: string, minutes: number): string {
    const [hours, mins] = timeString.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMins = totalMinutes % 60;
    return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`;
  }
}
