import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import LoginForm from "@/components/login/LoginForm";
import type { LoginFormData } from "@/components/login/loginSchema";
import { useAuth } from "@/contexts/AuthContext";
import { login } from "@/services/authService";

export default function LoginScreen() {
  const { signIn } = useAuth();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: LoginFormData) =>
      login({ email: data.email, password: data.password }),
    onSuccess: async (data) => {
      await signIn(data.token, data.user);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        console.error("Login error:", err.response?.status, err.response?.data);
      } else {
        console.error("Login error:", err);
      }
    },
  });

  const apiError =
    error instanceof AxiosError
      ? (error.response?.data?.message ??
          "Something went wrong. Please try again.")
      : error
        ? "Something went wrong. Please try again."
        : null;

  return (
    <LoginForm onSubmit={mutate} isPending={isPending} apiError={apiError} />
  );
}
