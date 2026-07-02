"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useRouter} from "next/navigation"
import { supabase } from "../../lib/supabase"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

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

    if(!cleanEmail.includes("@")) {
      setMessage("veuillez entrez un email valide")
      setMessageType("error")
      return
    }


    const { error} = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: cleanPassword,
    });

    if(error) {
      setMessage("Email ou mot de passe incorrect.")
      setMessageType("error")
      return
    }
    
    setMessage("connexion reussie !" );
    setMessageType("succes");

    setTimeout(() => {
      router.push("/")
    }, 1200);
  }

  const inputStyle = 
  " w-full p-3 rounded-lg bg-white/10 text-white mb-3 outline-none border border-white/10 placeholder-white/60"

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
      <div className="absolute inset-0 bg-black/50"></div>

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
    className="mb-0 -translate-y-1/2 text-white/70 hover:text-white"
  >
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>

  

   <div className="flex justify-end mb-3">
  <button
    onClick={() => router.push("/forgot-password")}
    className="text-xs sm:text-sm text-white/70 hover:text-white underline transition"
  >
    Mot de passe oublié ?
  </button>
</div>
       

       <button
       onClick={handleLogin} 
       className="w-full bg-red-600 p-3 rounded-lg text-white font-bold hover:bg-red-700 transition"
       >
        Se connecter

       </button>

       <button
       onClick={() => router.push("/signup")}
       className="w-full mt-3 border border-white/20 text-white p-3 rounded-lg hover:bg-white/10 transition"
       >
        creer un compte
       </button>

         <button
       onClick={() => router.push("/")}
       className="w-full mt-3 border border-white/20 text-white p-3 rounded-lg hover:bg-white/10 transition"
       >
        retour a laccueil
       </button>
        </div>
      </div>

    </main>
  )
}