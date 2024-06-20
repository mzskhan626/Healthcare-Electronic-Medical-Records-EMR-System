import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Appointment } from './appointment.model'

export class AppointmentApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Appointment>,
  ): Promise<Appointment[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/appointments${buildOptions}`)
  }

  static findOne(
    appointmentId: string,
    queryOptions?: ApiHelper.QueryOptions<Appointment>,
  ): Promise<Appointment> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/appointments/${appointmentId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Appointment>): Promise<Appointment> {
    return HttpService.api.post(`/v1/appointments`, values)
  }

  static updateOne(
    appointmentId: string,
    values: Partial<Appointment>,
  ): Promise<Appointment> {
    return HttpService.api.patch(`/v1/appointments/${appointmentId}`, values)
  }

  static deleteOne(appointmentId: string): Promise<void> {
    return HttpService.api.delete(`/v1/appointments/${appointmentId}`)
  }

  static findManyByPatientId(
    patientId: string,
    queryOptions?: ApiHelper.QueryOptions<Appointment>,
  ): Promise<Appointment[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/patients/patient/${patientId}/appointments${buildOptions}`,
    )
  }

  static createOneByPatientId(
    patientId: string,
    values: Partial<Appointment>,
  ): Promise<Appointment> {
    return HttpService.api.post(
      `/v1/patients/patient/${patientId}/appointments`,
      values,
    )
  }

  static findManyByProviderId(
    providerId: string,
    queryOptions?: ApiHelper.QueryOptions<Appointment>,
  ): Promise<Appointment[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/provider/${providerId}/appointments${buildOptions}`,
    )
  }

  static createOneByProviderId(
    providerId: string,
    values: Partial<Appointment>,
  ): Promise<Appointment> {
    return HttpService.api.post(
      `/v1/users/provider/${providerId}/appointments`,
      values,
    )
  }
}
