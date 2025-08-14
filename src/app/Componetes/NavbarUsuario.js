'use client'
import Link from 'next/link'
import logo from '../../../public/Rappi_logo.png'
import Image from 'next/image'
import SearchBar from './Searchbar'
import CarritoCompras from './CarritoCompras'
import { useState, useEffect } from 'react'
import { supabase } from './lib/SupabaseClient'
import { useRouter } from 'next/navigation'

export default function NavbarUsuario() {
  const [mostrarCarrito, setMostrarCarrito] = useState(false)
  const [session, setSession] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const obtenerSesion = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
    }

    obtenerSesion()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener?.subscription?.unsubscribe()
    }
  }, [])

  const toggleCarrito = () => {
    setMostrarCarrito(!mostrarCarrito)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
    router.push('/') 
  }

  return (
    <nav className="bg-gray-200 text-black px-4 py-3 shadow-md fixed top-0 right-0 left-0 ">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        
        <Link href="/" className="flex-shrink-0">
          <Image src={logo} alt="Logo" height={60} width={60} />
        </Link>

        <div className="w-full sm:w-1/2">
          <SearchBar />
        </div>

        <div className="flex items-center gap-4">
          {!session ? (
            <Link href="/Login" className="hover:underline text-sm sm:text-base">Ingreso</Link>
          ) : (
            <button onClick={handleLogout} className="hover:underline text-sm sm:text-base">
              Cerrar sesión
            </button>
          )}

          <button
            onClick={toggleCarrito}
            className="relative text-2xl"
            aria-label="Abrir carrito"
          >
            🛒
          </button>
        </div>
      </div>

      
      {mostrarCarrito && (
        <div className="fixed top-0 right-0 z-50 w-80 max-w-full h-full bg-white shadow-lg p-4 overflow-y-auto transition-all">
          <button
            onClick={toggleCarrito}
            className="absolute top-2 right-2 text-gray-600 text-xl"
            aria-label="Cerrar carrito"
          >
            ❌
          </button>
          <CarritoCompras />
        </div>
      )}
    </nav>
  )
}

