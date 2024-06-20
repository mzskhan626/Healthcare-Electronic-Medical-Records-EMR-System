import { MedicalHistory } from '../medicalHistory'

import { Appointment } from '../appointment'

import { Prescription } from '../prescription'

export class Patient {
  id: string

  firstName?: string

  lastName?: string

  dateOfBirth?: string

  gender?: string

  contactInfo?: string

  address?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  medicalHistorys?: MedicalHistory[]

  appointments?: Appointment[]

  prescriptions?: Prescription[]
}
