"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { supabase } from "../lib/supabase";

const services = [
  {
    id: 1,
    icon: "⚡",
    title: "Internet Haute Vitesse",
    description: "Connexion rapide et stable pour tous vos besoins.",
  },
  {
    id: 2,
    icon: "🏠",
    title: "Internet Résidentiel",
    description: "Une connexion fiable pour toute la famille.",
  },
  {
    id: 3,
    icon: "🏢",
    title: "Internet Entreprise",
    description: "Solutions performantes pour entreprises et bureaux.",
  },
  {
    id: 4,
    icon: "📡",
    title: "Installation & Support",
    description: "Installation rapide et assistance technique 24/7.",
  },
];

const steps = [
  { id: 1, title: "Créer un compte", desc: "Inscris-toi en quelques secondes." },
  { id: 2, title: "Choisir un plan", desc: "Sélectionne l’offre adaptée." },
  { id: 3, title: "Paiement", desc: "Paiement simple et sécurisé." },
  { id: 4, title: "Connexion", desc: "Profite directement de ton internet." },
];

export default function Home() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  async function logout() {
    await supabase.auth.signOut();
    setOpen(false);
  }

  return (


 
    <main className="bg-white text-gray-900">
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      

      {/* HEADER */}
      <header className="relative flex justify-between items-center px-4 md:px-8 py-4 shadow-md bg-amber-600 text-white">

        <h1 className="text-2xl font-bold">ITESA WIFI</h1>

        {/* BURGER BUTTON */}
        <button
          className="md:hidden text-3xl transition-transform duration-300"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex space-x-6 font-medium items-center">
          <Link href="/">Accueil</Link>
          <Link href="/plans">Plans</Link>
          <Link href="/contact">Contact</Link>

          {user && (
            <Link href="/account">Mon Compte</Link>
          )}
          

          {!user ? (
            <>
              <Link href="/signup">S'inscrire</Link>
              <Link href="/login">Se connecter</Link>
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

        {/* OVERLAY MOBILE MENU */}
        <div
          className={`md:hidden fixed top-0 left-0 w-full h-full bg-black/40 transition-opacity duration-300 ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* MOBILE MENU PANEL */}
        <div
          className={`md:hidden fixed top-0 right-0 h-full w-72 bg-amber-600 shadow-2xl transform transition-transform duration-300 z-50 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-6 p-6 font-medium">

            <Link onClick={() => setOpen(false)} href="/">Accueil</Link>
            <Link onClick={() => setOpen(false)} href="/plans">Plans</Link>
            <Link onClick={() => setOpen(false)} href="/contact">Contact</Link>
             {user && (
            <Link onClick={() => setOpen(false)} href="/account">Mon Compte</Link>
          )}

            {!user ? (
              <>
                <Link onClick={() => setOpen(false)} href="/signup">
                  S'inscrire
                </Link>
                <Link onClick={() => setOpen(false)} href="/login">
                  Se connecter
                </Link>
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
      <section className="bg-amber-600 text-white py-16 md:py-28 text-center px-4 md:px-6">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4">
          Internet rapide pour tous
        </h1>

        <p className="text-base md:text-xl max-w-3xl mx-auto mb-10">
          ITESA WIFI te fournit une connexion stable, rapide et accessible partout.
        </p>

        <Link
          href="/plans"
          className="bg-white text-amber-600 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold"
        >
          Découvrir les offres
        </Link>
      </section>

      {/* SERVICES */}
      <section className="py-16 md:py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Nos Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div
              key={s.id}
              className="p-6 shadow-lg rounded-xl text-center hover:scale-105 transition"
            >
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="font-bold text-xl mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-gray-100 py-16 md:py-20 px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">À propos</h2>
        <p className="max-w-3xl mx-auto text-gray-600 text-base md:text-lg">
          ITESA WIFI fournit un internet rapide, fiable et abordable pour tous.
        </p>
      </section>

      {/* STEPS */}
      <section className="py-16 md:py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Comment ça marche ?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.id} className="p-6 shadow rounded-xl text-center">
              <h3 className="font-bold text-xl mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-600 text-white py-16 md:py-20 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Prêt à te connecter ?
        </h2>

        <Link
          href="/plans"
          className="bg-white text-amber-600 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold"
        >
          Voir les plans
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white text-center py-6 text-sm md:text-base">
        © 2026 ITESA WIFI
      </footer>
        
    </main>

  
        
  );

}
