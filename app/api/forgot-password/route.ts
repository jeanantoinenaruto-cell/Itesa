import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email manquant" },
        { status: 400 }
      );
    }

    const token = crypto.randomUUID();
    const expires_at = Date.now() + 15 * 60 * 1000;

    // 🔥 DEBUG ICI
    console.log("EMAIL:", email);
    console.log("TOKEN:", token);
    console.log("BREVO KEY EXISTS:", !!process.env.BREVO_API_KEY);

    const { error } = await supabaseAdmin.from("reset_tokens").insert({
      email,
      token,
      expires_at,
    });

    if (error) {
      console.log("SUPABASE ERROR:", error);

      return NextResponse.json(
        { error: "DB error" },
        { status: 500 }
      );
    }

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: {
          name: "ITESA",
          email: "tech@itesagroup.com",
        },
        to: [{ email }],
        subject: "Reset password",
        htmlContent: `
          <div>
            <h2>Mot de passe oublié</h2>
            <p>Clique sur le lien :</p>
            <a href="${resetLink}">Reset password</a>
            <p style="color:gray;font-size:12px;">
              Expire dans 15 minutes
            </p>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("BREVO ERROR:", data);

      return NextResponse.json(
        { error: "Email error" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.log("SERVER ERROR:", err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}