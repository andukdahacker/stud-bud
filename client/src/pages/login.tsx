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
import NavBar from "../components/NavBar";
import Link from "next/link";

const Login = () => {
  const [logInMutation, { data, loading }] = useLoginMutation();

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

  return (
    <>
      <NavBar />
      {loading && <div>Loading...</div>}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={logInValidationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="email">Email</label>
            <Field name="email" placeholder="Email" />
            <ErrorMessage name="email" component={TextError} />

            <label htmlFor="password">Password</label>
            <Field name="password" placeholder="Password" />
            <ErrorMessage name="password" component={TextError} />

            <button type="submit" disabled={isSubmitting ? true : false}>
              Submit
            </button>
          </Form>
        )}
      </Formik>

      <Link href="/forgot-password">
        <a>Forgot password?</a>
      </Link>
    </>
  );
};

export default Login;
