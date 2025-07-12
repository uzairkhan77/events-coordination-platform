import Title from "@/components/common/Title";
import Button from "@/components/utils/Button";
import Input from "@/components/utils/Input";
import { cn } from "@/lib/utils";
// import { UseUserLoginHook } from "@/services/react-query-client/auth/user-login";
// import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
// import toast from "react-hot-toast";
import * as Yup from "yup";

const LoginPage = () => {
  const navigate = useNavigate();

  // Custom hook for login mutation
  //   const { mutate, isPending } = UseUserLoginHook();

  interface InitialValues {
    email: string;
    password: string;
  }

  const initialValues: InitialValues = {
    email: "",
    password: "",
  };

  //   const handleLoginClick = (values: InitialValues) => {
  //     mutate(values, {
  //       onSuccess: (data) => {
  //         document.cookie = `token=${data.token}`;
  //         document.cookie = `user=${JSON.stringify(data.user)}`;
  //         toast.success("Login Successful");
  //         navigate("/overview"); // ✅ instead of router.push
  //       },
  //       onError: (error) => {
  //         if (axios.isAxiosError(error)) {
  //           toast.error(error.response?.data.message);
  //         }
  //       },
  //     });
  //   };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string().required("Password is required"),
      }),
      onSubmit: () => {},
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

export default LoginPage;
