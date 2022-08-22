import { mutationField, nonNull } from "nexus";
import {
  ChangePasswordInput,
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  VerifyEmailInput,
} from "../inputs";
import { AuthOutput } from "../outputs";
import argon2 from "argon2";
import { validateRegisterInput } from "../../utils/validateRegisterInput";
import { validateLoginInput } from "../../utils/validateLoginInput";
import {
  COOKIE_NAME,
  EMAIL_VERIFICATION_PREFIX,
  FORGOT_PASSWORD_PREFIX,
  INTERNAL_SERVER_ERROR,
  INVALID_INPUT,
  INVALID_TOKEN,
  UNVERIFIED,
  __prod__,
} from "../../constants";
import { sendIMail } from "../../utils/emailService";
import { validateChangePasswordInput } from "../../utils/validateChangePasswordInput";
import { validateForgotPasswordInput } from "../../utils/validateForgotPasswordInput";

export const RegisterMutation = mutationField("register", {
  type: nonNull(AuthOutput),
  args: {
    input: nonNull(RegisterInput),
  },
  resolve: async (_root, args, ctx) => {
    const { username, email, password } = args.input;
    try {
      //validate register inputs -> if invalid, return errors
      const validateRegisterErrors = validateRegisterInput(
        username,
        email,
        password
      );

      if (validateRegisterErrors.length > 0)
        return {
          IOutput: {
            code: 400,
            success: false,
            message: INVALID_INPUT,
          },
          ErrorFieldOutput: validateRegisterErrors,
        };

      //look for existing user -> if exists, return error
      const existingUser = await ctx.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser)
        return {
          IOutput: {
            code: 400,
            success: false,
            message: INVALID_INPUT,
          },
          ErrorFieldOutput: [
            { field: "email", message: "User already existed" },
          ],
        };

      //hash password and create new user
      const hashedPassword = await argon2.hash(password);
      const newUser = await ctx.prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashedPassword,
          isVerified: __prod__ ? false : true,
        },
      });

      if (__prod__) {
        await sendIMail(ctx, newUser.id, email, "verifyEmail");
      }

      //all good
      return {
        IOutput: {
          code: 200,
          success: true,
          message:
            "User registered successfully. Please check your email to verify your account",
        },
        User: newUser,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const VerifyEmail = mutationField("verifyEmail", {
  type: nonNull(AuthOutput),
  args: {
    input: nonNull(VerifyEmailInput),
  },
  resolve: async (_root, args, ctx) => {
    const { token } = args.input;

    try {
      const key = EMAIL_VERIFICATION_PREFIX + token;

      const userId = await ctx.redis.get(key);

      if (!userId) {
        return {
          IOutput: {
            code: 400,
            success: false,
            message: INVALID_TOKEN,
          },
        };
      }

      const verifiedUser = await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          isVerified: true,
        },
      });

      await ctx.redis.del(key);

      ctx.req.session.userId = userId;

      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Email verified successfully",
        },
        User: verifiedUser,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const LoginMutation = mutationField("login", {
  type: nonNull(AuthOutput),
  args: {
    input: nonNull(LoginInput),
  },
  resolve: async (_root, args, ctx) => {
    const { email, password } = args.input;
    try {
      //validage login inputs -> if errors, return errors
      const validateLoginInputErrors = validateLoginInput(email, password);
      if (validateLoginInputErrors.length > 0)
        return {
          IOutput: {
            code: 400,
            success: false,
            message: INVALID_INPUT,
          },
          ErrorFieldOutput: validateLoginInputErrors,
        };

      //look for existing user by email -> if not exist, return error
      const existingUser = await ctx.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!existingUser)
        return {
          IOutput: {
            code: 400,
            success: false,
            message: INVALID_INPUT,
          },
          ErrorFieldOutput: [{ field: "email", message: "Incorrect email" }],
        };

      //verify input.password with existingUser.password -> if error, return error
      const validPassword = await argon2.verify(
        existingUser.password,
        password
      );
      if (!validPassword)
        return {
          IOutput: {
            code: 400,
            success: false,
            message: INVALID_INPUT,
          },
          ErrorFieldOutput: [
            { field: "password", message: "Incorrect password" },
          ],
        };

      // user is unverified -> resend a verification email
      if (existingUser.isVerified === false) {
        // await sendVerificationEmail(ctx, existingUser.id, existingUser.email);
        await sendIMail(ctx, existingUser.id, email, "verifyEmail");
        return {
          IOutput: {
            code: 400,
            success: false,
            message: UNVERIFIED,
          },
        };
      }

      // all good -> add userId into express-session -> return user
      ctx.req.session.userId = existingUser.id;

      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Logged in successfully",
        },
        User: existingUser,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const LogoutMutation = mutationField("logout", {
  type: nonNull(AuthOutput),
  resolve: async (_root, _args, ctx) => {
    try {
      const logOutResult = await new Promise<boolean>((resolve) => {
        ctx.req.session.destroy((err) => {
          ctx.res.clearCookie(COOKIE_NAME);
          if (err) {
            resolve(false);
          }
          resolve(true);
        });
      });

      if (!logOutResult)
        return {
          IOutput: {
            code: 400,
            success: false,
            message: "Failed to log out",
          },
        };

      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Logged out successfully",
        },
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const forgotPassword = mutationField("forgotPassword", {
  type: AuthOutput,
  args: {
    input: nonNull(ForgotPasswordInput),
  },
  resolve: async (_root, args, ctx) => {
    const { email } = args.input;
    const validateForgotPasswordInputErrors =
      validateForgotPasswordInput(email);
    if (validateForgotPasswordInputErrors.length > 0)
      return {
        IOutput: {
          code: 400,
          success: false,
          message: INVALID_INPUT,
        },
        ErrorFieldOutput: validateForgotPasswordInputErrors,
      };
    try {
      const existingUser = await ctx.prisma.user.findUnique({
        where: { email },
      });
      if (!existingUser)
        return {
          IOutput: {
            code: 400,
            success: false,
            message: "Incorrect email",
          },
        };

      await sendIMail(ctx, existingUser.id, email, "forgotPassword");

      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Check your email to continue",
        },
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const changePassword = mutationField("changePassword", {
  type: AuthOutput,
  args: {
    input: nonNull(ChangePasswordInput),
  },
  resolve: async (_root, args, ctx) => {
    const { password, token } = args.input;
    const validateChangePasswordInputErrors =
      validateChangePasswordInput(password);
    if (validateChangePasswordInputErrors.length > 0)
      return {
        IOutput: {
          code: 400,
          success: false,
          message: INVALID_INPUT,
        },
        ErrorFieldOutput: validateChangePasswordInputErrors,
      };
    try {
      const key = FORGOT_PASSWORD_PREFIX + token;
      const userId = await ctx.redis.get(key);
      if (!userId) {
        await ctx.redis.del(key);
        return {
          IOutput: {
            code: 400,
            success: false,
            message: INVALID_TOKEN,
          },
        };
      }

      const existingUser = await ctx.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser)
        return {
          IOutput: {
            code: 400,
            success: false,
            message: "Cannot find user",
          },
        };

      const hashNewPassword = await argon2.hash(password);

      const updatedUser = await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashNewPassword,
        },
      });

      await ctx.redis.del(key);

      ctx.req.session.userId = userId;

      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Password changed successfully",
        },
        User: updatedUser,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});
