export interface BaseUser {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePicture?: string;
}

export interface AuthUser extends BaseUser {
  email: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
  __v: number;
}

export interface SignupUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface GetUserMeResponse {
  message: string;
  user: AuthUser;
}
