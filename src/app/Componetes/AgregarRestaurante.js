'use client'
import { useState } from 'react'
import { supabase } from '../Componetes/lib/SupabaseClient'

export default function AgregarRestaurante() {
  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')
  const [imagen, setImagen] = useState(null)
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje('')

    const user = (await supabase.auth.getUser()).data.user

    let imagenUrl = null

    if (imagen) {
      const nombreArchivo = `${Date.now()}_${imagen.name}`
      const { data: storageData, error: storageError } = await supabase
        .storage
        .from('restaurantes') 
        .upload(nombreArchivo, imagen)

      if (storageError) {
        setMensaje('Error al subir imagen: ' + storageError.message)
        return
      }

      
      const { data: urlData } = supabase
        .storage
        .from('restaurantes')
        .getPublicUrl(nombreArchivo)

      imagenUrl = urlData.publicUrl
    }

    const { error } = await supabase.from('Restaurantes').insert({
      nombre,
      direccion,
      imagen: imagenUrl,
      creado_por: user.id
    })

    if (error) {
      setMensaje('Error al guardar: ' + error.message)
    } else {
      setMensaje('Restaurante guardado correctamente!')
      setNombre('')
      setDireccion('')
      setImagen(null)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto h-min bg-gray-400 shadow rounded">
      <h2 className="text-xl text-red-600 font-bold mb-4">Agregar Empresas</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full text-black p-2 border rounded mb-2"
          required
        />
        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          className="w-full p-2 text-black border rounded mb-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files[0])}
          className="w-full text-black p-2 border rounded mb-2"
        />
        <button className="bg-red-500 hover:bg-red-100 text-white py-2 px-4 rounded">Guardar</button>
      </form>
      {mensaje && <p className="mt-2 text-sm">{mensaje}</p>}
    </div>
  )
}
