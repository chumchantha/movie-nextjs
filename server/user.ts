"use server";

import { auth } from "@/lib/auth";
import { Signin, Signup } from "@/types/auth.type";

export const signIn = async ({ email, password }: Signin) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
      success: true,
      message: "Signed in successfully.",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to signin!",
    };
  }
};

export const signUp = async ({ email, password, name }: Signup) => {
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
    return {
      success: true,
      message: "Sign up successfully.",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to signup!",
    };
  }
};

export const logOut = async () => {
  try {
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to signout!",
    };
  }
};
