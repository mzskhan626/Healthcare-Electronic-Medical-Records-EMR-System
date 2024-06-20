import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Appointment } from './appointment.model'

import { Patient } from '../../patient/domain'

import { User } from '../../user/domain'

@Injectable()
export class AppointmentDomainFacade {
  constructor(
    @InjectRepository(Appointment)
    private repository: Repository<Appointment>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Appointment>): Promise<Appointment> {
    return this.repository.save(values)
  }

  async update(
    item: Appointment,
    values: Partial<Appointment>,
  ): Promise<Appointment> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Appointment): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Appointment> = {},
  ): Promise<Appointment[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Appointment> = {},
  ): Promise<Appointment> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByPatient(
    item: Patient,
    queryOptions: RequestHelper.QueryOptions<Appointment> = {},
  ): Promise<Appointment[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('patient')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        patientId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByProvider(
    item: User,
    queryOptions: RequestHelper.QueryOptions<Appointment> = {},
  ): Promise<Appointment[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('provider')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        providerId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
