import {
  LoginPayload,
  LoginResponse,
  SignupPayload,
  SignupResponse,
} from "../types/authType";
import { apiClient } from "./apiConfig";
import { ENDPOINTS } from "./endpoints";

export async function signup(payload: SignupPayload): Promise<SignupResponse> {
  const { data } = await apiClient.post<SignupResponse>(
    ENDPOINTS.AUTH.SIGNUP,
    payload,
  );

  return data;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>(
    ENDPOINTS.AUTH.LOGIN,
    payload,
  );
  return data;
}
