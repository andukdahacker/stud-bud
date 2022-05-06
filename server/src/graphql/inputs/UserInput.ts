import { inputObjectType } from "nexus";

export const RegisterInput = inputObjectType({
  name: "RegisterInput",
  definition(t) {
    t.nonNull.string("username");
    t.nonNull.string("email");
    t.nonNull.string("password");
  },
});

export const LoginInput = inputObjectType({
  name: "LoginInput",
  definition(t) {
    t.nonNull.string("email");
    t.nonNull.string("password");
  },
});

export const ForgotPasswordInput = inputObjectType({
  name: "ForgotPasswordInput",
  definition(t) {
    t.nonNull.string("email");
  },
});

export const ChangePasswordInput = inputObjectType({
  name: "ChangePasswordInput",
  definition(t) {
    t.nonNull.string("token");
    t.nonNull.string("password");
  },
});

export const VerifyEmailInput = inputObjectType({
  name: "VerifyEmailInput",
  definition(t) {
    t.nonNull.string("token");
  },
});
