import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, plan } = await req.json();

    if (!amount || !plan) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const secretKey = process.env.MONCASH_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { error: "Missing MONCASH_SECRET_KEY in env" },
        { status: 500 }
      );
    }

    const res = await fetch(
      "https://hvlmeoqyxaguzcujpmit.supabase.co/functions/v1/pay-create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secretKey}`,
        },
        body: JSON.stringify({
          amount,
          plan,
          referenceId: `order_${Date.now()}`,
          returnUrl: "https://itesa-app.vercel.app/success",
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error || "Payment failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: data.paymentUrl });

  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}