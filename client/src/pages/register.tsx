import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useRegisterMutation, RegisterInput } from "../generated/graphql";
import { useRouter } from "next/router";
import { mapErrorField } from "../utils/mapErrorField";
import TextError from "../components/Forms/TextError";
import * as Yup from "yup";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/Logo.png";
import Loading from "../components/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Layout from "../components/Layouts/Layout";

const Register = () => {
  const [registerMutation, { loading }] = useRegisterMutation({});
  const router = useRouter();

  const initialValues: RegisterInput = {
    username: "",
    email: "",
    password: "",
  };

  const registerValidationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too short. Username must contain more than 2 characters")
      .max(30)
      .required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .required("Required"),
  });

  const onSubmit = async (
    values: RegisterInput,
    { setErrors }: FormikHelpers<RegisterInput>
  ) => {
    const result = await registerMutation({
      variables: { input: values },
    });

    if (result.data?.register.ErrorFieldOutput) {
      setErrors(mapErrorField(result.data.register.ErrorFieldOutput));
    }
    if (result.data?.register.IOutput.success) {
      router.push("/login");
    }
  };

  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(passwordVisibility ? false : true);
  };

  return (
    <Layout>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={registerValidationSchema}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col items-center justify-center max-w-md p-5 mx-auto">
            <Image src={logo} />
            <h2 className="mt-3 text-2xl font-extrabold ">Create an account</h2>

            <div className="flex flex-col items-center justify-center w-full mt-2 ">
              <div className="flex w-full ">
                <label htmlFor="username" className="mr-2 font-bold">
                  Username
                </label>
                <ErrorMessage name="username" component={TextError} />
              </div>
              <Field
                name="username"
                placeholder="Username"
                className="w-full p-2 border border-black rounded-t-sm "
              />
              <div className="flex w-full">
                <label htmlFor="email" className="mr-2 font-bold">
                  Email
                </label>
                <ErrorMessage name="email" component={TextError} />
              </div>
              <Field
                name="email"
                placeholder="Email"
                className="w-full p-2 border border-black "
              />
              <div className="flex w-full">
                <label htmlFor="password" className="mr-2 font-bold">
                  Password
                </label>
                <ErrorMessage name="password" component={TextError} />
              </div>
              <div className="relative w-full">
                <Field
                  name="password"
                  type={passwordVisibility ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-2 border border-black rounded-b-sm "
                />
                <FontAwesomeIcon
                  icon="eye"
                  size="lg"
                  className="absolute top-3 right-1 hover:cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting ? true : false}
                className="px-2 py-1 my-3 font-bold text-white border-2 border-black bg-purple"
              >
                {loading ? <Loading /> : <div>SIGN UP</div>}
              </button>

              <Link href="/login">
                <a className="text-blue-700">Already have an account?</a>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default Register;
