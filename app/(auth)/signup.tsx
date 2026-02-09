import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

import SignupForm from "@/components/signup/SignupForm";
import type { SignupFormData } from "@/components/signup/signupSchema";
import { signup } from "@/services/authService";

export default function SignupScreen() {
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: SignupFormData) =>
      signup({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }),
    onSuccess: () => {
      Alert.alert("Account Created", "You can now log in.", [
        { text: "OK", onPress: () => router.replace("/(auth)/login") },
      ]);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        console.log(err);

        console.error(
          "Signup error:",
          err.response?.status,
          err.response?.data,
        );
      } else {
        console.error("Signup error:", err);
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
    <SignupForm onSubmit={mutate} isPending={isPending} apiError={apiError} />
  );
}
