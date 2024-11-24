import { Metadata } from "next";
import { ApplyForm } from "./_components/apply-form";

export const metadata: Metadata = {
    title: "APBn Scouts | Apply",
    description: "Apbn scouts group",
};


const Apply = () => {
  return <ApplyForm />
}

export default Apply
