"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";
import axios from "axios";
import { Knock } from "@knocklabs/node";
import bcrypt from "bcryptjs";

import { signIn } from "@/auth";
import { SignInSchemaType } from "./schema";
import { db } from "@/lib/prisma";

const knock = new Knock(process.env.NEXT_PUBLIC_KNOCK_API_KEY);

type SignInUser = {
  values: SignInSchemaType;
  callback: string | null;
};

export const SIGN_IN_USER = async ({ values, callback }: SignInUser) => {
  const user = await db.user.findUnique({
    where: {
      email: values.email,
    },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isPasswordValid = await bcrypt.compare(
    values.password,
    user.password || ""
  );

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    // if (!user.emailVerified) {
    //   const apiUrl =
    //     process.env.NODE_ENV === "production"
    //       ? "https://www.apbnscouts.org/api/send-email"
    //       : "http://localhost:3000/api/send-email";

    //   const { data } = await axios.post(apiUrl, {
    //     email: user.email,
    //     id: user.id,
    //   });

    //   if (data?.success) {
    //     redirect(`/auth/verify/${user.id}`);
    //   } else {
    //     throw new Error("Something went wrong! Try again!");
    //   }
    // } else {
    //   await signIn("credentials", {
    //     email: values.email,
    //     password: hashedPassword,
    //     redirect: false,
    //   });

    // }

    return { success: "Login successful", user };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof Error) {
      const { type, cause } = error as AuthError;

      switch (type) {
        case "CredentialsSignin":
          throw new Error("Invalid credentials");
        case "CallbackRouteError":
          throw new Error("Invalid credentials");
        default:
          console.log(error);
          throw new Error("Something went wrong");
      }
    }
  }
};

export const VERIFY_EMAIL = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await db.user.update({
    where: {
      email,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  await knock.users.identify(user.id, {
    name: user.name ?? "Guest",
    avatar: user.image,
  });

  try {
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "https://www.apbnscouts.org/api/auth/verify-email"
        : "http://localhost:3000/api/auth/verify-email";

    const { data } = await axios.post(apiUrl, {
      user,
    });
    return;
  } catch (error) {
    console.log(error);
  }
};
