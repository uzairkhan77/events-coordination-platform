import AuthLayout from "@/layouts/auth/auth-layout";
import SignInView from "@/views/auth/sign-in/sign-in.view";
import { useEffect } from "react";

const SignInPage = () => {
  useEffect(() => {
    document.title = "Sign In | Events Coordination";
  }, []);

  return (
    <AuthLayout>
      <SignInView />
    </AuthLayout>
  );
};

export default SignInPage;
