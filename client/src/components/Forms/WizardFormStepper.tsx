import {
  Form,
  Formik,
  FormikConfig,
  FormikHelpers,
  FormikValues,
} from "formik";
import React, { ReactNode, useState } from "react";

const WizardFormStepper = ({
  children,
  initialValues,
  onSubmit,
}: FormikConfig<FormikValues>) => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(
    children as ReactNode | ReactNode[]
  ) as React.ReactElement<FormikConfig<FormikValues>>[];

  const [snapShot, setSnapShot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values: FormikValues) => {
    setSnapShot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = (values: FormikValues) => {
    setSnapShot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (
    values: FormikValues,
    bag: FormikHelpers<FormikValues>
  ) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag);
    }
    if (isLastStep) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      next(values);
    }
  };

  return (
    <>
      <Formik
        initialValues={snapShot}
        onSubmit={handleSubmit}
        validationSchema={step.props.validationSchema}
        enableReinitialize={true}
      >
        {({ values, isSubmitting }) => (
          <Form className="flex flex-col items-center justify-center w-full h-full mt-5">
            <div>
              {stepNumber + 1}/{steps.length}
            </div>
            <div>{step}</div>
            <div className="p-2">
              {stepNumber > 0 && (
                <button
                  onClick={() => previous(values)}
                  type="button"
                  className="whiteButton"
                >
                  Back
                </button>
              )}

              <button
                disabled={isSubmitting}
                type="submit"
                className="ml-4 purpleButton"
              >
                {isLastStep ? "Submit" : "Next"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default WizardFormStepper;
