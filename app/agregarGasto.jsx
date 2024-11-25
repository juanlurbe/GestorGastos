import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, Alert} from 'react-native';
import { GastosContext } from '../src/context/gastosContext';
import { UserContext } from '../src/context/userContext';
import { useRouter } from 'expo-router';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

const AgregarGasto = () => {
  const { agregarGasto } = useContext(GastosContext);
  const { user } = useContext(UserContext);

  const router = useRouter();

  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [date, setDate] = useState(new Date());
  const [ticketImage, setTicketImage] = useState(null);

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

  // Manejar la selección de imagen
  const pickImage = async () => {
    // Solicitar permisos para acceder a la biblioteca de imágenes
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
   

    if (!permissionResult.granted) {
      Alert.alert('Permiso denegado', 'Se requiere acceso a la galería.');
      return;
    }

    // Seleccionar una imagen
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });
    

    if (!result.canceled) {
      setTicketImage(result.assets[0].uri);
    }
  };

  const handleAgregar = () => {
    const nuevoGasto = {
      descripcion,
      monto: parseFloat(monto),
      categoria,
      fecha: Math.floor(date.getTime() / 1000),
      userId: user.id,
      ticket: ticketImage,
    };

    agregarGasto(nuevoGasto); // Llama a la función agregarGasto del contexto
    router.back(); // Vuelve a la pantalla de lista de gastos
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
      <Text style={[styles.text, styles.textTittle]}>Fecha:</Text>
      <Button onPress={showDatepicker} title="Seleccionar fecha" />
      <Text style={styles.text}>Seleccionada: {date.toLocaleDateString()}</Text>
  
      <Text style={[styles.text, styles.textTittle]}>Adjuntar ticket (opcional):</Text>
      <Button title="Seleccionar imagen" onPress={pickImage} />
        {ticketImage && (
          <View style={styles.imageContainer}>
          <Image source={{ uri: ticketImage }} style={styles.imagePreview} />
          <Button
            title="Eliminar"
            onPress={() => setTicketImage(null)} // Limpiar la imagen seleccionada
            color="red"
          />
        </View>
)}
  
     
      <View style={styles.buttonContainer}>
        <Button title="Agregar Gasto" onPress={handleAgregar} color="green" />
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 5,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 50, 
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 10,
   },
   text:{
    marginBottom: 20,
  },
  textTittle:{
    fontWeight: "bold"
  }
});


export default AgregarGasto;
