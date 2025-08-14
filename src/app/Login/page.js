'use client'
import { useState } from 'react'
import { supabase } from '../Componetes/lib/SupabaseClient'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      return
    }

    const user = data?.user

    if (!user) {
      setError('No se encontró el usuario.')
      return
    }

   
    const { data: perfil, error: perfilError } = await supabase
      .from('Usuarios')
      .select('rol')
      .eq('user_id', user.id)
      .single()

    if (perfilError) {
      setError('Error al obtener el rol del usuario.')
      return
    }

  
    if (perfil.rol === 'admin') {
      router.push('/Admin')
    } else {
      router.push('/Users')
    }
  
  }

  return (
    <div className="min-h-screen flex items-center justify-normal gap-14 ">
      <Image
        src="/inicio1.png"
        alt="Inicio"
        width={800}
        height={800} />
      <form onSubmit={handleLogin} className=" p-6 rounded-4xl  w-80">
        <h2 className="text-4xl mb-4 text-center font-bold text-black">Regístrate o ingresa para continuar</h2>

        <input
          type="email"
          className="w-full bg-gray-100 text-black p-2  mb-2 rounded-3xl"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full text-black p-2 bg-gray-100 mb-4 rounded-3xl"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="w-full bg-green-400 text-white cursor-pointer font-bold py-2 rounded-3xl">
          Iniciar Sesión
        </button>
        

        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
         <Link
          href="/Registro"
          className=" hover:bg-gray-100 text-black font-semibold text-center  mt-7"
        >
          Ir a Registro
        </Link>
      </form>
     
    </div>
  )
}

