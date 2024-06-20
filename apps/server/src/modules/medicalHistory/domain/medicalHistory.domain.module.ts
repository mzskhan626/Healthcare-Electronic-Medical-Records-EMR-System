import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { MedicalHistoryDomainFacade } from './medicalHistory.domain.facade'
import { MedicalHistory } from './medicalHistory.model'

@Module({
  imports: [TypeOrmModule.forFeature([MedicalHistory]), DatabaseHelperModule],
  providers: [MedicalHistoryDomainFacade, MedicalHistoryDomainFacade],
  exports: [MedicalHistoryDomainFacade],
})
export class MedicalHistoryDomainModule {}
