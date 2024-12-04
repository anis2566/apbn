import { Metadata } from "next";

import { VerifyForm } from "./_components/verify-form";
import { VerifyForm2 } from "./_components/verify-form-2";

export const metadata: Metadata = {
    title: "APBn Scouts | Verify",
    description: "Apbn scouts group",
};

interface Props {
    params: {
        id: string;
    }
}

const VerifyPage = ({ params: { id } }: Props) => {
    return <VerifyForm2 id={id} />
}

export default VerifyPage