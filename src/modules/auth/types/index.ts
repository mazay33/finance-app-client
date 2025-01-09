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

export enum ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
export interface IUser {
  id: string
  email: string
  roles: ROLE[]
  provider: string
  createdAt: string
  updatedAt: string
}
