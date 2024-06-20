import { Patient } from '../patient'

import { User } from '../user'

export class Prescription {
  id: string

  medicationName?: string

  dosage?: string

  frequency?: string

  startDate?: string

  endDate?: string

  status?: string

  patientId?: string

  patient?: Patient

  providerId?: string

  provider?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
