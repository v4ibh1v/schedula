import { IsString, IsUUID } from 'class-validator';

export class CreateAppointmentDto {
  @IsUUID()
  doctorId: string;

  @IsUUID()
  patientId: string;

  @IsUUID()
  slotId: string;

  @IsString()
  reason: string;
}
