'use client'

import { createContext, useContext, useState } from 'react'

const CarritoContext = createContext()

export const useCarrito = () => useContext(CarritoContext)

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([])
  const [mostrarCarrito, setMostrarCarrito] = useState(false)

  // ✅ Agregar al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const existe = carritoActual.find((item) => item.id === producto.id)
      if (existe) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }
      return [...carritoActual, { ...producto, cantidad: 1 }]
    })
    setMostrarCarrito(true)
  }

  // ✅ Eliminar del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== id)
    )
  }

  // ✅ Actualizar cantidad
  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad === 0) {
      eliminarDelCarrito(id)
      return
    }

    setCarrito((carritoActual) =>
      carritoActual.map((item) =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    )
  }

  // ✅ Vaciar carrito
  const vaciarCarrito = () => setCarrito([])

  // ✅ Calcular total
  const calcularTotal = () => {
    return carrito.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    )
  }

  // ✅ Total de productos
  const obtenerCantidadTotal = () => {
    return carrito.reduce((total, item) => total + item.cantidad, 0)
  }

  return (
    <CarritoContext
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        vaciarCarrito,
        calcularTotal,
        obtenerCantidadTotal,
        mostrarCarrito,
        setMostrarCarrito,
      }}
    >
      {children}
    </CarritoContext>
  )
}

