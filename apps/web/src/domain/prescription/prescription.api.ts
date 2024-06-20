import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Prescription } from './prescription.model'

export class PrescriptionApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Prescription>,
  ): Promise<Prescription[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/prescriptions${buildOptions}`)
  }

  static findOne(
    prescriptionId: string,
    queryOptions?: ApiHelper.QueryOptions<Prescription>,
  ): Promise<Prescription> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/prescriptions/${prescriptionId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Prescription>): Promise<Prescription> {
    return HttpService.api.post(`/v1/prescriptions`, values)
  }

  static updateOne(
    prescriptionId: string,
    values: Partial<Prescription>,
  ): Promise<Prescription> {
    return HttpService.api.patch(`/v1/prescriptions/${prescriptionId}`, values)
  }

  static deleteOne(prescriptionId: string): Promise<void> {
    return HttpService.api.delete(`/v1/prescriptions/${prescriptionId}`)
  }

  static findManyByPatientId(
    patientId: string,
    queryOptions?: ApiHelper.QueryOptions<Prescription>,
  ): Promise<Prescription[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/patients/patient/${patientId}/prescriptions${buildOptions}`,
    )
  }

  static createOneByPatientId(
    patientId: string,
    values: Partial<Prescription>,
  ): Promise<Prescription> {
    return HttpService.api.post(
      `/v1/patients/patient/${patientId}/prescriptions`,
      values,
    )
  }

  static findManyByProviderId(
    providerId: string,
    queryOptions?: ApiHelper.QueryOptions<Prescription>,
  ): Promise<Prescription[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/provider/${providerId}/prescriptions${buildOptions}`,
    )
  }

  static createOneByProviderId(
    providerId: string,
    values: Partial<Prescription>,
  ): Promise<Prescription> {
    return HttpService.api.post(
      `/v1/users/provider/${providerId}/prescriptions`,
      values,
    )
  }
}
