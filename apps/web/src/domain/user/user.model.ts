import { Notification } from '../notification'

import { Appointment } from '../appointment'

import { Prescription } from '../prescription'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email?: string
  status: UserStatus
  name?: string
  pictureUrl?: string
  password?: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  appointmentsAsProvider?: Appointment[]

  prescriptionsAsProvider?: Prescription[]
}
