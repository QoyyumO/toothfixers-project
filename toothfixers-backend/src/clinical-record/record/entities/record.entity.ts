import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Patient } from '../../../patients-registration/patient/entities/patient.entity';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clinicDate: Date;

  @Column()
  natureOfAilment: string;

  @Column()
  medicinePrescribed: string;

  @Column()
  procedureUndertaken: string;

  @Column()
  dateOfNextAppointment: Date;

  @ManyToOne(() => Patient, patient => patient.records, { onDelete: 'CASCADE' })
  patient: Patient;
}
