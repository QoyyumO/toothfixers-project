import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const newPatient: Patient = this.patientRepository.create(createPatientDto);
    const patientData = await this.patientRepository.save(newPatient);
    return patientData;
  }

  async findAll() {
    return await this.patientRepository.find();
  }

  async findOne(id: number) {
    return await this.patientRepository.findOne({
      where: { id },
      relations: ['records'],
    });
  }

async update(id: number, updatePatientDto: UpdatePatientDto) {
  const patient = await this.patientRepository.findOne({ where: { id: id } });
  if (!patient) {
    throw new NotFoundException(`Patient with ID ${id} not found`);
  }

  // Update patient properties
  patient.firstName = updatePatientDto.firstName;
  patient.lastName = updatePatientDto.lastName;
  patient.middleName = updatePatientDto.middleName;
  patient.dateOfBirth= updatePatientDto.dateOfBirth;
  patient.homeAddress =updatePatientDto.homeAddress;
  patient.dateOfRegistration= updatePatientDto.dateOfRegistration;
  // Update other properties as needed

  // Example: Update records (assuming updatePatientDto has 'records' property)
  patient.records = updatePatientDto.records;

  try {
    await this.patientRepository.save(patient);
    return patient;
  } catch (error) {
    throw new Error(`Failed to update patient with ID ${id}: ${error.message}`);
  }
}


  async remove(id: number) {
    await this.patientRepository.delete(id);
  }

  async loadPatientRecords(patientId: number) {
    try {
      const patient = await this.patientRepository.findOne({
        where: { id: patientId },
        relations: ['records'],
      });
      return patient.records;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem loading records for patient: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findRecordById(patientId: number, recordId: number) {
    try {
      const patient = await this.patientRepository.findOne({
        where: { id: patientId },
        relations: ['records'],
      });

      if (!patient) {
        throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
      }

      const record = patient.records.find(record => record.id === recordId);
      if (!record) {
        throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
      }

      return record;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem finding the record for patient: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateRecordById(patientId: number, recordId: number, updateData: any) {
    try {
      const patient = await this.patientRepository.findOne({
        where: { id: patientId },
        relations: ['records'],
      });

      if (!patient) {
        throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
      }

      const recordIndex = patient.records.findIndex(record => record.id === recordId);
      if (recordIndex === -1) {
        throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
      }

      const record = patient.records[recordIndex];
      Object.assign(record, updateData);
      await this.patientRepository.save(patient);
      return record;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem updating the record for patient: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async unsetRecordById(patientId: number, recordId: number) {
    try {
      return await this.patientRepository.createQueryBuilder()
        .relation(Patient, 'records')
        .of(patientId)
        .remove(recordId);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem unsetting record for patient: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
