import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { PatientApplicationModule } from './patient/application'

import { MedicalHistoryApplicationModule } from './medicalHistory/application'

import { AppointmentApplicationModule } from './appointment/application'

import { PrescriptionApplicationModule } from './prescription/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { BillingApplicationModule } from './billing/application'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,
    BillingApplicationModule,

    PatientApplicationModule,

    MedicalHistoryApplicationModule,

    AppointmentApplicationModule,

    PrescriptionApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
