import { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

import { SignInForm } from "./_components/sign-in-form"

export const metadata: Metadata = {
  title: "APBn Scouts | Sign In",
  description: "Apbn scouts group",
};

const SignIn = () => {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center text-muted-foreground">
      <Loader2 className="w-10 h-10 animate-spin" />
    </div>}>
      <SignInForm />
    </Suspense>
  )
}

export default SignIn
