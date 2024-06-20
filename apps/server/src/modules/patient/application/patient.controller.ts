import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import { Patient, PatientDomainFacade } from '@server/modules/patient/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { PatientApplicationEvent } from './patient.application.event'
import { PatientCreateDto, PatientUpdateDto } from './patient.dto'

@Controller('/v1/patients')
export class PatientController {
  constructor(
    private eventService: EventService,
    private patientDomainFacade: PatientDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.patientDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: PatientCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.patientDomainFacade.create(body)

    await this.eventService.emit<PatientApplicationEvent.PatientCreated.Payload>(
      PatientApplicationEvent.PatientCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:patientId')
  async findOne(
    @Param('patientId') patientId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.patientDomainFacade.findOneByIdOrFail(
      patientId,
      queryOptions,
    )

    return item
  }

  @Patch('/:patientId')
  async update(
    @Param('patientId') patientId: string,
    @Body() body: PatientUpdateDto,
  ) {
    const item = await this.patientDomainFacade.findOneByIdOrFail(patientId)

    const itemUpdated = await this.patientDomainFacade.update(
      item,
      body as Partial<Patient>,
    )
    return itemUpdated
  }

  @Delete('/:patientId')
  async delete(@Param('patientId') patientId: string) {
    const item = await this.patientDomainFacade.findOneByIdOrFail(patientId)

    await this.patientDomainFacade.delete(item)

    return item
  }
}
