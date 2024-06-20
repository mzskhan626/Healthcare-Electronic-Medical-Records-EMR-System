import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Prescription } from './prescription.model'

import { Patient } from '../../patient/domain'

import { User } from '../../user/domain'

@Injectable()
export class PrescriptionDomainFacade {
  constructor(
    @InjectRepository(Prescription)
    private repository: Repository<Prescription>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Prescription>): Promise<Prescription> {
    return this.repository.save(values)
  }

  async update(
    item: Prescription,
    values: Partial<Prescription>,
  ): Promise<Prescription> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Prescription): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Prescription> = {},
  ): Promise<Prescription[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Prescription> = {},
  ): Promise<Prescription> {
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
    queryOptions: RequestHelper.QueryOptions<Prescription> = {},
  ): Promise<Prescription[]> {
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
    queryOptions: RequestHelper.QueryOptions<Prescription> = {},
  ): Promise<Prescription[]> {
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
