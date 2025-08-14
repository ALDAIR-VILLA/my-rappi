'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from './lib/SupabaseClient'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'


export default function CarruselMenus() {
  const [menus, setMenus] = useState([])
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    const obtenerMenus = async () => {
      const { data, error } = await supabase.from('Menus').select('*')
      if (error) {
        console.error('Error al obtener menús:', error)
        return
      }

      const conUrls = await Promise.all(
        data.map(async (menu) => {
          if (menu.imagen) {
            const { data: imgData } = supabase.storage
              .from('restaurantes')
              .getPublicUrl(menu.imagen)
            return { ...menu, imagenUrl: imgData.publicUrl }
          } else {
            return { ...menu, imagenUrl: null }
          }
        })
      )

      setMenus(conUrls)
    }

    obtenerMenus()
  }, [])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  if (menus.length === 0) return <p className="text-center">Cargando menús...</p>

  return (
    <div className="p-4">
      <h1 className='text-black font-bold text-2xl'>Top Restaurantes Cerca De ti :</h1>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-x gap-4">
          {menus.map((menu) => (
            <div
              key={menu.id}
              className="min-w-[90%] sm:min-w-[60%] md:min-w-[40%] lg:min-w-[33%] p-2 flex-shrink-0"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
                {menu.imagenUrl ? (
                  <Image
                    src={menu.imagen}
                    alt={menu.nombre}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Sin imagen</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-blue-800">{menu.nombre}</h3>
                  <p className="text-right text-green-700 font-bold">${menu.precio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={scrollPrev}
          className=" text-black px-4 py-2 rounded hover:bg-gray-100"
        >
          ← 
        </button>
        <button
          onClick={scrollNext}
          className=" text-black px-4 py-2 rounded hover:bg-gray-100"
        >
           →
        </button>
      </div>
    </div>
  )
}







