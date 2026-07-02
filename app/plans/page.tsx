"use client";

import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

const titles = [
  { id: 1, name: "Rapide", content: "connexion stable et haute vitesse partout." },
  { id: 2, name: "Abordable", content: "Des prix adapte a tous les budgets" },
  { id: 3, name: "Disponible", content: "Acces simple et immediat" }
];

const plans = [
  {
    id: 1,
    title: "Plan Maison",
    content: "Internet stable et rapide pour toute la famille",
    price: 55,
  },
  {
    id: 2,
    title: "Plan Business",
    content: "Connexion haute perfomance pour entreprise et bureau",
    price: 165,
  }
];

const miniPlans = [
  { id: 1, jour: 1, worth: 10, price: 5 },
  { id: 2, jour: 3, worth: 20, price: 10 },
  { id: 3, jour: 5, worth: 25, price: 15 },
  { id: 4, jour: 10, worth: 30, price: 20 },
  { id: 5, jour: 15, worth: 50, price: 25 },
  { id: 6, jour: 30, worth: 200, price: 50 },
];

export default function Plans() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  async function logout() {
    await supabase.auth.signOut();
    setOpen(false);
  }

  return (
    <main className="bg-white text-black">

      {/* HEADER */}
      <header className="relative flex justify-between items-center px-4 md:px-8 py-4 shadow-md bg-amber-600 text-white">

        <h1 className="text-2xl font-bold">ITESA WIFI</h1>

        {/* BURGER BUTTON */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex space-x-6 font-medium items-center">

          <Link href="/">Accueil</Link>
          <Link href="/plans">Plans</Link>
          <Link href="/contact">Contact</Link>

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

        {/* OVERLAY */}
        <div
          className={`fixed inset-0 bg-black/40 transition-opacity duration-300 md:hidden ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* MOBILE MENU */}
        <div
          className={`fixed top-0 right-0 h-full w-72 bg-amber-600 shadow-2xl transform transition-transform duration-300 z-50 md:hidden ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-6 p-6 font-medium">

            <Link onClick={() => setOpen(false)} href="/">Accueil</Link>
            <Link onClick={() => setOpen(false)} href="/plans">Plans</Link>
              <Link onClick={() => setOpen(false)} href="/contact">Contact</Link>

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
      <section className="bg-amber-600 text-white py-20 px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Internet Rapide pour tous
        </h2>

        <p className="max-w-2xl mx-auto text-lg opacity-90">
          connectez-vous a un wifi stable, rapide et abordable partout avec ITESA WIFI
        </p>

        <div className="mt-8 space-x-4">

          {!user && (
            <Link
              href="/signup"
              className="bg-white text-red-600 px-6 py-3 rounded-full font-bold"
            >
              commencer
            </Link>
          )}

          <a
            href="#plans"
            className="border border-white px-6 py-3 rounded-full"
          >
            voir les offres
          </a>
        </div>
      </section>

      {/* TITLES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-10 py-16 text-center">
        {titles.map((title) => (
          <div className="p-6 shadow-lg rounded-xl" key={title.id}>
            <h3 className="text-xl font-bold mb-2">{title.name}</h3>
            <p>{title.content}</p>
          </div>
        ))}
      </section>

      {/* PLANS */}
      <section id="plans" className="bg-gray-100 py-16 px-6 md:px-10">

        <h2 className="text-3xl font-bold text-center mb-10">
          Nos Plans Internet
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {plans.map((plan) => (
            <Link
              href={`/payment/${plan.id}`}
              key={plan.id}
              className="bg-white p-8 rounded-xl shadow text-center hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <h3 className="text-3xl font-bold mb-3">{plan.title}</h3>
              <p className="text-gray-500 mb-6">{plan.content}</p>
              <p className="text-4xl font-bold text-red-600">
                {plan.price} USD
              </p>
            </Link>
          ))}

        </div>
      </section>

      {/* MINI PLANS */}
      <section className="bg-white py-16 px-6 md:px-10">

        <h2 className="text-3xl font-bold text-center mb-10">
          Mini Plans Data
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {miniPlans.map((miniPlan) => (
            <div
              key={miniPlan.id}
              className="bg-gray-100 p-6 rounded-xl text-center shadow hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <h3 className="text-2xl font-bold mb-2">
                {miniPlan.jour} Jour
              </h3>
              <p className="text-gray-500 mb-4">
                {miniPlan.worth} Go
              </p>
              <p className="text-red-600 font-bold text-xl">
                {miniPlan.price} USD
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white text-center py-6">
        <p>© 2026 ITESA WIFI - Tous droits réservés</p>
      </footer>

    </main>
  );
}