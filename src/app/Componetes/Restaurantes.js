'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../Componetes/lib/SupabaseClient'
import Image from 'next/image'

export default function Restaurantes() {
  const [restaurantes, setRestaurantes] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchRestaurantes = async () => {
      const { data, error } = await supabase.from('Restaurantes').select('*')
      if (error) {
        console.error('Error al cargar restaurantes:', error.message)
      } else {
        
        const dataConUrls = await Promise.all(
          data.map(async (r) => {
            if (r.imagen) {
              const { data: imagenData } = supabase.storage
                .from('restaurantes') 
                .getPublicUrl(r.imagen_url)

              return {
                ...r,
                imagen_url: imagenData.publicUrl, 
              }
            } else {
              return { ...r, imagen: null }
            }
          })
        )
        setRestaurantes(dataConUrls)
      }
    }

    fetchRestaurantes()
  }, [])

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {restaurantes.map((r) => (
        <div
          key={r.id}
          className="rounded bg-gray-100 shadow p-4 cursor-pointer hover:shadow-lg transition"
          onClick={() => router.push(`/restaurant/${r.id}`)} 
        >
          
          {r.imagen ? (
            <Image
              src={r.imagen}
              alt={r.nombre}
              width={400}
              height={250}
              className="w-full h-48 object-cover mb-2 rounded"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded mb-2">
              <span className="text-gray-500">Sin imagen</span>
            </div>
          )}
          <h2 className="text-lg  text-black font-bold">{r.nombre}</h2>
          <p className="text-sm text-black">{r.direccion}</p>
        </div>
      ))}
    </div>
  )
}

