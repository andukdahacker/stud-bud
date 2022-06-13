import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import {
  ForgotPasswordInput,
  useForgotPasswordMutation,
} from "../generated/graphql";
import * as Yup from "yup";
import { mapErrorField } from "../utils/mapErrorField";
import TextError from "../components/TextError";
import Layout from "../components/Layout";
import Loading from "../components/Loading";

const ForgotPassword = () => {
  const [forgotPassword, { data, loading }] = useForgotPasswordMutation();

  const initialValues = {
    email: "",
  };

  const onSubmit = async (
    { email }: ForgotPasswordInput,
    { setErrors }: FormikHelpers<ForgotPasswordInput>
  ) => {
    const result = await forgotPassword({
      variables: {
        input: {
          email,
        },
      },
    });

    if (result.data?.forgotPassword?.ErrorFieldOutput) {
      setErrors(mapErrorField(result.data.forgotPassword.ErrorFieldOutput));
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Required"),
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
            <label htmlFor="email">Email</label>
            <Field name="email" placeholder="email" />
            <ErrorMessage name="email" component={TextError} />
            <button type="submit" disabled={isSubmitting ? true : false}>
              Send email
            </button>
            <div>{data?.forgotPassword?.IOutput.message}</div>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default ForgotPassword;
