import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";

import LoginForm from "@/components/login/LoginForm";
import type { LoginFormData } from "@/components/login/loginSchema";
import { login } from "@/services/authService";

export default function LoginScreen() {
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: LoginFormData) =>
      login({ email: data.email, password: data.password }),
    onSuccess: () => {
      router.replace("/(tabs)");
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
