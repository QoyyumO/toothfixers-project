import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../../patients-registration/patient/entities/patient.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Record } from './entities/record.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private recordRepository: Repository<Record>,

    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>
  ) { }

  async create(createRecordDto: CreateRecordDto): Promise<Record> {
    const newRecord = this.recordRepository.create(createRecordDto);
    
    if (createRecordDto.patientId) {
      const patient = await this.patientRepository.findOne({ where: { id: createRecordDto.patientId } });
      if (!patient) {
        throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
      }
      newRecord.patient = patient;
    }
    
    return this.recordRepository.save(newRecord);
  }
  async getAllPatients(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  async findAll(): Promise<Record[]> {
    return this.recordRepository.find({ relations: ['patient'] });
  }

  async findOne(id: number): Promise<Record> {
    return this.recordRepository.findOne({ where: { id }, relations: ['patient'] });
  }

  async update(id: number, updateRecordDto: UpdateRecordDto): Promise<Record> {
    const record = await this.recordRepository.findOne({ where: { id: id } });
    if (!record) {
      throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
    }
  
    // Update record properties
    if (updateRecordDto.clinicDate) {
      record.clinicDate = updateRecordDto.clinicDate;
    }
    if (updateRecordDto.dateOfNextAppointment) {
      record.dateOfNextAppointment = updateRecordDto.dateOfNextAppointment;
    }
    if (updateRecordDto.medicinePrescribed) {
      record.medicinePrescribed = updateRecordDto.medicinePrescribed;
    }
    if (updateRecordDto.natureOfAilment) {
      record.natureOfAilment = updateRecordDto.natureOfAilment;
    }
    if (updateRecordDto.procedureUndertaken) {
      record.procedureUndertaken = updateRecordDto.procedureUndertaken;
    }
    // Update other fields as needed
  
    // If updating patient ID
    if (updateRecordDto.patientId) {
      const patient = await this.patientRepository.findOne({ where: { id: updateRecordDto.patientId } });
      if (!patient) {
        throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
      }
      record.patient = patient;
    }
  
    await this.recordRepository.save(record);
    return record;
  }

  async remove(id: number): Promise<void> {
    const record = await this.recordRepository.findOne({ where: { id } });
    if (!record) {
      throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
    }
    await this.recordRepository.remove(record);
  }

  async setPatientById(recordId: number, patientId: number): Promise<void> {
    const record = await this.recordRepository.findOne({ where: { id: recordId } });
    if (!record) {
      throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
    }
  
    const patient = await this.patientRepository.findOne({ where: { id: patientId } });
    if (!patient) {
      throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
    }
  
    record.patient = patient;
    await this.recordRepository.save(record);
  }
  

  async unsetPatientById(recordId: number): Promise<void> {
    const record = await this.recordRepository.findOne({ where: { id: recordId } });
    if (!record) {
      throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
    }
    
    record.patient = null;
    await this.recordRepository.save(record);
  }
}