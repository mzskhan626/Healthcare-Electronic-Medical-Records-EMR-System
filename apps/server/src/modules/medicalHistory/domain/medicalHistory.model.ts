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

import { Patient } from '../../../modules/patient/domain'

@Entity()
export class MedicalHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  diagnosis?: string

  @Column({ nullable: true })
  treatment?: string

  @Column({ nullable: true })
  notes?: string

  @Column({ nullable: true })
  patientId?: string

  @ManyToOne(() => Patient, parent => parent.medicalHistorys)
  @JoinColumn({ name: 'patientId' })
  patient?: Patient

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
