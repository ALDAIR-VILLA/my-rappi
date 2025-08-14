import Image from 'next/image'
import React from 'react'
import Foto from '../../../public/FOTO-RAPPI.png'
import Link from 'next/link'
import CarruselRestaurantes from './CarruselRestaurantes'
import Textos from './Textos'
import CarruselMenus from './CarruselMenus'


const Inicio = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white overflow-x-hidden px-4  pt-24">

      <div className="mt-7 mb-4">
        <Image
          className="animate-pulse w-3xs h-28"
          src={Foto}
          alt="FOTO"
        />
      </div>

      <div className="flex flex-col items-center gap-6 w-full max-w-6xl">

       
        <div className="w-full">
          <CarruselMenus/>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/Registro"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 text-center"
          >
            Ir a Registro
          </Link>
          <Link
            href="/Login"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 text-center"
          >
            Ir a Inicio de Sesión
          </Link>
        </div>
        <div className="w-full">
          <CarruselRestaurantes />
        </div>
         <div className="w-full">
          <Textos />
        </div>

      </div>
    </div>
  )
}

export default Inicio
