import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Patient } from './patient.model'

export class PatientApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Patient>,
  ): Promise<Patient[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/patients${buildOptions}`)
  }

  static findOne(
    patientId: string,
    queryOptions?: ApiHelper.QueryOptions<Patient>,
  ): Promise<Patient> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/patients/${patientId}${buildOptions}`)
  }

  static createOne(values: Partial<Patient>): Promise<Patient> {
    return HttpService.api.post(`/v1/patients`, values)
  }

  static updateOne(
    patientId: string,
    values: Partial<Patient>,
  ): Promise<Patient> {
    return HttpService.api.patch(`/v1/patients/${patientId}`, values)
  }

  static deleteOne(patientId: string): Promise<void> {
    return HttpService.api.delete(`/v1/patients/${patientId}`)
  }
}
