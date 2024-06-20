import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { BillingApi } from './billing/billing.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { PatientApi } from './patient/patient.api'

import { MedicalHistoryApi } from './medicalHistory/medicalHistory.api'

import { AppointmentApi } from './appointment/appointment.api'

import { PrescriptionApi } from './prescription/prescription.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Billing extends BillingApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Patient extends PatientApi {}

  export class MedicalHistory extends MedicalHistoryApi {}

  export class Appointment extends AppointmentApi {}

  export class Prescription extends PrescriptionApi {}
}
