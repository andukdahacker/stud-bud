import { ReactElement } from "react";

const TextError = (props: any): ReactElement => {
  return <div style={{ color: "red" }}>{props.children}</div>;
};

export default TextError;
