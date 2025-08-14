"use client"

import { useRouter } from "next/navigation"
import Restaurantes from "../Componetes/Restaurantes";
import { supabase } from "../Componetes/lib/SupabaseClient";


export default function Users() {
  

  return (
    <div
      className="min-h-screen bg-cover bg-center pt-28 bg-no-repeat"
      style={{ backgroundImage: "url('/FOTO-RAPPI.png')" }}
    >
         
      <div className="pt-20 px-4">
        <h1 className="text-3xl font-bold text-black mb-6">NUESTROS RESTAURANTES ALIADOS DE RAPPI</h1>

        <div className="  p-4 rounded-lg shadow-md">
          <Restaurantes />
        </div>
      </div>
    </div>
  )
}
