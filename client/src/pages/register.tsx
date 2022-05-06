import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useRegisterMutation, RegisterInput } from "../generated/graphql";
import { useRouter } from "next/router";
import { mapErrorField } from "../utils/mapErrorField";
import TextError from "../components/TextError";
import * as Yup from "yup";
import NavBar from "../components/NavBar";
import Link from "next/link";

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
      <NavBar />
      {loading && <div>Loading...</div>}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={registerValidationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="username">Username</label>
            <Field name="username" placeholder="Username" />
            <ErrorMessage name="username" component={TextError} />

            <label htmlFor="email">Email</label>
            <Field name="email" placeholder="Email" />
            <ErrorMessage name="email" component={TextError} />

            <label htmlFor="password">Password</label>
            <Field name="password" placeholder="Password" />
            <ErrorMessage name="password" component={TextError} />

            <button type="submit" disabled={isSubmitting ? true : false}>
              Submit
            </button>

            <div>{data?.register.IOutput.message}</div>
          </Form>
        )}
      </Formik>
      <Link href="/login">Already have an account?</Link>
      <Link href="/forgot-password">Forgot password?</Link>
    </>
  );
};

export default Register;
