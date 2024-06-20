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
  MedicalHistory,
  MedicalHistoryDomainFacade,
} from '@server/modules/medicalHistory/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { MedicalHistoryApplicationEvent } from './medicalHistory.application.event'
import {
  MedicalHistoryCreateDto,
  MedicalHistoryUpdateDto,
} from './medicalHistory.dto'

@Controller('/v1/medicalHistorys')
export class MedicalHistoryController {
  constructor(
    private eventService: EventService,
    private medicalHistoryDomainFacade: MedicalHistoryDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.medicalHistoryDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: MedicalHistoryCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.medicalHistoryDomainFacade.create(body)

    await this.eventService.emit<MedicalHistoryApplicationEvent.MedicalHistoryCreated.Payload>(
      MedicalHistoryApplicationEvent.MedicalHistoryCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:medicalHistoryId')
  async findOne(
    @Param('medicalHistoryId') medicalHistoryId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.medicalHistoryDomainFacade.findOneByIdOrFail(
      medicalHistoryId,
      queryOptions,
    )

    return item
  }

  @Patch('/:medicalHistoryId')
  async update(
    @Param('medicalHistoryId') medicalHistoryId: string,
    @Body() body: MedicalHistoryUpdateDto,
  ) {
    const item =
      await this.medicalHistoryDomainFacade.findOneByIdOrFail(medicalHistoryId)

    const itemUpdated = await this.medicalHistoryDomainFacade.update(
      item,
      body as Partial<MedicalHistory>,
    )
    return itemUpdated
  }

  @Delete('/:medicalHistoryId')
  async delete(@Param('medicalHistoryId') medicalHistoryId: string) {
    const item =
      await this.medicalHistoryDomainFacade.findOneByIdOrFail(medicalHistoryId)

    await this.medicalHistoryDomainFacade.delete(item)

    return item
  }
}
