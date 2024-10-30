import React, { createContext, useState, useEffect } from 'react';

export const GastosContext = createContext();

export const GastosProvider = ({ children }) => {
  const [gastos, setGastos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerGastos = async () => {
    try {
      const respuesta = await fetch('https://6721746398bbb4d93ca870e4.mockapi.io/api/v1/gastos');
      const data = await respuesta.json();
      setGastos(data);
    } catch (error) {
      console.error('Error al obtener los gastos:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerGastos();
  }, []);

  return (
    <GastosContext.Provider value={{ gastos, cargando }}>
      {children}
    </GastosContext.Provider>
  );
};
