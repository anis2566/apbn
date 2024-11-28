import { NextRequest } from "next/server";

import axios from "axios";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const paymentID = searchParams.get("paymentID");
  const token = searchParams.get("token");
  const scoutId = searchParams.get("scoutId");

  if (!scoutId) redirect("/");

  const res = await axios.post(
    process.env.NEXT_PUBLIC_PGW_BKASH_EXECUTE_PAYMENT_URL!,
    { paymentID },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: token,
        "x-app-key": process.env.NEXT_PUBLIC_PGW_BKASH_API_KEY,
      },
    }
  );

  if (res.data && res.data?.statusCode === "0000") {
    await db.scout.update({
      where: {
        id: scoutId,
      },
      data: {
        isPaid: true,
      },
    });
    redirect("/payment/success");
  } else {
    redirect("/payment/fail");
  }
}
