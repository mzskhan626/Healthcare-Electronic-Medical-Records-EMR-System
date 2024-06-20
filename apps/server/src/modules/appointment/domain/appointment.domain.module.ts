import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { AppointmentDomainFacade } from './appointment.domain.facade'
import { Appointment } from './appointment.model'

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), DatabaseHelperModule],
  providers: [AppointmentDomainFacade, AppointmentDomainFacade],
  exports: [AppointmentDomainFacade],
})
export class AppointmentDomainModule {}
