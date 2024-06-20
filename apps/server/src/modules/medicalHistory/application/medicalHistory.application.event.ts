export namespace MedicalHistoryApplicationEvent {
  export namespace MedicalHistoryCreated {
    export const key = 'medicalHistory.application.medicalHistory.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
