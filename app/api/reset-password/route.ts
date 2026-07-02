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

    // 1. récupérer token (SAFE)
    const { data, error } = await supabaseAdmin
      .from("reset_tokens")
      .select("*")
      .eq("token", token)
      .maybeSingle();

    if (error) {
      console.log("TOKEN QUERY ERROR:", error);
      return NextResponse.json(
        { error: "Token query error" },
        { status: 500 }
      );
    }

    if (!data) {
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

    // 3. vérifier user_id
    if (!data.user_id) {
      console.log("MISSING USER_ID:", data);
      return NextResponse.json(
        { error: "User ID manquant dans le token" },
        { status: 500 }
      );
    }

    // 4. update password Supabase Auth
    const { error: updateError } =
      await supabaseAdmin.auth.admin.updateUserById(
        data.user_id,
        { password }
      );

    if (updateError) {
      console.log("UPDATE ERROR:", updateError);
      return NextResponse.json(
        { error: "Password update failed" },
        { status: 500 }
      );
    }

    // 5. delete token
    const { error: deleteError } = await supabaseAdmin
      .from("reset_tokens")
      .delete()
      .eq("token", token);

    if (deleteError) {
      console.log("DELETE ERROR:", deleteError);
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