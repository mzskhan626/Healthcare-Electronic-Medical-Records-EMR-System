import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'
import {
  BillingPayment as BillingPaymentModel,
  BillingProduct as BillingProductModel,
  BillingSubscription as BillingSubscriptionModel,
} from './billing/billing.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Patient as PatientModel } from './patient/patient.model'

import { MedicalHistory as MedicalHistoryModel } from './medicalHistory/medicalHistory.model'

import { Appointment as AppointmentModel } from './appointment/appointment.model'

import { Prescription as PrescriptionModel } from './prescription/prescription.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}
  export class BillingProduct extends BillingProductModel {}
  export class BillingPayment extends BillingPaymentModel {}
  export class BillingSubscription extends BillingSubscriptionModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Patient extends PatientModel {}

  export class MedicalHistory extends MedicalHistoryModel {}

  export class Appointment extends AppointmentModel {}

  export class Prescription extends PrescriptionModel {}
}
