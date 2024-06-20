export namespace PrescriptionApplicationEvent {
  export namespace PrescriptionCreated {
    export const key = 'prescription.application.prescription.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
