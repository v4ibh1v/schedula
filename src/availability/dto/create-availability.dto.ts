// src/availability/dto/create-availability.dto.ts

import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SessionSlotDto {
  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsEnum(['Morning', 'Afternoon', 'Evening'])
  session: 'Morning' | 'Afternoon' | 'Evening';

  @IsOptional()
  maxBookings?: number;
}

export class CreateAvailabilityDto {
  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsString()
  weekday?: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

  @IsNotEmpty()
  @IsEnum(['stream', 'wave'])
  mode: 'stream' | 'wave';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SessionSlotDto)
  sessions: SessionSlotDto[];

  @IsNotEmpty()
  @IsString()
  doctorId: string; // ✅ Add this field
}
