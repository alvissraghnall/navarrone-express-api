export interface User {
  id?: string;
  name?: string;
  userName?: string;
  phoneNumber?: string;
  email: string;
  password: string;
  country?: string;
  isVerified?: boolean;
  //hashPassword: () => /* Promise<void> */ string;
}