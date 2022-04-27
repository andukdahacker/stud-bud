import { mutationField, nonNull } from "nexus";
import {
  ChangePasswordInput,
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
} from "../inputs";
import { AuthOutput } from "../outputs";
import argon2 from "argon2";
import { validateRegisterInput } from "../../utils/validateRegisterInput";
import { validateLoginInput } from "../../utils/validateLoginInput";
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from "../../constants";
import { v4 } from "uuid";
import { sendMail } from "../../utils/emailService";
import { validateChangePasswordInput } from "../../utils/validateChangePasswordInput";

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
            message: "Invalid register inputs",
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
            message: "User already existed",
          },
        };

      //hash password and create new user
      const hashedPassword = await argon2.hash(password);
      const newUser = await ctx.prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashedPassword,
        },
      });

      //all good
      return {
        IOutput: {
          code: 200,
          success: true,
          message: "User registered successfully",
        },
        User: newUser,
      };
    } catch (error) {
      return {
        IOutput: {
          code: 500,
          success: false,
          message: `Internal server error at RegisterMutation ${error}`,
        },
      };
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
            message: "Invalid login inputs",
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
            message: "Incorrect email",
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
            message: "Incorrect password",
          },
          ErrorFieldOutput: [
            { field: "password", message: "Incorrect password" },
          ],
        };

      // all good -> add userId into express-session -> return user
      ctx.req.session.userId = existingUser.id;

      return {
        IOutput: {
          code: 200,
          success: true,
          message: "User logged in successfully",
        },
        User: existingUser,
      };
    } catch (error) {
      return {
        IOutput: {
          code: 500,
          success: false,
          message: `Internal server error at LoginMutation ${error}`,
        },
      };
    }
  },
});

export const LogoutMutation = mutationField("logout", {
  type: nonNull(AuthOutput),
  resolve: async (_root, _args, ctx) => {
    try {
      await new Promise<void>((resolve) => {
        ctx.req.session.destroy((err) => {
          ctx.res.clearCookie(COOKIE_NAME);
          if (err) {
            resolve();
            console.log("Log out error", err);
          }
          resolve();
        });
      });

      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Logged out successfully",
        },
      };
    } catch (error) {
      return {
        IOutput: {
          code: 500,
          success: false,
          message: `Internal server error at LogoutMutation ${error}`,
        },
      };
    }
  },
});

export const forgotPassword = mutationField("forgotPassword", {
  type: AuthOutput,
  args: {
    input: nonNull(ForgotPasswordInput),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const { email } = args.input;
      const existingUser = await ctx.prisma.user.findUnique({
        where: { email },
      });
      if (!existingUser)
        return {
          IOutput: {
            code: 400,
            success: false,
            message: "User does not exist",
          },
        };
      const token = v4();
      const expiringTime = 1000 * 60 * 60;
      const key = FORGOT_PASSWORD_PREFIX + token;

      await ctx.redis.set(key, existingUser.id, "EX", expiringTime);

      const changePasswordURL = `http://localhost:3000/changepassword/${token}`;

      const message = `
    <h1>You have requested a password reset</h1>
    <p>Click the link below to continue the process</p>
    <a href=${changePasswordURL} clicktracking=off>${changePasswordURL}</a>
    `;
      const sendMailResult = await sendMail(
        email,
        "STUDBUD PASSWORD RESET REQUEST",
        message
      );

      if (!sendMailResult) {
        await ctx.redis.del(key);
        return {
          IOutput: {
            code: 400,
            success: false,
            message: "Something is wrong. Please try again",
          },
        };
      }
      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Check your email to continue",
        },
      };
    } catch (error) {
      return {
        IOutput: {
          code: 500,
          success: false,
          message: `Internal server error ${JSON.stringify(error)}`,
        },
      };
    }
  },
});

export const changePassword = mutationField("changePassword", {
  type: AuthOutput,
  args: {
    input: nonNull(ChangePasswordInput),
  },
  resolve: async (_root, args, ctx) => {
    const { newPassword, token } = args.input;
    const validateChangePasswordInputErrors =
      validateChangePasswordInput(newPassword);
    if (validateChangePasswordInputErrors.length > 0)
      return {
        IOutput: {
          code: 400,
          success: false,
          message: "Invalid password format",
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
            message: "Invalid token or token expired",
          },
          ErrorFieldOutput: [
            { field: "token", message: "Invalid token or token expired" },
          ],
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

      const hashNewPassword = await argon2.hash(newPassword);

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
      return {
        IOutput: {
          code: 500,
          success: false,
          message: `Internal server error ${JSON.stringify(error)}`,
        },
      };
    }
  },
});
