export interface UserLogin {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: number;
  error?: string;
}

export interface UserInfo {
  name: string;
  phoneNumber: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface UserValidate {
  email: string;
  phoneNumber: string;
}
