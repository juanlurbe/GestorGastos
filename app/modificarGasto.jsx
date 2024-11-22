import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { GastosContext } from '../src/context/gastosContext';
import { UserContext } from '../src/context/userContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const ModificarGasto = () => {
  const { modificarGasto, obtenerGastoPorId } = useContext(GastosContext);
  const { user } = useContext(UserContext);

  const router = useRouter();
  const { id } = useLocalSearchParams(); // Recibe el ID del gasto a modificar

  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [date, setDate] = useState(new Date());

  // Cargar los datos del gasto existente
  useEffect(() => {
    if (id) {
      const gasto = obtenerGastoPorId(id); 
      if (gasto) {
        setDescripcion(gasto.descripcion);
        setMonto(gasto.monto.toString());
        setCategoria(gasto.categoria);
        setDate(new Date(gasto.fecha * 1000)); // Convertir timestamp a Date
      }
    }
  }, [id]);

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

  const handleModificar = () => {
    const gastoModificado = {
      id,
      descripcion,
      monto: parseFloat(monto),
      categoria,
      fecha: Math.floor(date.getTime() / 1000),
      userId: user.id,
    };

    modificarGasto(gastoModificado);
    router.back();
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
      <Button onPress={showDatepicker} title="Seleccionar fecha" />
      <Text>Seleccionada: {date.toLocaleString()}</Text>
      <Button title="Modificar Gasto" onPress={handleModificar} />
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

export default ModificarGasto;