"use client"

import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"

export function useUser() {
  const [user, setUser] = useState<null | { name: string; email: string }>(null)
  const [loading, setLoading] = useState(true)

  function updateUser(session: any) {
    const authUser = session?.user

    if (!authUser) {
      setUser(null)
      setLoading(false)
      return
    }

    const firstName = authUser.user_metadata?.first_name
    const lastName = authUser.user_metadata?.last_name

    setUser({
      name:
        firstName && lastName
          ? `${firstName} ${lastName}`
          : "Utilisateur",
      email: authUser.email,
    })

    setLoading(false)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      updateUser(session)
    })

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        updateUser(session)
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { user, loading }
}