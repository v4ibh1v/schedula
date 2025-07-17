import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { Doctor } from '../entities/Doctor';
import { User } from '../entities/User'; // in case you're fetching user info in `findAll()`

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, User])],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}
