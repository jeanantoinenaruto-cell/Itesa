"use client";

import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import {supabase} from "../../lib/supabase"

export default function Contact() {
  const { user } = useUser();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit() {
    if (!name || !email || !message) {
      setStatus("Veuillez remplir tous les champs.");
      return;
    }

    setStatus("Message envoyé ✅ (simulation)");
    setName("");
    setEmail("");
    setMessage("");
  }

  async function logout() {
    await supabase.auth.signOut()
    setOpen(false)
  }
  return (
    <main className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header className="relative flex justify-between items-center px-4 md:px-8 py-4 bg-amber-600 text-white shadow-md">

        <h1 className="text-2xl font-bold">ITESA WIFI</h1>

        {/* BURGER */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>

        {/* DESKTOP NAV (simple ici) */}
        <nav className="hidden md:flex space-x-6 font-medium items-center">
          <a href="/">Accueil</a>
          <a href="/plans">Plans</a>
          <a href="/contact">Contact</a>

          {!user ? (
            <>
              <a href="/signup">S'inscrire</a>
              <a href="/login">Se connecter</a>
            </>
          ) : (
             <>
              <span className="font-bold">👤 {user.name}</span>
              <button
                onClick={logout}
                className="bg-white text-red-600 px-3 py-1 rounded font-bold"
              >
                se deconnecter
              </button>
            </>
          )}
        </nav>

        {/* OVERLAY */}
        <div
          className={`fixed inset-0 bg-black/40 md:hidden transition-opacity duration-300 ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* MOBILE MENU */}
        <div
          className={`fixed top-0 right-0 h-full w-72 bg-amber-600 shadow-2xl md:hidden transform transition-transform duration-300 z-50 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-6 p-6 font-medium text-white">

            <a onClick={() => setOpen(false)} href="/">Accueil</a>
            <a onClick={() => setOpen(false)} href="/plans">Plans</a>
            <a onClick={() => setOpen(false)} href="/contact">Contact</a>

            {!user ? (
              <>
                <a onClick={() => setOpen(false)} href="/signup">S'inscrire</a>
                <a onClick={() => setOpen(false)} href="/login">Se connecter</a>
              </>
            ) : (
              <>
                <span className="font-bold">👤 {user.name}</span>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="bg-white text-red-600 px-3 py-1 rounded font-bold"
                >
                  se deconnecter
                </button>
              </>
            )}

          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-amber-600 text-white py-20 text-center px-6">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
          Contactez ITESA WIFI
        </h1>

        <p className="text-base md:text-lg opacity-90">
          Une question ? Un problème ? On est là pour toi 24/7 ⚡
        </p>
      </section>

      {/* FORM */}
      <section className="max-w-4xl mx-auto px-4 md:p-8 -mt-10">
        <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-8">

          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Envoyer un message
          </h2>

          {status && (
            <p className="text-center mb-4 text-amber-600 font-semibold">
              {status}
            </p>
          )}

          <div className="grid gap-4">

            <input
              className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <textarea
              className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500 h-40 resize-none"
              placeholder="Votre message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              className="bg-amber-600 text-white font-bold py-3 rounded-lg hover:bg-amber-700 transition"
            >
              Envoyer le message
            </button>

          </div>
        </div>
      </section>

      {/* INFOS */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8 py-16 text-center">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-2">📍 Adresse</h3>
          <p>Port-au-Prince, Haïti</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-2">📞 Téléphone</h3>
          <p>+509 XXXX XXXX</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-2">📧 Email</h3>
          <p>support@itesawifi.com</p>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white text-center py-6 text-sm md:text-base">
        © 2026 ITESA WIFI - Tous droits réservés
      </footer>

    </main>
  );
}