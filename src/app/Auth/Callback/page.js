'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/Componetes/lib/SupabaseClient'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const confirmarSesion = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        
        router.push('/')
      } else {
        
        router.push('/Login')
      }
    }

    confirmarSesion()
  }, [router])

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg font-semibold">Confirmando tu cuenta...</p>
    </div>
  )
}
