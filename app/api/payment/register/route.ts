import axios from "axios"
import { NextResponse } from "next/server";

type CreatePayment = {
    token: string;
    scoutId: string;
    amount: number;
}
export async function POST ({token, scoutId, amount}: CreatePayment) {
    const bkash_headers = async () => {
        return {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: token,
          "x-app-key": process.env.NEXT_PUBLIC_PGW_BKASH_API_KEY,
        };
      };

    const { data } = await axios.post(
        process.env.NEXT_PUBLIC_PGW_BKASH_CREATE_PAYMENT_URL!,
        {
          mode: "0011",
          payerReference: " ",
          callbackURL: `/payment/register/verify?userId=${scoutId}`,
          amount: amount,
          currency: "BDT",
          intent: "sale",
          merchantInvoiceNumber: "Inv" + Math.floor(100000 + Math.random() * 900000),
        },
        {
            headers: await bkash_headers(),
        }
    );

    return NextResponse.json({url: data?.bkashURL});
}