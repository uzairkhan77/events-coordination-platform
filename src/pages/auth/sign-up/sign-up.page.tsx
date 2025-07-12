import AuthLayout from "@/layouts/auth/auth-layout";
import SignUpView from "@/views/auth/sign-up/sign-up.view";
import { useEffect } from "react";

const SignUpPage = () => {
  useEffect(() => {
    document.title = "Sign Up | Events Coordination";
  }, []);

  return (
    <AuthLayout>
      <SignUpView />
    </AuthLayout>
  );
};

export default SignUpPage;
