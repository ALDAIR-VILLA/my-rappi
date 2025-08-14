
'use client'

import { CarritoProvider } from '@/Context/CarritoContext'
import NavbarUsuario from './Componetes/NavbarUsuario'

const LayoutCliente = ({ children }) => {
  return (
    <CarritoProvider>
      <NavbarUsuario />
      {children}
    </CarritoProvider>
  )
}

export default LayoutCliente
