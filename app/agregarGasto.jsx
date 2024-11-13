import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { GastosContext } from '../src/context/gastosContext';
import { useRouter } from 'expo-router';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AgregarGasto = () => {
  const { agregarGasto, gastos } = useContext(GastosContext);
  const router = useRouter();
  
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState(new Date());

  
  const handleAgregar = () => {
    const nuevoGasto = {
      descripcion,
      monto: parseFloat(monto),
      categoria,
      fecha: Math.floor(fecha.getTime() / 1000)
    };

    agregarGasto(nuevoGasto); // Llama a la funcion agregarGasto del contexto
    router.back(); // Vuelve a la pantalla de lista de gastos
  };

  return (
    <View style={styles.container}>
      <Text>Descripción:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descripcion del gasto"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <Text>Monto:</Text>
      <TextInput
        style={styles.input}
        placeholder="Monto del gasto"
        value={monto}
        keyboardType="numeric"
        onChangeText={setMonto}
      />
      <Text>Categoría:</Text>
      <TextInput
        style={styles.input}
        placeholder="Categoria"
        value={categoria}
        onChangeText={setCategoria}
      />
        <Text>Fecha:</Text>
        <DatePicker selected={fecha} onChange={(date) => setFecha(date)} />
      <Button title="Agregar Gasto" onPress={handleAgregar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default AgregarGasto;