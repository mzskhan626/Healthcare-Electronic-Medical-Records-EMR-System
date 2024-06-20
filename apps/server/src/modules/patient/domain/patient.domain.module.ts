import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { PatientDomainFacade } from './patient.domain.facade'
import { Patient } from './patient.model'

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), DatabaseHelperModule],
  providers: [PatientDomainFacade, PatientDomainFacade],
  exports: [PatientDomainFacade],
})
export class PatientDomainModule {}
