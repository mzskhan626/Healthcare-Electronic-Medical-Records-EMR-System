import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { AppointmentDomainFacade } from '@server/modules/appointment/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { AppointmentApplicationEvent } from './appointment.application.event'
import { AppointmentCreateDto } from './appointment.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class AppointmentByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private appointmentDomainFacade: AppointmentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/provider/:providerId/appointments')
  async findManyProviderId(
    @Param('providerId') providerId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(providerId)

    const items = await this.appointmentDomainFacade.findManyByProvider(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/provider/:providerId/appointments')
  async createByProviderId(
    @Param('providerId') providerId: string,
    @Body() body: AppointmentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, providerId }

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
