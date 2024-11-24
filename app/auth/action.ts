"use server";

import { signIn } from "@/auth";

type GoogleSignIn = {
  callback: string | null;
};

export const SIGN_IN_WITH_GOOGLE = async ({ callback }: GoogleSignIn) => {
  await signIn("google", {
    redirectTo: callback ? callback : "/",
  });
};
