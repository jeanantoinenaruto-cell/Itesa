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

    // 1. trouver user
    const { data, error: userError } =
      await supabaseAdmin.auth.admin.listUsers();

    if (userError) {
      console.log("USER ERROR:", userError);
      return NextResponse.json(
        { error: "User fetch error" },
        { status: 500 }
      );
    }

    const user = data.users.find((u) => u.email === email);

    if (!user) {
      return NextResponse.json(
        { error: "User introuvable" },
        { status: 404 }
      );
    }

    const token = crypto.randomUUID();
    const expires_at = Date.now() + 15 * 60 * 1000;

    console.log("EMAIL:", email);
    console.log("TOKEN:", token);

    // 2. save token
    const { error } = await supabaseAdmin
      .from("reset_tokens")
      .insert({
        email,
        token,
        user_id: user.id,
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

    // 3. BREVO EMAIL (DEBUG COMPLET)
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
        to: [
          {
            email: email,
          },
        ],
        subject: "Reset password",
        htmlContent: `
          <div>
            <h2>Reset password</h2>
            <p>Clique ici :</p>
            <a href="${resetLink}">Reset</a>
          </div>
        `,
      }),
    });

    const brevoData = await response.json();

    console.log("BREVO STATUS:", response.status);
    console.log("BREVO RESPONSE:", brevoData);

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Brevo error",
          details: brevoData,
        },
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