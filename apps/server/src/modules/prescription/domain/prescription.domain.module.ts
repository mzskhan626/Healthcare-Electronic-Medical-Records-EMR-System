import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { PrescriptionDomainFacade } from './prescription.domain.facade'
import { Prescription } from './prescription.model'

@Module({
  imports: [TypeOrmModule.forFeature([Prescription]), DatabaseHelperModule],
  providers: [PrescriptionDomainFacade, PrescriptionDomainFacade],
  exports: [PrescriptionDomainFacade],
})
export class PrescriptionDomainModule {}
