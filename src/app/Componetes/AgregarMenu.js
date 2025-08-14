'use client'
import { useEffect, useState } from 'react'
import { supabase } from './lib/SupabaseClient'

export default function AgregarMenu() {
  const [restaurantes, setRestaurantes] = useState([])
  const [restauranteId, setRestauranteId] = useState('')
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [descripcion, setDescripcion] = useState('') 
  const [imagen, setImagen] = useState(null)
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    const fetchRestaurantes = async () => {
      const { data, error } = await supabase.from('Restaurantes').select('id, nombre')
      if (data) setRestaurantes(data)
    }
    fetchRestaurantes()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje('')

    let imagenUrl = null

    if (imagen) {
      const nombreArchivo = `${Date.now()}_${imagen.name}`
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('menus')
        .upload(nombreArchivo, imagen)

      if (uploadError) {
        setMensaje('Error al subir la imagen: ' + uploadError.message)
        return
      }

      const { data: urlData } = supabase
        .storage
        .from('menus')
        .getPublicUrl(nombreArchivo)

      imagenUrl = urlData.publicUrl
    }

    const { error } = await supabase.from('Menus').insert({
      nombre,
      precio: parseFloat(precio),
      restaurante_id: restauranteId,
      imagen: imagenUrl,
      descripcion 
    })

    if (error) {
      setMensaje('Error al guardar: ' + error.message)
    } else {
      setMensaje('Menú guardado correctamente!')
      setNombre('')
      setPrecio('')
      setDescripcion('') 
      setImagen(null)
      setRestauranteId('')
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto h-min bg-red-300 shadow rounded pt-28">
      <h2 className="text-xl text-black font-bold mb-4">Agregar Productos</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={restauranteId}
          onChange={(e) => setRestauranteId(e.target.value)}
          className="w-full text-black p-2 border rounded mb-2"
          required
        >
          <option value="">Selecciona un restaurante</option>
          {restaurantes.map((r) => (
            <option key={r.id} value={r.id}>{r.nombre}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nombre del Producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full text-black p-2 border rounded mb-2"
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="w-full text-black p-2 border rounded mb-2"
          required
        />
        <textarea
          placeholder="Descripción del producto (ej: Hamburguesa con papas y bebida)"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full text-black p-2 border rounded mb-2"
          rows={3}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files[0])}
          className="w-full text-black p-2 border rounded mb-2"
        />
        <button className="bg-green-500 text-black py-2 px-4 rounded">Guardar</button>
      </form>
      {mensaje && <p className="mt-2 text-sm">{mensaje}</p>}
    </div>
  )
}

