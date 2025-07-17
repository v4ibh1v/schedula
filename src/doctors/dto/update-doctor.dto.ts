import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateDoctorDto {
  @IsOptional()
  @IsString()
  specialization?: string;

  @IsOptional()
  @IsNumber()
  experience?: number;

  @IsOptional()
  @IsString()
  bio?: string;
}
