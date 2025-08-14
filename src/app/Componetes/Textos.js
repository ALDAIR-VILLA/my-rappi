export default function AgregarRestaurante() {
    return (
        <div>
            {/* PRIMER BLOQUE */}
            <div className="flex justify-between items-start gap-12">
                <div>
                    <h2 className="font-extrabold text-black mb-2">Top Marcas y Cadenas de Restaurantes</h2>
                    <ul className="space-y-1 text-black">
                        <li className="text-black cursor-pointer hover:underline">KFC</li>
                        <li className="text-black cursor-pointer hover:underline">Juan Valdez</li>
                        <li className="text-black cursor-pointer hover:underline">Mc Donald's</li>
                        <li className="text-black cursor-pointer hover:underline">Frisby</li>
                        <li className="text-black cursor-pointer hover:underline">El Corral</li>
                        <li className="text-black cursor-pointer hover:underline">Perro Loco</li>
                    </ul>
                </div>

                <div>
                    <h2 className="font-extrabold mb-2 text-black">Encuéntranos en estos países</h2>
                    <ul className="space-y-1 text-black">
                        <li className="text-black cursor-pointer hover:underline">Colombia</li>
                        <li className="text-black cursor-pointer hover:underline">Argentina</li>
                        <li className="text-black cursor-pointer hover:underline">Brasil</li>
                        <li className="text-black cursor-pointer hover:underline">Chile</li>
                        <li className="text-black cursor-pointer hover:underline">Costa Rica</li>
                        <li className="text-black cursor-pointer hover:underline">Ecuador</li>
                        <li className="text-black cursor-pointer hover:underline">México</li>
                        <li className="text-black cursor-pointer hover:underline">Perú</li>
                        <li className="text-black cursor-pointer hover:underline">Uruguay</li>
                    </ul>
                </div>

                <div>
                    <h2 className="font-extrabold mb-2 text-black">Pide tu comida favorita cerca de ti</h2>
                    <ul className="space-y-1 text-black">
                        <li className="text-black cursor-pointer hover:underline">Cafe cerca de mi</li>
                        <li className="text-black cursor-pointer hover:underline">Pollo cerca de mi</li>
                        <li className="text-black cursor-pointer hover:underline">Pizza cerca de mi</li>
                        <li className="text-black cursor-pointer hover:underline">mi Comida a Domicilio</li>
                        <li className="text-black cursor-pointer hover:underline">Hamburguesa cerca de mi</li>
                        <li className="text-black cursor-pointer hover:underline">mi desayuno cerca de mi</li>
                        <li className="text-black cursor-pointer hover:underline">Comida Italiana cerca de mi</li>
                        <li className="text-black cursor-pointer hover:underline">Comida Mexicana cerca de</li>
                        <li className="text-black cursor-pointer hover:underline">Comida Saludable cerca de mi</li>
                    </ul>
                </div>
            </div>


           
            <div className="flex justify-between items-start gap-12 mt-10">
                <div>
                    <h2 className="font-extrabold text-black mb-2">Categorías</h2>
                    <ul className="space-y-1 ">
                        <li className="text-black cursor-pointer hover:underline">Catálogo Productos</li>
                        <li className="text-black cursor-pointer hover:underline">Restaurantes</li>
                        <li className="text-black cursor-pointer hover:underline">Tiendas cerca de mi</li>
                        <li className="text-black cursor-pointer hover:underline">Promociones y Ofertas</li>
                        <li className="text-black cursor-pointer hover:underline">Express cerca de mi</li>
                        <li className="text-black cursor-pointer hover:underline">Rappi Travel</li>
                    </ul>
                </div>
                <div>
                    <h2 className="font-extrabold text-black mb-2" >Únete a Rappi</h2>
                    <ul className="space-y-1 text-black">
                        <li className="text-black cursor-pointer hover:underline">Registra tu restaurante</li>
                        <li className="text-black cursor-pointer hover:underline">Trabaja con nosotros</li>
                        <li className="text-black cursor-pointer hover:underline">Haz crecer tu marca</li>
                        <li className="text-black cursor-pointer hover:underline">Pide por Rappi</li>
                        <li className="text-black cursor-pointer hover:underline">Incrementa tus ventas con Rappi</li>
                        <li className="text-black cursor-pointer hover:underline">Quiero ser Rappitendero</li>
                        <li className="text-black cursor-pointer hover:underline">Posiciones disponibles</li>
                        <li className="text-black cursor-pointer hover:underline">Registra tu tienda</li>
                        
                    </ul>
                </div>
                <div>
                    <h2 className="font-extrabold text-black mb-2">Pide tu comida favorita cerca de ti</h2>
                    <ul className="space-y-1 text-black">
                        <li>Blog</li>
                        <li>SIC</li>
                        <li>Rappi Card</li>
                        <li> Tratamiento de Datos</li>
                        <li>Informacion Relevante</li>
                        <li>Derecho de retracto</li>
                        <li>Términos y Condiciones</li>
                        <li>Políticas de Privacidad</li>
                        <li>PQRs</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

