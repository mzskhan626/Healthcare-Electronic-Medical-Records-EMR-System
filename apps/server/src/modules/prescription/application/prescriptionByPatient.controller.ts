import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { PrescriptionDomainFacade } from '@server/modules/prescription/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { PrescriptionApplicationEvent } from './prescription.application.event'
import { PrescriptionCreateDto } from './prescription.dto'

import { PatientDomainFacade } from '../../patient/domain'

@Controller('/v1/patients')
export class PrescriptionByPatientController {
  constructor(
    private patientDomainFacade: PatientDomainFacade,

    private prescriptionDomainFacade: PrescriptionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/patient/:patientId/prescriptions')
  async findManyPatientId(
    @Param('patientId') patientId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.patientDomainFacade.findOneByIdOrFail(patientId)

    const items = await this.prescriptionDomainFacade.findManyByPatient(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/patient/:patientId/prescriptions')
  async createByPatientId(
    @Param('patientId') patientId: string,
    @Body() body: PrescriptionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, patientId }

    const item = await this.prescriptionDomainFacade.create(valuesUpdated)

    await this.eventService.emit<PrescriptionApplicationEvent.PrescriptionCreated.Payload>(
      PrescriptionApplicationEvent.PrescriptionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
