import React, { createContext, useState, useEffect } from 'react';

export const CategoriasContext = createContext();

export const CategoriasProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerCategorias = async () => {
    try {
      const respuesta = await fetch('https://6721746398bbb4d93ca870e4.mockapi.io/api/v1/categorias');
      const data = await respuesta.json();
      setCategorias(data);
    } catch (error) {
      console.error('Error al obtener los Categorias:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  return (
    <CategoriasContext.Provider value={{ categorias, cargando }}>
      {children}
    </CategoriasContext.Provider>
  );
};
