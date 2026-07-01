"use client"

import { useState } from "react";

export default function PaymentClient({id} : { id: string }){
  const [ showPayment, setShowPayment] = useState(false);

  const  plans = [
    {
      id: 1,
      title: "Plan Maison",
      content: "Internet stable et rapide pour toute la famille",
      price: 55,
      prices: 7163
    },
    {
      id: 2,
      title: "Plan Business",
      content: "connexion haute performance pour entreprise et bureau",
      price: 165,
      prices: 21491
    },
  ];

  const plan = plans.find((p) => String(p.id) === String(id));

  async function handleStripe() {
    if(!plan) return ;

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          amount: plan.prices,
          plan: plan.title,
        }),
      });

      const text = await res.text();
      console.log("RAW RESPONSE:", text)

      let data

      try {
        data = JSON.parse(text);
      } catch {
        alert  ("Backend error (not JSON)");
        return;
      }

      if (!res.ok) {
        alert (data?.error || "API error")
        return 
      }

      if(data.url) {
        window.location.href = data.url
      } else {
        alert  ("No stripe URL returned")
      }
    } catch (err) {
      console.error(err)
      alert("Network error")
    }
  }

  if(!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Plan Introuvable
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-600 to-black px-4 text-white">

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl w-[420px] text-center">
          <h1 className="text-4xl font-bold">{plan.title}</h1>
          <p>{plan.content}</p>      

          <p className="text-3xl text-red-300 mt-4">
            {plan.price} USD
          </p>

          <button type="button"
         onClick={() => setShowPayment(true)}
          className="w-full bg-amber-600 p-3 mt-6 rounded-xl font-bold">
            Payer maintenant 

          </button>

          { showPayment && (
            <div className="mt-6 p-6">
              <button className="w-full bg-green-600 p-3 rounded"
              onClick={handleStripe}>
                Payer avec Stripe
              </button>

              <button
              className="mt-4 text-gray-400" 
              onClick={() => setShowPayment(false)}>
                  Annuler
              </button>

            </div>
          )}
      </div>
    </div>
  )
}