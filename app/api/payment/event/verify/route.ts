import { db } from "@/lib/prisma";
import { AppStatus, PaymentStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Get the URL from the request
    const url = new URL(request.url);

    // Extract query parameters
    const queryParams = Object.fromEntries(url.searchParams.entries());

    // Parse the POST body (URL-encoded data)
    const data = await request.text();
    const params = new URLSearchParams(data);
    const paymentData = Object.fromEntries(params.entries());

    // Construct the base URL dynamically
    const baseUrl = `${url.protocol}//${url.host}`;

    if (paymentData.pay_status === "Successful") {
      if (queryParams.eventId && queryParams.id) {
        await db.eventApplication.create({
          data: {
            scoutId: queryParams.id,
            eventId: queryParams.eventId,
            paymentStatus: PaymentStatus.Paid,
            status: AppStatus.Approved,
          },
        });
      }
      return NextResponse.redirect(
        `${baseUrl}/payment/success?callback=/scout`,
        303
      );
    } else {
      return NextResponse.redirect(`${baseUrl}/payment/fail`, 303);
    }
  } catch (error) {
    console.log(error);
  }
}
