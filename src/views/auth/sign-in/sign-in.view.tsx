import Title from "@/components/common/Title";
import Button from "@/components/utils/Button";
import Input from "@/components/utils/Input";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import * as Yup from "yup";
import { useFirebaseAuth } from "@/hooks/firebase/auth/useFirebaseAuth";

const SignInView = () => {
  const navigate = useNavigate();
  const { login } = useFirebaseAuth();

  interface InitialValues {
    email: string;
    password: string;
  }

  const initialValues: InitialValues = {
    email: "",
    password: "",
  };

  const handleSubmitLogin = async (values: InitialValues) => {
    const user = await login(values.email, values.password);
    if (user) {
      navigate("/overview"); // ✅ Go to protected page after login
    }
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string().required("Password is required"),
      }),
      onSubmit: handleSubmitLogin,
    });

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit}
        className={cn("max-w-[390px] w-full", "flex flex-col gap-2")}
      >
        <Title className="mb-2">Login</Title>

        <div className="w-full flex flex-col gap-2">
          <Input
            name="email"
            id="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            label="Email Address"
            placeholder="Enter Email Address"
            error={!!(errors.email && touched.email)}
            helperText={
              errors.email && touched.email ? errors.email : undefined
            }
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <Input
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Password"
            placeholder="Enter Password"
            isPassword
            error={!!(errors.password && touched.password)}
            helperText={
              errors.password && touched.password ? errors.password : undefined
            }
          />
        </div>

        <div className="flex items-center">
          <Button
            variant="link"
            className="text-tertiary p-0"
            onClick={() => navigate("/auth/forgot-password")}
          >
            Forgot Password
          </Button>
        </div>

        <Button type="submit" className="mt-2" size="xlg">
          Login
        </Button>
      </form>
    </Fragment>
  );
};

export default SignInView;
