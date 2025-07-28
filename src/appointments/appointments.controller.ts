import { Controller, Patch, Body } from '@nestjs/common';
import { AppointmentService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentService) {}

  @Patch('reschedule-all')
  rescheduleAll(@Body() body: { doctorId: string; shiftMinutes: number }) {
    return this.appointmentsService.rescheduleAllFuture(body.doctorId, body.shiftMinutes);
  }

  @Patch('reschedule-selected')
  rescheduleSelected(
    @Body() body: { doctorId: string; appointmentIds: number[]; shiftMinutes: number },
  ) {
    return this.appointmentsService.rescheduleSelected(
      body.doctorId,
      body.appointmentIds,
      body.shiftMinutes,
    );
  }
}
