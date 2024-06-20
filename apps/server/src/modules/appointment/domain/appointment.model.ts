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
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  dateTime?: string

  @Column({ nullable: true })
  status?: string

  @Column({ nullable: true })
  notes?: string

  @Column({ nullable: true })
  patientId?: string

  @ManyToOne(() => Patient, parent => parent.appointments)
  @JoinColumn({ name: 'patientId' })
  patient?: Patient

  @Column({ nullable: true })
  providerId?: string

  @ManyToOne(() => User, parent => parent.appointmentsAsProvider)
  @JoinColumn({ name: 'providerId' })
  provider?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
