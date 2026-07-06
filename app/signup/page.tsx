"use client";
import { Eye, EyeOff } from "lucide-react"


import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Signup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false)

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  async function handleSignup() {
    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();
    const cleanPassword = password.trim();

    if (
      !cleanFirstName ||
      !cleanLastName ||
      !cleanEmail ||
      !cleanPhone ||
      !cleanPassword
    ) {
      setMessage("Tous les champs sont obligatoires.");
      setMessageType("error");
      return;
    }

    const phoneRegex = /^[34]\d{7}$/;
    if (!phoneRegex.test(cleanPhone)) {
      setMessage("Numéro invalide (8 chiffres, commence par 3 ou 4).");
      setMessageType("error");
      return;
    }

    // 🔥 1. CRÉER COMPTE SUPABASE AUTH
    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password: cleanPassword,
        options: {
    data: {
      first_name: cleanFirstName,
      last_name: cleanLastName,
    },
  },
    });
    
   if (error) {
  if (error.message.includes("already")) {
    setMessage("Vous avez déjà un compte. Connectez-vous.");
  } else {
    setMessage(error.message);
  }

  setMessageType("error");
  return;
}


    // 🔥 2. AJOUTER INFOS DANS TA TABLE USERS
  const { error: insertError } = await supabase.from("users").insert([
  {
    id: data?.user?.id,   
    first_name: cleanFirstName,
    last_name: cleanLastName,
    email: cleanEmail,
    phone: cleanPhone,
  },
]);

if (insertError) {
  if (insertError.message.includes("duplicate")) {
    setMessage("Vous avez déjà un compte. Connectez-vous.");
  } else {
    setMessage("Une erreur est survenue. Réessayez plus tard.");
    console.log(insertError);
  }

  setMessageType("error");
  return;
}
    setMessage("Compte créé avec succès !");
    setMessageType("success");

    setTimeout(() => {
      router.push("/");
    }, 1200);
  }

  const inputStyle =
    "w-full p-3 rounded-lg bg-white/10 text-white mb-3 outline-none border border-white/10 placeholder-white/60";

  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-red-600">
        <div className="flex flex-col items-center justify-center h-full text-white text-center px-6 blur-sm scale-110">
          <h1 className="text-6xl font-bold mb-6">
            Internet rapide pour tous 📡
          </h1>
          <p className="max-w-2xl text-xl opacity-90">
            Connectez-vous à un WiFi stable, rapide et abordable partout avec ITESA WIFI.
          </p>
        </div>
      </div>

      <div className="absolute inset-0 bg-black/50"></div>

      {/* FORM */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl w-[420px] shadow-2xl">

          <h1 className="text-4xl text-white font-bold mb-2 text-center">
            🚀 Créer un compte
          </h1>

          <p className="text-gray-300 mb-4 text-center">
            Rejoignez ITESA WIFI
          </p>

          {message && (
            <p className={`text-center mb-4 font-mdium ${messageType === "error" ? "text-red-400" :"text-green-400"}`}>
                {message}
            </p>
          )}

          <input
            placeholder="Prenom"
            value={firstName}
            className={inputStyle}
            onChange={(e) => setFirstName(e.target.value)}
   
          />

          <input
            placeholder="Nom"
            value={lastName}
            className={inputStyle}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type = "email"
            placeholder="Email"
            value={email}
            className={inputStyle}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type = "tel"
            placeholder="Téléphone"
            value={phone}
            className={inputStyle}
            onChange={(e) => setPhone(e.target.value)}
          />
 <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            className={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
          />


  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className=" absolute py-4 px-3  right-0 -translate-y-1/2 text-white/70 hover:text-white"
  >
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>

  </div>

  

          <button
            onClick={handleSignup}
            className="w-full bg-red-600 p-3 rounded-lg text-white font-bold hover:bg-red-700 transition"
          >
            Créer compte
          </button>

          <button
            onClick={() => router.push("/login")}
            className="w-full mt-3 bg-red-600 p-3 rounded-lg text-white font-bold hover:bg-red-700 transition"
          >
            Se connecter
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full mt-3 border border-white/20 text-white p-3 rounded-lg hover:bg-white/10 transition"
          >
            ← Retour accueil
          </button>

        </div>

      </div>

    </main>
  );
}