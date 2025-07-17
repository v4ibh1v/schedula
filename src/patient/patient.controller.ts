import { Controller, Get, Param, Patch, Body, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { PatientService } from './patient.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('api/patients')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get(':id')
  async getPatient(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  @Patch(':id')
  async updatePatient(
    @Param('id') id: string,
    @Body() updateDto: UpdatePatientDto,
    @Req() req,
  ) {
    if (req.user.id !== id) {
      throw new ForbiddenException('You can only update your own profile');
    }
    return this.patientService.update(id, updateDto);
  }
}
