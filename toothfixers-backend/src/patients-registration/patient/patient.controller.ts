import { Controller, Get, Post, Put, Delete, Body, Param, Patch } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patients')
export class PatientController {

  constructor(private readonly patientsService: PatientService) {}

  // CRUD operations for patients
  
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  async findAll() {
    let patients = await this.patientsService.findAll();
    patients = patients.map(patient => ({
      ...patient,
      status: patient['23120111056']
    }));
    return { patients };
  }

  @Get(':id')
  async editForm(@Param('id') id: string) {
    const patient = await this.patientsService.findOne(+id);
    return { patient };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }

  @Get(':patientId/records')
  async loadPatientRecords(@Param('patientId') patientId: number) {
    return this.patientsService.loadPatientRecords(+patientId);
  }

  @Get(':patientId/records/:recordId')
  async findRecordById(@Param('patientId') patientId: number, @Param('recordId') recordId: number) {
    return this.patientsService.findRecordById(+patientId, +recordId);
  }

  @Patch(':patientId/records/:recordId')
  async updateRecordById(@Param('patientId') patientId: number, @Param('recordId') recordId: number, @Body() updateData: any) {
    return this.patientsService.updateRecordById(+patientId, +recordId, updateData);
  }

  @Delete(':patientId/records/:recordId')
  async unsetRecordById(@Param('patientId') patientId: number, @Param('recordId') recordId: number) {
    return this.patientsService.unsetRecordById(+patientId, +recordId);
  }
}
