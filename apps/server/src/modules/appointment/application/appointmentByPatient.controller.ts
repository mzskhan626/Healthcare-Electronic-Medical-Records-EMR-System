import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { AppointmentDomainFacade } from '@server/modules/appointment/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { AppointmentApplicationEvent } from './appointment.application.event'
import { AppointmentCreateDto } from './appointment.dto'

import { PatientDomainFacade } from '../../patient/domain'

@Controller('/v1/patients')
export class AppointmentByPatientController {
  constructor(
    private patientDomainFacade: PatientDomainFacade,

    private appointmentDomainFacade: AppointmentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/patient/:patientId/appointments')
  async findManyPatientId(
    @Param('patientId') patientId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.patientDomainFacade.findOneByIdOrFail(patientId)

    const items = await this.appointmentDomainFacade.findManyByPatient(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/patient/:patientId/appointments')
  async createByPatientId(
    @Param('patientId') patientId: string,
    @Body() body: AppointmentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, patientId }

    const item = await this.appointmentDomainFacade.create(valuesUpdated)

    await this.eventService.emit<AppointmentApplicationEvent.AppointmentCreated.Payload>(
      AppointmentApplicationEvent.AppointmentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
