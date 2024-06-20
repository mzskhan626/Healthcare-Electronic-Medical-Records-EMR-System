import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { AppointmentDomainModule } from '../domain'
import { AppointmentController } from './appointment.controller'

import { PatientDomainModule } from '../../../modules/patient/domain'

import { AppointmentByPatientController } from './appointmentByPatient.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { AppointmentByUserController } from './appointmentByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    AppointmentDomainModule,

    PatientDomainModule,

    UserDomainModule,
  ],
  controllers: [
    AppointmentController,

    AppointmentByPatientController,

    AppointmentByUserController,
  ],
  providers: [],
})
export class AppointmentApplicationModule {}
