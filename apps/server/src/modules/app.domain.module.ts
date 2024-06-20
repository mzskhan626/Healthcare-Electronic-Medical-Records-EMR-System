import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { PatientDomainModule } from './patient/domain'

import { MedicalHistoryDomainModule } from './medicalHistory/domain'

import { AppointmentDomainModule } from './appointment/domain'

import { PrescriptionDomainModule } from './prescription/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    PatientDomainModule,

    MedicalHistoryDomainModule,

    AppointmentDomainModule,

    PrescriptionDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
