import { Field, Form, Formik } from "formik";
import { PropsWithChildren } from "react";

interface ConversationListBarProps {
  P?: any;
}

const ConversationListBar = ({
  children,
}: PropsWithChildren<ConversationListBarProps>) => {
  const initialValues = {
    search_input: "",
  };

  const onSubmit = () => {};
  return (
    <div className="w-1/4 bg-red-200">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <Field name="search_input" />
        </Form>
      </Formik>
      <div>{children}</div>
    </div>
  );
};

export default ConversationListBar;
