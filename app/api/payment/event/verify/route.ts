import { NextRequest } from "next/server";

import axios from "axios";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AppStatus, PaymentStatus } from "@prisma/client";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const paymentID = searchParams.get("paymentID");
  const token = searchParams.get("token");
  const scoutId = searchParams.get("scoutId");
  const appId = searchParams.get("appId");

  if (!scoutId || !appId) redirect("/");

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
    await db.eventApplication.update({
      where: {
        id: appId,
      },
      data: {
        paymentStatus: PaymentStatus.Paid,
        status: AppStatus.Approved,
      },
    });
    redirect("/payment/success?callback=/scout/event");
  } else {
    redirect(`/payment/fail?redirectUrl=/scout/event`);
  }
}
