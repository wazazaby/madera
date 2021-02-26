export interface Users {
  id?: true;
  email: string;
  firstName: string;
  lastName: string;
  iat?: number;
  role: string;
  phoneNumber?: true;
  createdAt?: true;
  updatedAt?: true;
  roleId?: true;
}
