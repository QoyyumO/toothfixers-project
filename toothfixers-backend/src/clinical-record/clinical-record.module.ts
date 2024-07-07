import { Module } from '@nestjs/common';
import { RecordModule } from '../clinical-record/record/record.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordController } from '../clinical-record/record/record.controller';
import { RecordService } from '../clinical-record/record/record.service';
import { Record } from '../clinical-record/record/entities/record.entity';
import {Patient} from '../patients-registration/patient/entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Record, Patient])],
  controllers: [RecordController],
  providers: [RecordService]
})
export class ClinicalRecordModule { }
