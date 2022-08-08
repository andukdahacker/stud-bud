import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import {
  GetUserDocument,
  GetUserQuery,
  useLoginMutation,
  LoginInput,
} from "../generated/graphql";
import TextError from "../components/TextError";
import { mapErrorField } from "../utils/mapErrorField";
import * as Yup from "yup";
import Link from "next/link";
import Loading from "../components/Loading";
import Image from "next/image";
import logo from "../../public/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Layout from "../components/Layout";

const Login = () => {
  const [logInMutation, { loading }] = useLoginMutation();

  const router = useRouter();

  const initialValues: LoginInput = {
    email: "",
    password: "",
  };

  const onSubmit = async (
    values: LoginInput,
    { setErrors }: FormikHelpers<LoginInput>
  ) => {
    const result = await logInMutation({
      variables: { input: values },
      update(cache, { data }) {
        if (data?.login.IOutput.success) {
          cache.writeQuery<GetUserQuery>({
            query: GetUserDocument,
            data: {
              __typename: "Query",
              getUser: data.login.User,
            },
          });
        }
      },
    });
    if (result.data?.login.ErrorFieldOutput) {
      setErrors(mapErrorField(result.data.login.ErrorFieldOutput));
    } else if (!result.data?.login.User?.profile) {
      router.push("/create-profile");
    } else if (result.data.login.User.profile) {
      router.push("/");
    }
  };

  const logInValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .required("Required"),
  });

  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(passwordVisibility ? false : true);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center w-full h-full p-5 bg-red-200">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={logInValidationSchema}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col items-center justify-center ">
              <Image src={logo} />
              <h2 className="mt-5 text-2xl font-extrabold leading-9 tracking-widest font-lexendZetta text-blue">
                Sign in to your account
              </h2>

              <div className="flex flex-col items-center justify-center w-full mt-5 h-fit">
                <div className="flex w-1/3">
                  <label htmlFor="email" className="mr-2 font-bold">
                    Email
                  </label>
                  <ErrorMessage name="email" component={TextError} />
                </div>

                <Field
                  name="email"
                  placeholder="Email"
                  className="w-1/3 p-2 border border-black rounded-t-sm "
                />

                <div className="flex w-1/3">
                  <label htmlFor="password" className="mr-2 font-bold">
                    Password
                  </label>
                  <ErrorMessage name="password" component={TextError} />
                </div>

                <div className="relative w-1/3 ">
                  <Field
                    name="password"
                    type={passwordVisibility ? "text" : "password"}
                    placeholder="Password"
                    className="w-full p-2 border border-black rounded-b-sm"
                  />
                  <div className="absolute top-2 right-1 hover:cursor-pointer">
                    <FontAwesomeIcon
                      icon="eye"
                      size="lg"
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting ? true : false}
                  className="px-2 py-1 my-5 font-bold text-white border-2 border-black bg-purple"
                >
                  {loading ? <Loading /> : <div>SIGN IN</div>}
                </button>
                <Link href="/forgot-password">
                  <a className="text-blue-700">Forgot password?</a>
                </Link>
                <Link href="/register">
                  <a className="text-blue-700">Don't have an account?</a>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default Login;
