import { Field, Form, Formik } from "formik";

import NavBar from "../components/NavBar";

const CreateProfile = () => {
  const initialValues = {};
  const onSubmit = () => {};
  return (
    <div>
      <NavBar />
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="profile_bio">Profile bio</label>
            <Field name="username" placeholder="Username" as="textarea" />
            <button type="submit" disabled={isSubmitting ? true : false}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProfile;
