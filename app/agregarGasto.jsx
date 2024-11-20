import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { GastosContext } from '../src/context/gastosContext';
import { UserContext } from '../src/context/userContext';
import { useRouter } from 'expo-router';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';


const AgregarGasto = () => {
  const { agregarGasto, gastos } = useContext(GastosContext);
  const {user} = useContext(UserContext);

  const router = useRouter();
  
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');
  
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  
  const handleAgregar = () => {
    const nuevoGasto = {
      descripcion,
      monto: parseFloat(monto),
      categoria,
      fecha: Math.floor(date.getTime() / 1000),
      userId: user.id
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
        <Button onPress={showDatepicker} title="Show date picker!" />
        <Text>selected: {date.toLocaleString()}</Text>
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