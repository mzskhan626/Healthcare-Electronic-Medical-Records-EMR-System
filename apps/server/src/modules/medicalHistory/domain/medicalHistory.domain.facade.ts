import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { MedicalHistory } from './medicalHistory.model'

import { Patient } from '../../patient/domain'

@Injectable()
export class MedicalHistoryDomainFacade {
  constructor(
    @InjectRepository(MedicalHistory)
    private repository: Repository<MedicalHistory>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<MedicalHistory>): Promise<MedicalHistory> {
    return this.repository.save(values)
  }

  async update(
    item: MedicalHistory,
    values: Partial<MedicalHistory>,
  ): Promise<MedicalHistory> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: MedicalHistory): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<MedicalHistory> = {},
  ): Promise<MedicalHistory[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<MedicalHistory> = {},
  ): Promise<MedicalHistory> {
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
    queryOptions: RequestHelper.QueryOptions<MedicalHistory> = {},
  ): Promise<MedicalHistory[]> {
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
}
