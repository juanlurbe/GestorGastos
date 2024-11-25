import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, Alert, TouchableOpacity } from 'react-native';
import { GastosContext } from '../src/context/gastosContext';
import { UserContext } from '../src/context/userContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

const ModificarGasto = () => {
  const { modificarGasto, obtenerGastoPorId } = useContext(GastosContext);
  const { user } = useContext(UserContext);

  const router = useRouter();
  const { id } = useLocalSearchParams(); // Recibe el ID del gasto a modificar

  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [date, setDate] = useState(new Date());
  const [ticketImage, setTicketImage] = useState(null);

  // Cargar los datos del gasto existente
  useEffect(() => {
    if (id) {
      const gasto = obtenerGastoPorId(id);
      if (gasto) {
        setDescripcion(gasto.descripcion);
        setMonto(gasto.monto.toString());
        setCategoria(gasto.categoria);
        setDate(new Date(gasto.fecha * 1000)); // Convertir timestamp a Date
        setTicketImage(gasto.ticket || null); // Muestra la imagen si existe
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

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permiso denegado', 'Se requiere acceso a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setTicketImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    Alert.alert(
      'Eliminar imagen',
      '¿Estás seguro de que deseas eliminar la imagen?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => setTicketImage(null) },
      ]
    );
  };

  const handleModificar = () => {
    const gastoModificado = {
      id,
      descripcion,
      monto: parseFloat(monto),
      categoria,
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
        placeholder="Descripcion del gasto"
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
      <TextInput
        style={styles.input}
        placeholder="Categoria"
        value={categoria}
        onChangeText={setCategoria}
      />
      <Text style={[styles.textTittle, styles.marginBotton]}>Fecha:</Text>
      <Button onPress={showDatepicker} title="Seleccionar fecha" />
      <Text style={styles.marginBotton}>Seleccionada: {date.toLocaleDateString()}</Text>

      <Text style={[styles.textTittle, styles.marginBotton]}>Ticket (opcional):</Text>
      <Button title="Seleccionar imagen" onPress={pickImage} />
      {ticketImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: ticketImage }} style={styles.imagePreview} />
          <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
            <Text style={styles.removeButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style= {styles.buttonContainer}>
        <Button title="Modificar Gasto" onPress={handleModificar} color="green"/>

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
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  removeButton: {
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textTittle:{
    fontWeight: "bold",
    
  },
  buttonContainer: {
    marginTop: 50, 
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 10,
   },
   marginBotton:{
    marginBottom: 20
   }
});

export default ModificarGasto;
