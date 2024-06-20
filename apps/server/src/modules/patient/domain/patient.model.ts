import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { MedicalHistory } from '../../../modules/medicalHistory/domain'

import { Appointment } from '../../../modules/appointment/domain'

import { Prescription } from '../../../modules/prescription/domain'

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  firstName?: string

  @Column({ nullable: true })
  lastName?: string

  @Column({ nullable: true })
  dateOfBirth?: string

  @Column({ nullable: true })
  gender?: string

  @Column({ nullable: true })
  contactInfo?: string

  @Column({ nullable: true })
  address?: string

  @OneToMany(() => MedicalHistory, child => child.patient)
  medicalHistorys?: MedicalHistory[]

  @OneToMany(() => Appointment, child => child.patient)
  appointments?: Appointment[]

  @OneToMany(() => Prescription, child => child.patient)
  prescriptions?: Prescription[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
