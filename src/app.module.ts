import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { AuthModule } from './auth/auth.module';
import { DoctorsModule } from './doctors/doctors.module';
import { PatientModule } from './patient/patient.module'; // ✅ Make sure file exists

// Entities
import { User } from './entities/User';
import { Doctor } from './entities/Doctor';
import { Patient } from './entities/Patient'; // ✅ Ensure entity is exported

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
      entities: [User, Doctor, Patient], // ✅ Register entities
      synchronize: true, // ❗ Use only in dev
    }),
    AuthModule,
    DoctorsModule,
    PatientModule, // ✅ Register module
  ],
})
export class AppModule {}

