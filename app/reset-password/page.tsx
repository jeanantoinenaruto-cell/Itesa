"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset() {
    if (!password || !token) {
      setMessage("Données manquantes");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    setLoading(false);

    if (!data.success) {
      setMessage(data.error || "Erreur reset");
      return;
    }

    setMessage("Mot de passe changé !");
    setTimeout(() => router.push("/login"), 1500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-6 bg-white/10 rounded-xl">
        <h1 className="text-xl mb-4">Reset password</h1>

        <input
          type="password"
          placeholder="Nouveau mot de passe"
          className="w-full p-3 mb-3 text-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-red-600 p-3"
        >
          {loading ? "Loading..." : "Changer mot de passe"}
        </button>

        {message && <p className="mt-3">{message}</p>}
      </div>
    </div>
  );
}