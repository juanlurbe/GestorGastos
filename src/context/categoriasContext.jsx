import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './authContext';

export const CategoriasContext = createContext();

export const CategoriasProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(false);
  const { user, status } = useContext(AuthContext);

  const obtenerCategorias = async () => {
    if (!user || !user.id) {
      console.error('El usuario no está definido. No se pueden cargar las categorías.');
      return;
    }

    setCargando(true);

    try {
      const respuesta = await fetch('https://6721746398bbb4d93ca870e4.mockapi.io/api/v1/categorias');
      if (!respuesta.ok) {
        throw new Error(`Error en la respuesta del servidor: ${respuesta.status}`);
      }

      const data = await respuesta.json();
      const categoriasUsuario = data.filter((cat) => cat.userId === user.id);

      // console.log('Cargando categorías para el usuario:', user);
      // console.log('Categorías del usuario:', categoriasUsuario);
      setCategorias(categoriasUsuario);
    } catch (error) {
      console.error('Error al obtener las Categorias:', error.message);
    } finally {
      setCargando(false);
    }
  };

  const agregarCategoria = async (nuevaCategoria) => {
    if (!user || !user.id) {
      console.error('El usuario no está definido. No se puede agregar la categoría.');
      return;
    }

    const categoriaConUsuario = { ...nuevaCategoria, userId: user.id };

    try {
      const response = await fetch('https://6721746398bbb4d93ca870e4.mockapi.io/api/v1/categorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoriaConUsuario),
      });
      const categoriaAgregada = await response.json();
      setCategorias([...categorias, categoriaAgregada]);
    } catch (error) {
      console.error('Error al agregar la categoría:', error.message);
    }
  };

  const modificarCategoria = async (id, categoriaModificada) => {
    try {
      const response = await fetch(`https://6721746398bbb4d93ca870e4.mockapi.io/api/v1/categorias/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoriaModificada),
      });

      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.status}`);
      }

      const categoriaActualizada = await response.json();
      setCategorias(
        categorias.map((cat) => (cat.id === id ? categoriaActualizada : cat))
      );
      console.log('Categoría modificada con éxito:', categoriaActualizada);
    } catch (error) {
      console.error('Error al modificar la categoría:', error.message);
    }
  };

  const eliminarCategoria = async (id) => {
    try {
      const response = await fetch(`https://6721746398bbb4d93ca870e4.mockapi.io/api/v1/categorias/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.status}`);
      }

      setCategorias(categorias.filter((cat) => cat.id !== id));
      console.log(`Categoría con ID ${id} eliminada con éxito.`);
    } catch (error) {
      console.error('Error al eliminar la categoría:', error.message);
    }
  };

  useEffect(() => {
    if (status === 'authenticated' && user && user.id) {
      
      obtenerCategorias();
    }
  }, [status]);

  return (
    <CategoriasContext.Provider
      value={{
        categorias,
        cargando,
        agregarCategoria,
        modificarCategoria,
        eliminarCategoria,
        obtenerCategorias
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
};