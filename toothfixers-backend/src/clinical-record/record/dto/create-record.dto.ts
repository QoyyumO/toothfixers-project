import { IsDate, IsString, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRecordDto {
  @IsDate()
  @Type(() => Date)
  clinicDate: Date;

  @IsString()
  natureOfAilment: string;

  @IsString()
  @IsOptional()
  medicinePrescribed: string;

  @IsString()
  procedureUndertaken: string;

  @IsDate()
  @Type(() => Date)
  dateOfNextAppointment: Date;

  @IsNumber()
  patientId: number;
}
