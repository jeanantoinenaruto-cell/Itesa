"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

        <h1 className="text-xl mb-4 text-center">
          Reset password
        </h1>

   
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-3 p-3 pr-10 rounded-lg bg-white/10 text-white outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className=" mb-3 -translate-y-1/2 text-white/70"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        

        <button
          onClick={handleReset}
          className="w-full bg-red-600 p-3 rounded-lg font-bold"
        >
          {loading ? "Loading..." : "Changer mot de passe"}
        </button>

        {message && (
          <p className="mt-3 text-center text-sm text-white/70">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}