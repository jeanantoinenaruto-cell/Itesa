"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email) {
      setMessage("Entre ton email");
      return;
    }

    setLoading(true);
    setMessage("");


    

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Email envoyé 📩 vérifie ta boîte");
        setTimeout(() => {
          router.replace("/")
        }, 3000)

        return
      } else {
        setMessage("Erreur lors de l'envoi ❌");
      }
    } catch (error) {
      setMessage("Erreur serveur ❌");
    }

    
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4">
      
      <div className="w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-xl p-6 rounded-2xl text-white">

        <h1 className="text-2xl font-bold text-center mb-4">
          Mot de passe oublié
        </h1>

        <p className="text-center text-white/70 mb-4 text-sm">
          Entre ton email pour recevoir un lien de réinitialisation
        </p>

        <input
          className="w-full p-3 rounded-lg bg-white/10 outline-none mb-3 text-white"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-red-600 p-3 rounded-lg font-bold hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading ? "Envoi..." : "Envoyer le lien"}
        </button>

        {message && (
          <p className="text-center mt-4 text-sm text-white/80">
            {message}
          </p>
        )}

        <button
          onClick={() => router.push("/login")}
          className="w-full mt-3 text-sm text-white/60 hover:text-white underline"
        >
          Retour login
        </button>

      </div>
    </main>
  );
}  