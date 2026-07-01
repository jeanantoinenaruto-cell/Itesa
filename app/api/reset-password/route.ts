import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Missing data" },
        { status: 400 }
      );
    }

    // 1. vérifier token
    const { data, error } = await supabaseAdmin
      .from("reset_tokens")
      .select("*")
      .eq("token", token)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Token invalide" },
        { status: 400 }
      );
    }

    // 2. vérifier expiration
    if (Date.now() > data.expires_at) {
      return NextResponse.json(
        { error: "Token expiré" },
        { status: 400 }
      );
    }

    // 3. update password dans table users
    const { error: updateError } = await supabaseAdmin
      .from("users")
      .update({ password })
      .eq("email", data.email);

    if (updateError) {
      return NextResponse.json(
        { error: "Update failed" },
        { status: 500 }
      );
    }

    // 4. supprimer token
    await supabaseAdmin
      .from("reset_tokens")
      .delete()
      .eq("token", token);

    return NextResponse.json({ success: true });

  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}