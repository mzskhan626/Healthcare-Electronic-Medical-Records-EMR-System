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

import { User } from '../../../modules/user/domain'

@Entity()
export class Prescription {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  medicationName?: string

  @Column({ nullable: true })
  dosage?: string

  @Column({ nullable: true })
  frequency?: string

  @Column({ nullable: true })
  startDate?: string

  @Column({ nullable: true })
  endDate?: string

  @Column({ nullable: true })
  status?: string

  @Column({ nullable: true })
  patientId?: string

  @ManyToOne(() => Patient, parent => parent.prescriptions)
  @JoinColumn({ name: 'patientId' })
  patient?: Patient

  @Column({ nullable: true })
  providerId?: string

  @ManyToOne(() => User, parent => parent.prescriptionsAsProvider)
  @JoinColumn({ name: 'providerId' })
  provider?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
