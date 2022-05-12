import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useRegisterMutation, RegisterInput } from "../generated/graphql";
import { useRouter } from "next/router";
import { mapErrorField } from "../utils/mapErrorField";
import TextError from "../components/TextError";
import * as Yup from "yup";
import NavBar from "../components/NavBar";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import logo from "../assets/Mark.png";
import Loading from "../components/Loading";

const Register = () => {
  const [registerMutation, { data, loading }] = useRegisterMutation({});
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

  return (
    <>
      <Head>
        <title>StudBud</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />

      <div className="h-[44rem] bg-gray-50">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={registerValidationSchema}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col items-center justify-center w-full h-full">
              <Image src={logo} />
              <h2 className="text-3xl font-extrabold leading-9">
                Create an account
              </h2>

              <div className="flex flex-col items-center justify-center w-full ">
                <div className="flex w-1/3 ">
                  <label htmlFor="username" className="mr-2 font-bold">
                    Username
                  </label>
                  <ErrorMessage name="username" component={TextError} />
                </div>
                <Field
                  name="username"
                  placeholder="Username"
                  className="w-1/3 h-10 border border-gray-200 border-solid rounded-t-sm "
                />
                <div className="flex w-1/3">
                  <label htmlFor="email" className="mr-2 font-bold">
                    Email
                  </label>
                  <ErrorMessage name="email" component={TextError} />
                </div>
                <Field
                  name="email"
                  placeholder="Email"
                  className="w-1/3 h-10 border border-gray-200 border-solid "
                />
                <div className="flex w-1/3">
                  <label htmlFor="password" className="mr-2 font-bold">
                    Password
                  </label>
                  <ErrorMessage name="password" component={TextError} />
                </div>
                <Field
                  name="password"
                  placeholder="Password"
                  className="w-1/3 h-10 border border-gray-200 border-solid rounded-b-sm"
                />

                <button type="submit" disabled={isSubmitting ? true : false}>
                  {loading ? <Loading /> : <div>Submit</div>}
                </button>

                <Link href="/login">Already have an account?</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Register;
