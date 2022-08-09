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
    <div className="w-1/4 h-[calc(100vh_-_115px)] bg-white border-r border-black overflow-y-auto">
      <div className="flex flex-col items-center p-2 border-b border-black ">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form className="flex items-center justify-center w-full p-2 h-fit">
            <Field
              name="search_input"
              className="w-4/5 p-2 border border-black"
              placeholder="Looking for your buddy?"
            />
          </Form>
        </Formik>
        <button
          type="button"
          className="px-2 py-1 font-bold bg-white border-2 border-black w-fit"
        >
          NEW MESSAGE
        </button>
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
};

export default ConversationListBar;
