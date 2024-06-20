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
import {
  Prescription,
  PrescriptionDomainFacade,
} from '@server/modules/prescription/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { PrescriptionApplicationEvent } from './prescription.application.event'
import {
  PrescriptionCreateDto,
  PrescriptionUpdateDto,
} from './prescription.dto'

@Controller('/v1/prescriptions')
export class PrescriptionController {
  constructor(
    private eventService: EventService,
    private prescriptionDomainFacade: PrescriptionDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.prescriptionDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: PrescriptionCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.prescriptionDomainFacade.create(body)

    await this.eventService.emit<PrescriptionApplicationEvent.PrescriptionCreated.Payload>(
      PrescriptionApplicationEvent.PrescriptionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:prescriptionId')
  async findOne(
    @Param('prescriptionId') prescriptionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.prescriptionDomainFacade.findOneByIdOrFail(
      prescriptionId,
      queryOptions,
    )

    return item
  }

  @Patch('/:prescriptionId')
  async update(
    @Param('prescriptionId') prescriptionId: string,
    @Body() body: PrescriptionUpdateDto,
  ) {
    const item =
      await this.prescriptionDomainFacade.findOneByIdOrFail(prescriptionId)

    const itemUpdated = await this.prescriptionDomainFacade.update(
      item,
      body as Partial<Prescription>,
    )
    return itemUpdated
  }

  @Delete('/:prescriptionId')
  async delete(@Param('prescriptionId') prescriptionId: string) {
    const item =
      await this.prescriptionDomainFacade.findOneByIdOrFail(prescriptionId)

    await this.prescriptionDomainFacade.delete(item)

    return item
  }
}
