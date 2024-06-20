export namespace AppointmentApplicationEvent {
  export namespace AppointmentCreated {
    export const key = 'appointment.application.appointment.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
