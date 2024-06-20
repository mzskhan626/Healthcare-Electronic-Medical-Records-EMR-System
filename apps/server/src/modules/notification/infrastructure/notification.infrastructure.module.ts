import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationPatientSubscriber } from './subscribers/notification.patient.subscriber'

import { NotificationMedicalHistorySubscriber } from './subscribers/notification.medicalHistory.subscriber'

import { NotificationAppointmentSubscriber } from './subscribers/notification.appointment.subscriber'

import { NotificationPrescriptionSubscriber } from './subscribers/notification.prescription.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationPatientSubscriber,

    NotificationMedicalHistorySubscriber,

    NotificationAppointmentSubscriber,

    NotificationPrescriptionSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
