import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { AuthModule } from './auth/auth.module';
import { DoctorsModule } from './doctors/doctors.module';
import { PatientModule } from './patient/patient.module';
import { AvailabilityModule } from './availability/availability.module';
import { AppointmentsModule } from './appointments/appointments.module';

// Entities
import { User } from './entities/User';
import { Doctor } from './entities/Doctor';
import { Patient } from './entities/Patient';
import { AvailabilitySlot } from './entities/AvailabilitySlot';
import { Appointment } from './entities/Appointment';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Doctor, Patient, AvailabilitySlot, Appointment],
      synchronize: true,
    }),
    AuthModule,
    DoctorsModule,
    PatientModule,
    AvailabilityModule,
    AppointmentsModule,
  ],
})
export class AppModule {}
