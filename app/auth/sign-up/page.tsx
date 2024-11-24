import { Metadata } from "next";
import { SignUpForm } from "./_components/sign-up-form"

export const metadata: Metadata = {
    title: "APBn Scouts | Sign Up",
    description: "Apbn scouts group",
};


const SignUp = () => {
    return <SignUpForm />
}

export default SignUp