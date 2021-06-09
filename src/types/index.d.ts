export interface IUser {
  firstName: string;
  lastName: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Log {
  requestUrl: string;
  response: string;
  time: string;
}