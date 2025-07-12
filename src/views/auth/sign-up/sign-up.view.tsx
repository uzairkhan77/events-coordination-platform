import Title from "@/components/common/Title";
import Button from "@/components/utils/Button";
import Input from "@/components/utils/Input";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebaseSignUp } from "@/hooks/firebase/auth/useFireBaseSignup";

const SignUpView = () => {
  const navigate = useNavigate();
  const { signUp } = useFirebaseSignUp();

  interface InitialValues {
    displayName: string;
    email: string;
    password: string;
  }

  const initialValues: InitialValues = {
    displayName: "",
    email: "",
    password: "",
  };

  const handleRegister = async (values: InitialValues) => {
    const user = await signUp(
      values.email,
      values.password,
      values.displayName
    );
    if (user) {
      navigate("/overview"); // Go to main app/dashboard page
    }
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        displayName: Yup.string().required("Display name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      }),
      onSubmit: handleRegister,
    });

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit}
        className={cn("max-w-[390px] w-full", "flex flex-col gap-2")}
      >
        <Title className="mb-2">Register</Title>

        <div className="w-full flex flex-col gap-2">
          <Input
            id="displayName"
            name="displayName"
            label="Full Name"
            placeholder="Enter Full Name"
            value={values.displayName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!(errors.displayName && touched.displayName)}
            helperText={
              errors.displayName && touched.displayName
                ? errors.displayName
                : undefined
            }
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <Input
            id="email"
            name="email"
            label="Email Address"
            placeholder="Enter Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
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
            label="Password"
            placeholder="Enter Password"
            isPassword
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!(errors.password && touched.password)}
            helperText={
              errors.password && touched.password ? errors.password : undefined
            }
          />
        </div>

        <Button type="submit" className="mt-2" size="xlg">
          Create Account
        </Button>
      </form>
    </Fragment>
  );
};

export default SignUpView;
