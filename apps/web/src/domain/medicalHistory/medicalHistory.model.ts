import { Patient } from '../patient'

export class MedicalHistory {
  id: string

  diagnosis?: string

  treatment?: string

  notes?: string

  patientId?: string

  patient?: Patient

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
