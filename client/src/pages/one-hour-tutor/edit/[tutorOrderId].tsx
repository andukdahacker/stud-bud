import { Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../../components/Layout";
import Loading from "../../../components/Loading";
import {
  CreateTutorOrderInput,
  TutorOrderWhereUniqueInput,
  useGetTutorOrderLazyQuery,
  useGetUserQuery,
  useUpdateTutorOrderMutation,
} from "../../../generated/graphql";

const EditTutorOrder = () => {
  const router = useRouter();
  const { data: GetUserData, loading: GetUserLoading } = useGetUserQuery();
  const user_profile_id = GetUserData?.getUser?.profile?.id;
  const [
    getTutorOrder,
    {
      data: GetTutorOrderData,
      loading: GetTutorOrderLoading,
      refetch: refetchTutorData,
    },
  ] = useGetTutorOrderLazyQuery();

  const [
    updateTutorOrder,
    { data: updateTutorOrderData, loading: updateTutorOrderLoading },
  ] = useUpdateTutorOrderMutation();

  const tutorOrderData = GetTutorOrderData?.getTutorOrder?.tutor_order;

  const tutor_order_id = tutorOrderData?.id ? tutorOrderData.id : "";
  const problem = tutorOrderData?.problem ? tutorOrderData.problem : "";
  const tutor_requirements = tutorOrderData?.tutor_requirements
    ? tutorOrderData.tutor_requirements
    : "";
  const tutor_order_interests = tutorOrderData?.tutor_order_interest
    ? tutorOrderData.tutor_order_interest.map((obj) => {
        return { interest_name: obj.interest.interest_name as string };
      })
    : [{ interest_name: "" }];

  const updateTutorOrderSuccess =
    updateTutorOrderData?.updateTutorOrder?.IOutput.success;
  const updateTutorOrderMessage =
    updateTutorOrderData?.updateTutorOrder?.IOutput.message;

  useEffect(() => {
    async function fetchData() {
      await getTutorOrder({
        variables: {
          where: {
            id: router.query.tutorOrderId as string,
          },
        },
      });
    }

    if (router.isReady) fetchData();
  }, [router.isReady, router.query]);

  const initialValues: CreateTutorOrderInput & TutorOrderWhereUniqueInput = {
    id: tutor_order_id,
    student_id: user_profile_id as string,
    tutor_order_interests,
    problem,
    tutor_requirements,
  };

  const onSubmit = async ({
    id,
    student_id,
    tutor_order_interests,
    problem,
    tutor_requirements,
  }: CreateTutorOrderInput & TutorOrderWhereUniqueInput) => {
    const result = await updateTutorOrder({
      variables: {
        where: {
          id,
        },
        input: {
          student_id,
          tutor_order_interests,
          problem,
          tutor_requirements,
        },
      },
    });

    if (result.data?.updateTutorOrder?.IOutput.success) {
      await refetchTutorData({
        where: {
          id,
        },
      });

      router.push(`/one-hour-tutor/${tutor_order_id}`);
    }
  };

  if (GetTutorOrderLoading || GetUserLoading)
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
        enableReinitialize={true}
      >
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
              {updateTutorOrderLoading ? <Loading /> : <div>Submit</div>}
            </button>
          </Form>
        )}
      </Formik>

      {!updateTutorOrderSuccess ? <div>{updateTutorOrderMessage}</div> : null}
    </Layout>
  );
};

export default EditTutorOrder;
