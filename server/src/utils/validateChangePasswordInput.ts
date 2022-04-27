export const validateChangePasswordInput = (password: string) => {
  let errors = [];

  //password validation (min 8 letter password, with at least a symbol, upper and lower case letters and a number)
  let passwordRegexPattern: RegExp =
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const validPassword: Boolean = passwordRegexPattern.test(password);

  if (!validPassword) {
    errors.push({ field: "password", message: "Invalid password format" });
  }

  return errors;
};
