"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "./lib/SupabaseClient";
import Image from "next/image";


const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm.trim() === "") {
        setResults([]);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("Restaurantes")
        .select("nombre, imagen")
        .ilike("nombre", `%${searchTerm}%`);

      if (error) {
        console.error("Error al buscar:", error.message);
        setResults([]);
      } else {
        setResults(data);
      }

      setLoading(false);
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className='w-full max-w-lg mx-auto my-5 '>
      <input
        type='text'
        placeholder='Buscar restaurantes...'
        className='w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-400'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm && (
        <ul className='mt-2 border rounded-lg bg-white shadow-lg max-h-60 overflow-y-auto'>
          {loading ? (
            <li className='p-3 text-gray-500'>Buscando...</li>
          ) : results.length > 0 ? (
            results.map((item, index) => (
              <li
                key={index}
                className='flex items-center gap-4 p-3 border-b last:border-none hover:bg-red-100 cursor-pointer'
              >
                <Image
                  src={item.imagen}
                  alt={item.nombre}
                  width={50}
                  height={50}
                  className='rounded object-cover'
                />
                <span>{item.nombre}</span>
                
              </li>
              
            ))
          ) : (
            <li className='p-3 text-gray-500'>No se encontraron resultados</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
