import Link from "next/link";
import AgregarRestaurante from "../Componetes/AgregarRestaurante";
import AgregarMenu from "../Componetes/AgregarMenu";




export default function Admin() {
  return <div className="text-3xl text-center mt-20 bg-gray-200 pt-24 ">
   <h1 className="text-black">Bienvenido, Administrador</h1>
   <div className="flex justify-center gap-5" >
 <AgregarRestaurante/>
<AgregarMenu/>
   </div>
   
    
    
    </div>
}
