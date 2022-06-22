import { Field, Form, Formik } from "formik";
import { PropsWithChildren } from "react";

interface ConversationListBarProps {
  P?: any;
}

const ConversationListBar = ({
  children,
}: PropsWithChildren<ConversationListBarProps>) => {
  const initialValues = {
    search_input: null,
  };

  const onSubmit = () => {};
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <Field />
        </Form>
      </Formik>
      <div>{children}</div>
    </div>
  );
};

export default ConversationListBar;
