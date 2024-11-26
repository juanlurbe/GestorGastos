import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { GastosContext } from '../src/context/gastosContext';
import { CategoriasContext } from '../src/context/categoriasContext';
import { AuthContext } from '../src/context/authContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import FechaPicker from '../src/components/FechaPicker';
import ImagePickerComponent from '../src/components/ImagePicker';
import { Picker } from '@react-native-picker/picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

// Función para seleccionar imágenes
const pickImage = async (setTicketImage) => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permissionResult.granted) {
    Alert.alert('Permiso denegado', 'Se requiere acceso a la galería.');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    setTicketImage(result.assets[0].uri);
  }
};

const ModificarGasto = () => {
  const { modificarGasto, obtenerGastoPorId } = useContext(GastosContext);
  const { categorias } = useContext(CategoriasContext);
  const { user } = useContext(AuthContext);

  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [date, setDate] = useState(new Date());
  const [ticketImage, setTicketImage] = useState(null);

  // Cargar los datos del gasto existente
  useEffect(() => {
    if (id) {
      const gasto = obtenerGastoPorId(id);
      if (gasto) {
        setDescripcion(gasto.descripcion);
        setMonto(gasto.monto.toString());
        setCategoriaSeleccionada(gasto.categoria);
        setDate(new Date(gasto.fecha * 1000)); // timestamp a Date
        setTicketImage(gasto.ticket || null); // muestra la imagen si existe
      }
    }
  }, [id]);

  // Validar descripción
  const validateDescripcion = () => {
    const regex = /^[a-zA-Z0-9\s]+$/;
    if (descripcion.trim() === '' || !regex.test(descripcion)) {
      Alert.alert('Error', 'Por favor ingresa una descripción válida.');
      return false;
    }
    return true;
  };

  // Validar monto
  const validateMonto = () => {
    if (isNaN(parseFloat(monto)) || parseFloat(monto) <= 0) {
      Alert.alert('Error', 'Por favor ingresa un monto válido.');
      return false;
    }
    return true;
  };

  // Mostrar selector de fecha
  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
      },
      mode: 'date',
      is24Hour: true,
    });
  };

  const handleModificar = () => {
    if (!validateDescripcion() || !validateMonto()) return;

    const gastoModificado = {
      id,
      descripcion,
      monto: parseFloat(monto),
      categoria: categoriaSeleccionada,
      fecha: Math.floor(date.getTime() / 1000),
      userId: user.id,
      ticket: ticketImage,
    };

    modificarGasto(gastoModificado);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTittle}>Descripción:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descripción del gasto"
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <Text style={styles.textTittle}>Monto:</Text>
      <TextInput
        style={styles.input}
        placeholder="Monto del gasto"
        value={monto}
        keyboardType="numeric"
        onChangeText={setMonto}
      />

      <Text style={styles.textTittle}>Categoría:</Text>
      <Picker
        selectedValue={categoriaSeleccionada}
        onValueChange={(itemValue) => setCategoriaSeleccionada(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona una categoría" value="" />
        {categorias.map((cat) => (
          <Picker.Item key={cat.id} label={cat.nombre} value={cat.nombre} />
        ))}
      </Picker>

      <FechaPicker
        date={date}
        onShowDatepicker={showDatepicker}
        dateLabel="Seleccionar fecha"
      />

      <ImagePickerComponent
        ticketImage={ticketImage}
        onPickImage={() => pickImage(setTicketImage)}
        onRemoveImage={() => {
          Alert.alert(
            'Eliminar imagen',
            '¿Estás seguro de que deseas eliminar la imagen?',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Eliminar', onPress: () => setTicketImage(null) },
            ]
          );
        }}
      />

      <View style={styles.buttonContainer}>
        <Button title="Modificar Gasto" onPress={handleModificar} color="green" />
      </View>
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
  picker: {
    height: 50,
    marginVertical: 10,
  },
  textTittle: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default ModificarGasto;
