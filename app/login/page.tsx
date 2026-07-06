"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useRouter} from "next/navigation"
import { supabase } from "../../lib/supabase"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")

  async function handleLogin() {
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setMessage("Email ou mot de passe obligatoire");
      setMessageType("error")
      return;
    }


   
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(cleanEmail)) {
  setMessage("Veuillez entrer une adresse e-mail valide.");
  setMessageType("error");
  return;
}
setLoading(true);

    const { error} = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: cleanPassword,
    });

    if(error) {
       setLoading(false);
      setMessage("Email ou mot de passe incorrect.")
      setMessageType("error")
      return
    }

    setLoading(false);
    
    setMessage("connexion reussie !" );
    setMessageType("succes");

    setTimeout(() => {
      router.push("/")
    }, 1200);
  }

  const inputStyle = 
  " w-full p-3 rounded-lg bg-white/10 text-white mb-3 outline-none border border-white/10 placeholder-white/60 "

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-red-600">
        <div className="flex flex-col items-center justify-center h-full text-white text-center px-6 blur-sm scale-110">
          <h1 className="text-6xl font-bold mb-6">
            Internet rapide pour tous 
          </h1>

          <p className="max-w-2xl text-xl opacity-90">
            connectez vous a un wifi stable, rapide et abordable partout avec ITESA WIFI
          </p>
        </div>

      </div>
      <div className="absolute inset-0 bg-black/50 r"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl w-[420px] shadow-2xl">
        
        <h1 className="text-4xl text-white font-bold mb-2 text-center">
          se connecter
        </h1>

        <p className="text-gray-300 mb-4 text-center">
          Accedez a votre compte ITESA WIFI
        </p>

       {message && (
        <p className={`text-center mb-4 font-medium ${
          messageType === "error" ? "text-red-400" : "text-green-400"
        }`}>
          {message}
        </p>
       )}

       <input 
       placeholder="Email"
       value={email}
       className={inputStyle}
       onChange={(e) => setEmail(e.target.value)}
       />
<div className="relative">

  <input
    type={showPassword ? "text" : "password"}
    placeholder="Mot de passe"
    value={password}
    className={`${inputStyle}`}
    onChange={(e) => setPassword(e.target.value)}
    
    
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className=" absolute py-4 px-3  right-0 text-white/70 hover:text-white"
  >
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
</div>

   <div className="flex justify-end mb-3">
  <button
    onClick={() => router.push("/forgot-password")}
    className=" text-xs sm:text-sm text-white/70 hover:text-white underline transition"
  >
    Mot de passe oublié ?
  </button>
</div>
       
<button
  onClick={handleLogin}
  disabled={loading}
  className={`w-full p-3 rounded-lg text-white font-bold transition ${
    loading
      ? "bg-gray-500 cursor-not-allowed"
      : "bg-red-600 hover:bg-red-700"
  }`}
>
  {loading ? "Connexion..." : "Se connecter"}
</button>
         <button
       onClick={() => router.push("/")}
       className="w-full mt-3 border border-white/20 text-white p-3 rounded-lg hover:bg-white/10 transition"
       >
         ← retour a laccueil
       </button>
        </div>
      </div>

    </main>
  )
}