import LoginForm from "@/components/login/LoginForm";
import type { LoginFormData } from "@/components/login/loginSchema";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  async function handleLogin(data: LoginFormData) {
    // TODO: Implement actual login API call
    console.log("Login data:", data);
    router.push("/(tabs)");
  }

  return <LoginForm onSubmit={handleLogin} />;
}
