'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from './lib/SupabaseClient'
import useEmblaCarousel from 'embla-carousel-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'


export default function CarruselMenus() {
  const [menus, setMenus] = useState([])
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const router = useRouter()

  useEffect(() => {
    const obtenerMenus = async () => {
      const { data, error } = await supabase.from('Restaurantes').select('*')
      if (error) {
        console.error('Error al obtener menús:', error)
        return
      }

      const conUrls = await Promise.all(
        data.map(async (restaurante) => {
          if (restaurante.imagen) {
            const { data: imgData } = supabase.storage
              .from('restaurantes')
              .getPublicUrl(restaurante.imagen)
            return { ...restaurante, imagenUrl: imgData.publicUrl }
          } else {
            return { ...restaurante, imagenUrl: null }
          }
        })
      )

      setMenus(conUrls)
    }

    obtenerMenus()
  }, [])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const handleClickRestaurante = async (id) => {
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      
      router.push(`/restaurant/${id}`)
    } else {
      
      router.push('/Login')
    }
  }

  if (menus.length === 0) return <p className="text-center">Cargando menús...</p>

  return (
    <div className="p-4 pt-24">
      <h1 className="text-black font-bold text-2xl">Top Restaurantes Más Visitados :</h1>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-x gap-4">
          {menus.map((restaurante) => (
            <div
              key={restaurante.id}
              className="min-w-[90%] sm:min-w-[60%] md:min-w-[40%] lg:min-w-[33%] p-2 flex-shrink-0"
            >
              <div
                className="bg-white rounded-xl shadow-lg overflow-hidden h-full cursor-pointer"
                onClick={() => handleClickRestaurante(restaurante.id)}
              >
                {restaurante.imagenUrl ? (
                  <Image
                    src={restaurante.imagen}
                    alt={restaurante.nombre}
                    width={300}
                    height={300}
                    className=" w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Sin imagen</span>
                  </div>
                )}
                <h1 className="text-blue-600 flex justify-center font-extrabold">
                  {restaurante.nombre}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={scrollPrev}
          className="text-black px-4 py-2 rounded hover:bg-gray-50"
        >
          ←
        </button>
        <button
          onClick={scrollNext}
          className="text-black px-4 py-2 rounded hover:bg-gray-50"
        >
          →
        </button>
      </div>
    </div>
  )
}

