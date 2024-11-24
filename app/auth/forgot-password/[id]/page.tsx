import { Metadata } from "next";

import { VerifyForm } from "./_components/verify-form";

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
    return <VerifyForm id={id} />
}

export default VerifyPage