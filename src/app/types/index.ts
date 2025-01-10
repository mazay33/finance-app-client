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
