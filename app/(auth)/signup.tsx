import SignupForm from "@/components/signup/SignupForm";
import type { SignupFormData } from "@/components/signup/signupSchema";

export default function SignupScreen() {
  async function handleSignup(data: SignupFormData) {
    // TODO: Implement actual signup API call
    console.log("Signup data:", data);
  }

  return <SignupForm onSubmit={handleSignup} />;
}
