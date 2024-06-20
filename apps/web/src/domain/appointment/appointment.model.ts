import { Patient } from '../patient'

import { User } from '../user'

export class Appointment {
  id: string

  dateTime?: string

  status?: string

  notes?: string

  patientId?: string

  patient?: Patient

  providerId?: string

  provider?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
