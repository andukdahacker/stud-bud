import { PropsWithChildren } from "react";

interface FormLayoutProps {
  title: string;
}
const FormLayout = ({
  children,
  title,
}: PropsWithChildren<FormLayoutProps>) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full bg-white border-2 border-black">
        <div className="flex items-center justify-center w-full h-16 text-center border-b-2 border-black ">
          <div className="px-2 text-xl font-medium">{title}</div>
        </div>
        <div className="w-full h-full grow">{children}</div>
      </div>
    </>
  );
};

export default FormLayout;
