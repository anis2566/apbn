import { Metadata } from "next";

import { SignInForm } from "./_components/sign-in-form"

export const metadata: Metadata = {
  title: "APBn Scouts | Sign In",
  description: "Apbn scouts group",
};

const SignIn = () => {
  return <SignInForm />
}

export default SignIn
