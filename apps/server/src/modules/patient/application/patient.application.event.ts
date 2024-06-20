export namespace PatientApplicationEvent {
  export namespace PatientCreated {
    export const key = 'patient.application.patient.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
