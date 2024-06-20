import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { MedicalHistoryDomainFacade } from '@server/modules/medicalHistory/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { MedicalHistoryApplicationEvent } from './medicalHistory.application.event'
import { MedicalHistoryCreateDto } from './medicalHistory.dto'

import { PatientDomainFacade } from '../../patient/domain'

@Controller('/v1/patients')
export class MedicalHistoryByPatientController {
  constructor(
    private patientDomainFacade: PatientDomainFacade,

    private medicalHistoryDomainFacade: MedicalHistoryDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/patient/:patientId/medicalHistorys')
  async findManyPatientId(
    @Param('patientId') patientId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.patientDomainFacade.findOneByIdOrFail(patientId)

    const items = await this.medicalHistoryDomainFacade.findManyByPatient(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/patient/:patientId/medicalHistorys')
  async createByPatientId(
    @Param('patientId') patientId: string,
    @Body() body: MedicalHistoryCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, patientId }

    const item = await this.medicalHistoryDomainFacade.create(valuesUpdated)

    await this.eventService.emit<MedicalHistoryApplicationEvent.MedicalHistoryCreated.Payload>(
      MedicalHistoryApplicationEvent.MedicalHistoryCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
