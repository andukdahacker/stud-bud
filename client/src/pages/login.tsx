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
import logo from "../assets/Mark.png";
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
      <div className="h-[44rem] bg-gray-50">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={logInValidationSchema}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col items-center justify-center w-full h-full">
              <Image src={logo} />
              <h2 className="mt-5 text-3xl font-extrabold leading-9">
                Sign in to your account
              </h2>

              <div className="flex flex-col items-center justify-center w-full mt-5 h-[15rem]">
                <div className="flex w-1/3">
                  <label htmlFor="email" className="mr-2 font-bold">
                    Email
                  </label>
                  <ErrorMessage name="email" component={TextError} />
                </div>

                <Field
                  name="email"
                  placeholder="Email"
                  className="w-1/3 h-10 border border-gray-200 border-solid rounded-t-sm "
                />

                <div className="flex w-1/3">
                  <label htmlFor="password" className="mr-2 font-bold">
                    Password
                  </label>
                  <ErrorMessage name="password" component={TextError} />
                </div>

                <div className="relative w-1/3">
                  <Field
                    name="password"
                    type={passwordVisibility ? "text" : "password"}
                    placeholder="Password"
                    className="w-full h-10 border border-gray-200 border-solid rounded-b-sm "
                  />
                  <div className="absolute bottom-3 right-2 hover:cursor-pointer">
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
                  className="m-3 p-2 text-sm font-medium leading-6 text-white bg-[#0056FF] rounded shadow-sm shadow-gray-900"
                >
                  {loading ? <Loading /> : <div>Submit</div>}
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
