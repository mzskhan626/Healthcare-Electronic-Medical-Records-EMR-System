import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { PrescriptionDomainFacade } from '@server/modules/prescription/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { PrescriptionApplicationEvent } from './prescription.application.event'
import { PrescriptionCreateDto } from './prescription.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class PrescriptionByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private prescriptionDomainFacade: PrescriptionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/provider/:providerId/prescriptions')
  async findManyProviderId(
    @Param('providerId') providerId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(providerId)

    const items = await this.prescriptionDomainFacade.findManyByProvider(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/provider/:providerId/prescriptions')
  async createByProviderId(
    @Param('providerId') providerId: string,
    @Body() body: PrescriptionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, providerId }

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
