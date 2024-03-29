import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import TextError from "../../components/TextError";
import {
  ChangePasswordInput,
  GetUserDocument,
  GetUserQuery,
  useChangePasswordMutation,
} from "../../generated/graphql";
import { mapErrorField } from "../../utils/mapErrorField";

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
      <Layout>
        <Loading />
      </Layout>
    );
  return (
    <Layout>
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
    </Layout>
  );
};

export default ChangePassword;
