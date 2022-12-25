import { FormikConfig, FormikValues } from "formik";

const WizardFormStep = ({ children }: Partial<FormikConfig<FormikValues>>) => {
  return <>{children}</>;
};

export default WizardFormStep;
