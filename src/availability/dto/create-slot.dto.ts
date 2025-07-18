import { IsString, IsIn, IsOptional, IsNumber } from 'class-validator';

export class CreateSlotDto {
  @IsString()
  date: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsIn(['stream', 'wave'])
  mode: 'stream' | 'wave';

  @IsOptional()
  @IsNumber()
  maxBookings?: number;
}
