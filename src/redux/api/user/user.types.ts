export interface IUser {
  email?: string,
  firstName?: string,
  lastName?: string,
  birthday?: string,
  imgSrc?: string,
  readyForJointTraining?: boolean,
  sendNotification?: boolean,
  tariff?: {
    tariffId: string,
    expired: string
  }
}
export interface ITariffAdd {
  tariffId: string,
  days: number
}