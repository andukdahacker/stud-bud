import { Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import {
  CreateTutorOrderInput,
  useCreateTutorOrderMutation,
  useGetUserQuery,
} from "../../generated/graphql";

const CreateTutorOrder = () => {
  const router = useRouter();
  const { data: GetUserData, loading: GetUserLoading } = useGetUserQuery();

  const user_profile_id = GetUserData?.getUser?.profile?.id;
  const initialValues: CreateTutorOrderInput = {
    student_id: user_profile_id as string,
    tutor_order_interests: [{ interest_name: "" }],
    tutor_requirements: "",
    problem: "",
  };

  const [
    createTutorOrder,
    { data: CreateTutorOrderData, loading: CreateTutorOrderLoading },
  ] = useCreateTutorOrderMutation();

  const onSubmit = async ({
    tutor_order_interests,
    tutor_requirements,
    problem,
  }: CreateTutorOrderInput) => {
    const result = await createTutorOrder({
      variables: {
        input: {
          student_id: user_profile_id as string,
          tutor_order_interests,
          tutor_requirements,
          problem,
        },
      },
    });

    if (result.data?.createTutorOrder?.IOutput.success) {
      router.push(
        `/one-hour-tutor/${result.data.createTutorOrder.tutor_order?.id}`
      );
    }
  };

  if (GetUserLoading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  return (
    <Layout>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, values }) => (
          <Form>
            <label htmlFor="problem">Problem</label>
            <Field name="problem" as="textarea" />

            <label htmlFor="tutor_requirements">Tutor requirements</label>
            <Field name="tutor_requirements" />
            <label htmlFor="tutor_order_interests">Tutor Order Interests</label>
            <FieldArray name="tutor_order_interests">
              {({ push, remove }) => (
                <div>
                  {values.tutor_order_interests.map((interest, index) => {
                    return (
                      <div key={index}>
                        <Field
                          name={`tutor_order_interests[${index}.interest_name]`}
                          placeholder="interest"
                        />
                        <button onClick={() => remove(index)}>X</button>
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => push({ interest_name: "" })}
                  >
                    +
                  </button>
                </div>
              )}
            </FieldArray>
            <button type="submit" disabled={isSubmitting ? true : false}>
              {CreateTutorOrderLoading ? <Loading /> : <div>Submit</div>}
            </button>
          </Form>
        )}
      </Formik>
      {!CreateTutorOrderData?.createTutorOrder?.IOutput.success ? (
        <div>{CreateTutorOrderData?.createTutorOrder?.IOutput.message}</div>
      ) : null}
    </Layout>
  );
};

export default CreateTutorOrder;
