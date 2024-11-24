import { VerifyForm } from "./_components/verify-form";

interface Props {
    params: {
        id: string;
    }
}

const Verify = ({params:{id}}:Props) => {
    return <VerifyForm id={id} />
}

export default Verify