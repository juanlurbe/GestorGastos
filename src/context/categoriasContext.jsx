import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './userContext';

export const CategoriasContext = createContext();

export const CategoriasProvider = ({ children }) => {
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const { user } = useContext(UserContext);

    const obtenerCategorias = async () => {
        if (!user || !user.id) {
            console.error('El usuario no está definido. No se pueden cargar las categorías.');
            return;
        }

        try {
            const respuesta = await fetch('https://6721746398bbb4d93ca870e4.mockapi.io/api/v1/categorias');
            const data = await respuesta.json();
            const categoriasUsuario = data.filter((cat) => cat.userId === user.id);
            setCategorias(categoriasUsuario);
        } catch (error) {
            console.error('Error al obtener las Categorias:', error);
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
            console.error('Error al agregar la categoría:', error);
        }
    };

    const eliminarCategoria = async (id) => {
        try {
            await fetch(`https://6721746398bbb4d93ca870e4.mockapi.io/api/v1/categorias/${id}`, {
                method: 'DELETE',
            });
            setCategorias(categorias.filter((cat) => cat.id !== id));
        } catch (error) {
            console.error('Error al eliminar la categoría:', error);
        }
    };

    useEffect(() => {
        if (user && user.id) {
            setCargando(true);
            obtenerCategorias();
        }
    }, [user]);

    return (
        <CategoriasContext.Provider value={{ categorias, cargando, agregarCategoria, eliminarCategoria }}>
            {children}
        </CategoriasContext.Provider>
    );
};
