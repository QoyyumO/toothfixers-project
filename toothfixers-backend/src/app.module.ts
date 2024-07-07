import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsRegistrationModule } from './patients-registration/patients-registration.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Patient } from './patients-registration/patient/entities/patient.entity';
import { Record } from './clinical-record/record/entities/record.entity';
import { ClinicalRecordModule } from './clinical-record/clinical-record.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'toothfixer',
      entities: [Patient, Record],
      autoLoadEntities: true,
      synchronize: true,
    }),
    PatientsRegistrationModule,
    ClinicalRecordModule,

  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }