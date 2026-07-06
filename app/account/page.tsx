"use client";

import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">

      {/* TOP BAR */}
      <header className="flex justify-between items-center px-6 md:px-10 py-4 bg-amber-600 text-white shadow-md">
        <h1 className="text-xl font-bold tracking-wide">
          ITESA WIFI
        </h1>

        <button
          onClick={() => router.push("/")}
          className="text-sm font-medium hover:underline"
        >
          Retour
        </button>
      </header>

      {/* CONTENT */}
      <section className="px-6 md:px-10 py-10">

        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Mon compte
          </h2>

          <p className="text-gray-500 mt-2">
            Gestion de ton abonnement et de ton profil
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* USER */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Utilisateur</p>

            {loading ? (
              <p className="mt-2">Chargement...</p>
            ) : (
              <>
                <p className="text-xl font-bold mt-1">
                  {user?.name}
                </p>

                <p className="text-gray-500 text-sm mt-2">
                  {user?.email}
                </p>
              </>
            )}
          </div>

          {/* SUBSCRIPTION */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Abonnement</p>

            <p className="text-green-600 font-bold text-xl mt-2">
              Actif
            </p>

            <div className="mt-5">
              <button
                onClick={() => router.push("/plans")}
                className="bg-amber-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-amber-700 transition"
              >
                Voir les plans
              </button>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Actions</p>

            <div className="mt-5 flex flex-col items-start gap-3">

              <button
                onClick={logout}
                className="inline-flex w-auto bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition"
              >
                Se déconnecter
              </button>

              <button
                onClick={() => router.push("/contact")}
                className="inline-flex w-auto border border-gray-300 bg-white px-6 py-2 rounded-lg hover:bg-gray-50 transition"
              >
                Support
              </button>

            </div>
          </div>

        </div>

      </section>

    </main>
  );
}