import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../entities/Doctor';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
  ) {}

  async getProfile(user: any) {
    console.log('🔐 Logged-in user:', user);

    const doctor = await this.doctorRepo.findOne({
      where: { userid: user.userid }, // ✅ type-safe
      relations: ['user'],
    });

    if (!doctor) {
      throw new NotFoundException('Doctor profile not found');
    }

    return doctor;
  }

  async updateProfile(user: any, dto: UpdateDoctorDto) {
    console.log('🔐 Updating profile for user:', user);
    const doctor = await this.getProfile(user);
    Object.assign(doctor, dto);
    return this.doctorRepo.save(doctor);
  }

  async findAll() {
    return this.doctorRepo.find({ relations: ['user'] });
  }
}
