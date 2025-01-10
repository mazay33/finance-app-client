export interface IRegisterRequestData {
  email: string
  password: string
  passwordRepeat: string
}
export interface ILoginRequestData {
  email: string
  password: string
}
export interface IAccessToken {
  accessToken: string
}
