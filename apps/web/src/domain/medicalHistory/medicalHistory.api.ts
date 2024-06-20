import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { MedicalHistory } from './medicalHistory.model'

export class MedicalHistoryApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<MedicalHistory>,
  ): Promise<MedicalHistory[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/medicalHistorys${buildOptions}`)
  }

  static findOne(
    medicalHistoryId: string,
    queryOptions?: ApiHelper.QueryOptions<MedicalHistory>,
  ): Promise<MedicalHistory> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/medicalHistorys/${medicalHistoryId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<MedicalHistory>): Promise<MedicalHistory> {
    return HttpService.api.post(`/v1/medicalHistorys`, values)
  }

  static updateOne(
    medicalHistoryId: string,
    values: Partial<MedicalHistory>,
  ): Promise<MedicalHistory> {
    return HttpService.api.patch(
      `/v1/medicalHistorys/${medicalHistoryId}`,
      values,
    )
  }

  static deleteOne(medicalHistoryId: string): Promise<void> {
    return HttpService.api.delete(`/v1/medicalHistorys/${medicalHistoryId}`)
  }

  static findManyByPatientId(
    patientId: string,
    queryOptions?: ApiHelper.QueryOptions<MedicalHistory>,
  ): Promise<MedicalHistory[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/patients/patient/${patientId}/medicalHistorys${buildOptions}`,
    )
  }

  static createOneByPatientId(
    patientId: string,
    values: Partial<MedicalHistory>,
  ): Promise<MedicalHistory> {
    return HttpService.api.post(
      `/v1/patients/patient/${patientId}/medicalHistorys`,
      values,
    )
  }
}
