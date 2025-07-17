import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctors')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('doctor')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get('profile')
  getProfile(@Req() req) {
    return this.doctorsService.getProfile(req.user);
  }

  @Put('profile')
  updateProfile(@Req() req, @Body() dto: UpdateDoctorDto) {
    return this.doctorsService.updateProfile(req.user, dto);
  }

  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }
}
