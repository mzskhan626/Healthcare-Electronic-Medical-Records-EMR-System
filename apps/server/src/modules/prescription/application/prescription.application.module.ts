import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { PrescriptionDomainModule } from '../domain'
import { PrescriptionController } from './prescription.controller'

import { PatientDomainModule } from '../../../modules/patient/domain'

import { PrescriptionByPatientController } from './prescriptionByPatient.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { PrescriptionByUserController } from './prescriptionByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    PrescriptionDomainModule,

    PatientDomainModule,

    UserDomainModule,
  ],
  controllers: [
    PrescriptionController,

    PrescriptionByPatientController,

    PrescriptionByUserController,
  ],
  providers: [],
})
export class PrescriptionApplicationModule {}
