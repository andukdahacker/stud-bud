export const validateForgotPasswordInput = (email: string) => {
  let errors = [];

  let emailPattern: RegExp =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const emailTest: Boolean = emailPattern.test(email);

  if (!emailTest) {
    errors.push({ field: "email", message: "Invalid email format" });
  }

  return errors;
};
