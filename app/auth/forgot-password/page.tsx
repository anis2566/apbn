import { Metadata } from "next";

import { PasswordForm } from "./_components/password-form";

export const metadata: Metadata = {
    title: "APBn Scouts | Forgot Password",
    description: "Apbn scouts group",
};

const ForgotPassword = () => {
    return <PasswordForm />
}

export default ForgotPassword;