import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
export const GastosContext = createContext();
import { useRouter } from 'expo-router';


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

  // Alta de un gasto
  const agregarGasto = async (nuevoGasto) => {

    try {
      const respuesta = await fetch('https://6721746398bbb4d93ca870e4.mockapi.io/api/v1/gastos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoGasto),
      });
      const gastoAgregado = await respuesta.json();
      setGastos([...gastos, gastoAgregado]);
      obtenerGastos();
      } catch (error) {
      console.error('Error al agregar el gasto:', error);
    }
  };

  //Eliminar Gasto
  const eliminarGasto = async (id) =>{
      Alert.alert(
        'Confirmar eliminacion',
        '¿Estas seguro de que quieres eliminar este gasto?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Eliminar',
            onPress: async () => {
              try {
                await fetch(`https://6721746398bbb4d93ca870e4.mockapi.io/api/v1/gastos/${id}`, {
                  method: 'DELETE',
                });
                setGastos(gastos.filter(gasto => gasto.id !== id));
                Alert.alert('Eliminado', 'El gasto ha sido eliminado correctamente');
              } catch (error) {
                console.error('Error al eliminar el gasto:', error);
              }
            },
          },
        ],
        { cancelable: false }
      );
    };

  useEffect(() => {
    obtenerGastos();
  }, []);

  return (
    <GastosContext.Provider value={{ gastos, cargando, agregarGasto, eliminarGasto, obtenerGastos }}>
      {children}
    </GastosContext.Provider>
  );
};
