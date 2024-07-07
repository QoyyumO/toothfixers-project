import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Record } from '../../../clinical-record/record/entities/record.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column()
  lastName: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  homeAddress: string;

  @Column()
  dateOfRegistration: Date;

  @Column({ default: true })
  _23120111056: boolean;

  @OneToMany(() => Record, record => record.patient)
  records: Record[];
}
