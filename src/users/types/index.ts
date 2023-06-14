import { Exclude } from 'class-transformer';

export interface User {
  id: number;
  userName: string;
  password: string;
}

export class SerializedUser {
  id: number;
  userName: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
