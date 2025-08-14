import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CarritoProvider } from "../Context/CarritoContext"
import NavbarUsuario from "./Componetes/NavbarUsuario";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RAPPI",
  description: "Pide Comida a Domicilio y Mucho Mas - Rappi Colombia",
};

export default function RootLayout({ children }) {
  

  return (
    
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         
         <CarritoProvider>
          
            <NavbarUsuario/>
            {children}
           
        </CarritoProvider>
      </body>
    </html>
  );
}
