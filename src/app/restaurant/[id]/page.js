'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '../../Componetes/lib/SupabaseClient'
import { useCarrito } from '@/Context/CarritoContext'





export default function DetalleRestaurante() {
  const router = useRouter()
  const { id } = useParams()
  const [menus, setMenus] = useState([])
  const [restaurante, setRestaurante] = useState(null)
  const { agregarAlCarrito } = useCarrito() 

  const [mensaje, setMensaje] = useState(null)
    const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/Users')
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data: restauranteData } = await supabase
        .from('Restaurantes')
        .select('*')
        .eq('id', id)
        .single()

      const { data: menusData } = await supabase
        .from('Menus')
        .select('*')
        .eq('restaurante_id', id)

      setRestaurante(restauranteData)
      setMenus(menusData)
    }

    if (id) fetchData()
  }, [id])

  const handleAgregar = (menu) => {
    agregarAlCarrito(menu)
    setMensaje('Producto agregado al carrito ✅')
    setTimeout(() => setMensaje(null), 2000)
  }

  return (
    <div className="p-6 bg-white text-black min-h-screen flex flex-col items-center pt-28">
     
  
      {restaurante && (
        <>
       <div className="w-full max-w-4xl px-4 mx-auto">
  <div className="flex flex-col items-start">
    <button
      onClick={handleLogout}
      className="rounded hover:bg-red-600 text-2xl transition"
    >
      ⬅️
    </button>
    <img
      src={restaurante.imagen}
      width={200}
      height={200}
      alt={restaurante.nombre}
      className="mb-4 rounded"
    />
    <h1 className="text-3xl font-bold mb-4">{restaurante.nombre}</h1>
  </div>
</div>    
        </>
      )}

      {mensaje && (
        <div className="bg-green-600 text-white px-4 py-2 rounded mb-4">
          {mensaje}
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Menús disponibles:</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {menus.map((menu) => (
          <div key={menu.id} className="bg-gray-50 p-4 rounded shadow flex flex-col items-center">
            <img src={menu.imagen} alt={menu.nombre} className="mb-4 w-full h-48 object-cover rounded" />
            <h3 className="font-bold text-lg">{menu.nombre}</h3>
            <p className="text-2xl font-bold">${menu.precio}</p>
            <p>{menu.descripcion}</p>
             <button onClick={() => handleAgregar(menu)} className="bg-red-600 text-white p-2">
            Agregar al carrito
          </button>
          </div>
        ))}
      </div>
    </div>
  )
}
