'use client'
import { useCarrito } from '@/Context/CarritoContext'


const CarritoCompras = () => {
  const {
    carrito,
    eliminarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    calcularTotal,
    obtenerCantidadTotal,
    mostrarCarrito,
    setMostrarCarrito,
  } = useCarrito()

  return (
    <div>
     
      <button onClick={() => setMostrarCarrito(true)} className="...">
        🛒 Carrito
        {obtenerCantidadTotal() > 0 && (
          <span className="absolute ...">{obtenerCantidadTotal()}</span>
        )}
      </button>

      {mostrarCarrito && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-green-200 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">

            <div className="flex justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-blue-700">Carrito de Compras</h2>
              <button onClick={() => setMostrarCarrito(false)}>❌</button>
            </div>

           
            <div className="p-6 overflow-y-auto max-h-96">
             
              {carrito.length === 0 ? (
                <p>Tu carrito está vacío</p>
              ) : (
                carrito.map((item) => (
                  <div key={item.id} className="flex gap-5 items-center ...">
                    <img src={item.imagen} alt={item.nombre} height={50} width={50} className="..." />
                    <div className="flex-1">
                      <h3 className='text-black'>{item.nombre}</h3>
                      <p className='text-black'>${item.precio}</p>
                     
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}>➖</button>
                      <span>{item.cantidad}</span>
                      <button onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}>➕</button>
                    </div>
                    <div>${item.precio * item.cantidad}</div>
                    <button onClick={() => eliminarDelCarrito(item.id)}>🗑</button>
                  </div>
                ))
              )}
            </div>


            {carrito.length > 0 && (
              <div className="border-t p-6 flex gap-4">
                 <input
                        type="text"
                        className="w-full bg-gray-100 text-black p-2  mb-2 rounded-3xl"
                        placeholder="DIRECCION DE DOMICILIO"
                      />
                <p className='text-black' >Total: ${calcularTotal()}</p>
                <p className='text-black'>({obtenerCantidadTotal()} productos)</p>
                <button onClick={vaciarCarrito} className="bg-red-600 hover:bg-red-700 text-black font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 text-center">Vaciar carrito</button>
                <button className="bg-green-600 hover:bg-green-700 text-black font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 text-center"
                  onClick={() => {
                    alert(`Compra realizada. Total: $${calcularTotal()}`)
                    vaciarCarrito()
                    setMostrarCarrito(false)
                  }}
                >
                  Comprar ahora
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CarritoCompras

