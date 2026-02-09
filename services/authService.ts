import { apiClient } from "./apiConfig";
import { ENDPOINTS } from "./endpoints";

interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SignupResponse {
  message: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export async function signup(payload: SignupPayload): Promise<SignupResponse> {
  const { data } = await apiClient.post<SignupResponse>(
    ENDPOINTS.AUTH.SIGNUP,
    payload,
  );

  return data;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>(
    ENDPOINTS.AUTH.LOGIN,
    payload,
  );
  return data;
}
