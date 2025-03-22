export interface IPagination {
  page: number
  limit: number
  total: number
}

export interface IPaginatedResponse<D> {
  data: D[]
  pagination: IPagination
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

export type FormMode = 'view' | 'create' | 'update'
