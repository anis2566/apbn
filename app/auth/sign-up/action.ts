"use server";

import { User } from "next-auth";
import { Knock } from "@knocklabs/node";
import { redirect } from "next/navigation";
import axios from "axios";

import { db } from "@/lib/prisma";
import { SignInSchemaType } from "../sign-in/schema";
import { SignUpSchema } from "./schema";
import { saltAndHashPassword } from "@/lib/utils";
import streamServerClient from "@/lib/stream";

const knock = new Knock(process.env.NEXT_PUBLIC_KNOCK_API_KEY);

export const SIGN_UP = async (values: SignInSchemaType) => {
  const { data, success } = SignUpSchema.safeParse(values);
  if (!success) {
    throw new Error("Invalid input value");
  }

  const user = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    throw new Error("User already exists");
  }

  const hashedPassword = saltAndHashPassword(data.password);

  const newUser = await db.$transaction(async (ctx) => {
    const newUser = await ctx.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    await knock.users.identify(newUser.id, {
      name: newUser.name ?? "Guest",
      avatar: newUser.image,
    });

    await streamServerClient.upsertUser({
      id: newUser.id,
      name: data.name,
      username: data.name,
    });

    return newUser; 
  });

  const { data: res } = await axios.post(
    `${
      process.env.NODE_ENV === "production"
        ? "https://scout-org.vercel.app/api/send-email"
        : "http://localhost:3000/api/send-email"
    }`,
    {
      email: newUser.email,
      id: newUser.id,
    }
  );
  if (res?.success) {
    redirect(`/auth/verify/${newUser.id}`);
  } else {
    throw new Error("Something went wrong! Try again!");
  }
};

export const CREATE_STREAM_USER = async (user: User) => {
  await streamServerClient.upsertUser({
    id: user.id ?? "",
    username: user.name || "Guest",
    name: user.name || "Guest",
  });
};
