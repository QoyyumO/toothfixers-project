import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  records: import("c:/Users/Ayomide/CSC-2022/toothfixers/toothfixers-backend/src/clinical-record/record/entities/record.entity").Record[];
}
