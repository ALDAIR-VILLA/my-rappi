'use client'
import { useState } from 'react'
import { supabase } from '../Componetes/lib/SupabaseClient'
import { useRouter } from 'next/navigation'

export default function Registro() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rol, setRol] = useState('usuario')
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleRegistro = async (e) => {
    e.preventDefault()
    setError(null)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
    emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/Auth/Callback`
  }
    })

    if (error) {
      setError(error.message)
      return
    }

    const user = data?.user

    const insert = await supabase
      .from('Usuarios')
      .insert([
        {
          user_id: user?.id,
          email: email,
          rol: rol,
        },
      ])

    if (insert.error) {
      setError(insert.error.message)
      return
    }

    alert('Registro exitoso. Revisa tu correo y luego inicia sesión.')
    router.push('/Login')
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 pt-20 bg-black"
      
    >
      
      <div className="text-white text-center mb-8 drop-shadow-md">
        <div className="text-6xl mb-4 font-bold flex flex-col items-center">
          <span>🍕</span>
          <span>¡Regístrate hoy y</span>
          <span>recibe hasta 15 días!</span>
        </div>
        <p className="text-xl font-semibold">de Envíos Gratis pagando con tarjeta</p>
        <p className="text-sm mt-2">*Válido para nuevos usuarios</p>
      </div>

      
      <form onSubmit={handleRegistro} className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl mb-4 text-black text-center font-bold">Registrarse</h2>

        <input
          type="email"
          className="w-full text-black font-bold p-2 border mb-2 rounded"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full text-black font-bold p-2 border mb-2 rounded"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          className="w-full p-2 text-black font-bold border mb-4 rounded"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
        >
          <option value="usuario">Usuario</option>
          <option value="admin">Administrador</option>
        </select>

        <button type="submit" className="w-full bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600">
          Registrarse
        </button>

        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  )
}

