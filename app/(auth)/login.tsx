import LoginForm from "@/components/login/LoginForm";
import type { LoginFormData } from "@/components/login/loginSchema";

export default function LoginScreen() {
  async function handleLogin(data: LoginFormData) {
    // TODO: Implement actual login API call
    console.log("Login data:", data);
  }

  return <LoginForm onSubmit={handleLogin} />;
}
