import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { PatientDomainModule } from '../domain'
import { PatientController } from './patient.controller'

@Module({
  imports: [AuthenticationDomainModule, PatientDomainModule],
  controllers: [PatientController],
  providers: [],
})
export class PatientApplicationModule {}
