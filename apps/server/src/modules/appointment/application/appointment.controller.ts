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
  Appointment,
  AppointmentDomainFacade,
} from '@server/modules/appointment/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { AppointmentApplicationEvent } from './appointment.application.event'
import { AppointmentCreateDto, AppointmentUpdateDto } from './appointment.dto'

@Controller('/v1/appointments')
export class AppointmentController {
  constructor(
    private eventService: EventService,
    private appointmentDomainFacade: AppointmentDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.appointmentDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: AppointmentCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.appointmentDomainFacade.create(body)

    await this.eventService.emit<AppointmentApplicationEvent.AppointmentCreated.Payload>(
      AppointmentApplicationEvent.AppointmentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:appointmentId')
  async findOne(
    @Param('appointmentId') appointmentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.appointmentDomainFacade.findOneByIdOrFail(
      appointmentId,
      queryOptions,
    )

    return item
  }

  @Patch('/:appointmentId')
  async update(
    @Param('appointmentId') appointmentId: string,
    @Body() body: AppointmentUpdateDto,
  ) {
    const item =
      await this.appointmentDomainFacade.findOneByIdOrFail(appointmentId)

    const itemUpdated = await this.appointmentDomainFacade.update(
      item,
      body as Partial<Appointment>,
    )
    return itemUpdated
  }

  @Delete('/:appointmentId')
  async delete(@Param('appointmentId') appointmentId: string) {
    const item =
      await this.appointmentDomainFacade.findOneByIdOrFail(appointmentId)

    await this.appointmentDomainFacade.delete(item)

    return item
  }
}
