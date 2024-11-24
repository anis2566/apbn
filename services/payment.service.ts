"use server";

import axios from "axios";

type PayForRegistration = {
  scoutId: string;
  amount: string;
}

export const PAY_FOR_REGISTRATION = async ({scoutId, amount}:PayForRegistration) => {
  const transactionId = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    const res = await axios.post("https://sandbox.aamarpay.com/jsonpost.php", {
      store_id: "aamarpaytest",
      signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
      cus_name: "Imtiaz Akil",
      cus_email: "imtiaz.akil@softbd.com",
      cus_phone: "01870762472",
      cus_add1: "53, Gausul Azam Road, Sector-14, Dhaka, Bangladesh",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_country: "Bangladesh",
      amount: amount,
      tran_id: transactionId,
      currency: "BDT",
      success_url: `https://www.apbnscouts.org/api/payment/verify?id=${scoutId}`,
      fail_url: "https://example.com/fail.php",
      cancel_url: "https://example.com/cancel.php",
      desc: "Lend Money",
      type: "json",
    });
    return {
      url: res.data?.payment_url,
    };
  } catch (error) {
    console.log(error);
  }
};


type PayForEvent = {
  scoutId: string;
  amount: string;
  eventId: string;
}

export const PAY_FOR_EVENT = async ({scoutId, amount, eventId}:PayForEvent) => {
  const transactionId = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    const res = await axios.post("https://sandbox.aamarpay.com/jsonpost.php", {
      store_id: "aamarpaytest",
      signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
      cus_name: "Imtiaz Akil",
      cus_email: "imtiaz.akil@softbd.com",
      cus_phone: "01870762472",
      cus_add1: "53, Gausul Azam Road, Sector-14, Dhaka, Bangladesh",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_country: "Bangladesh",
      amount: amount,
      tran_id: transactionId,
      currency: "BDT",
      success_url: `https://www.apbnscouts.org/api/payment/event/verify?id=${scoutId}&eventId=${eventId}`,
      fail_url: "https://example.com/fail.php",
      cancel_url: "https://example.com/cancel.php",
      desc: "Lend Money",
      type: "json",
    });
    return {
      url: res.data?.payment_url,
    };
  } catch (error) {
    console.log(error);
  }
};
