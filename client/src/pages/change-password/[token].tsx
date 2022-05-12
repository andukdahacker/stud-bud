import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import TextError from "../../components/TextError";
import {
  ChangePasswordInput,
  GetUserDocument,
  GetUserQuery,
  useChangePasswordMutation,
} from "../../generated/graphql";
import * as Yup from "yup";
import { mapErrorField } from "../../utils/mapErrorField";
import Head from "next/head";

const ChangePassword = () => {
  const router = useRouter();
  const token = router.query.token as string;
  const [changePassword, { data, loading }] = useChangePasswordMutation();
  const initialValues = {
    token,
    password: "",
  };
  const onSubmit = async (
    { password }: ChangePasswordInput,
    { setErrors }: FormikHelpers<ChangePasswordInput>
  ) => {
    const result = await changePassword({
      variables: {
        input: {
          token,
          password,
        },
      },
      update(cache, { data }) {
        if (data?.changePassword?.User) {
          cache.writeQuery<GetUserQuery>({
            query: GetUserDocument,
            data: {
              __typename: "Query",
              getUser: data.changePassword.User,
            },
          });
        }
      },
    });

    if (result.data?.changePassword?.ErrorFieldOutput) {
      setErrors(mapErrorField(result.data.changePassword.ErrorFieldOutput));
    }

    if (result.data?.changePassword?.IOutput.success) {
      router.push("/");
    }
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .required("Required"),
  });

  if (loading)
    return (
      <>
        <NavBar />
        <div>Loading...</div>
      </>
    );
  return (
    <>
      <Head>
        <title>StudBud</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="password" placeholder="new password" />
            <ErrorMessage name="password" component={TextError} />
            <button type="submit" disabled={isSubmitting ? true : false}>
              Submit
            </button>
            <div>{data?.changePassword?.IOutput.message}</div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ChangePassword;
