import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { MedicalHistoryDomainModule } from '../domain'
import { MedicalHistoryController } from './medicalHistory.controller'

import { PatientDomainModule } from '../../../modules/patient/domain'

import { MedicalHistoryByPatientController } from './medicalHistoryByPatient.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    MedicalHistoryDomainModule,

    PatientDomainModule,
  ],
  controllers: [MedicalHistoryController, MedicalHistoryByPatientController],
  providers: [],
})
export class MedicalHistoryApplicationModule {}
