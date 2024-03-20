export interface Ilogin {
  password: string,
  email: string,
}
export interface IRegistration {
  password: string,
  email: string,
}
export interface ICheckEmail {
  email: string,
}
export interface IConfirmEmail {
  code: string,
  email: string,
}
export interface IChangePassword {
  password: string,
  confirmPassword: string,
}