import React, { useState, useContext, useEffect  } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, ScrollView  } from 'react-native';
import { GastosContext} from '../src/context/gastosContext';
import { CategoriasContext } from '../src/context/categoriasContext';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import ModalNuevaCategoria from '../src/components/ModalNuevaCategoria';
import ImagePickerComponent from '../src/components/ImagePicker';
import FechaPicker from '../src/components/FechaPicker';
import { AuthContext } from '../src/context/authContext';

const AgregarGasto = () => {
  const { agregarGasto, saveFormTempData, getFormTempData, clearFormTempData } = useContext(GastosContext);
  const { categorias, agregarCategoria } = useContext(CategoriasContext);
  const { user } = useContext(AuthContext);

  const router = useRouter();

  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [colorSeleccionado, setColorSeleccionado] = useState('#009FFF');
  const [date, setDate] = useState(new Date());
  const [ticketImage, setTicketImage] = useState(null);

  const [ubicacion, setUbicacion] = useState(null);
  useEffect(() => {
    const tempData = getFormTempData();
    if (tempData) {
      setDescripcion(tempData.descripcion || '');
      setMonto(tempData.monto || '');
      setCategoriaSeleccionada(tempData.categoriaSeleccionada || '');
      setDate(tempData.date ? new Date(tempData.date) : new Date());
      setTicketImage(tempData.ticketImage || null);
      
      // Asegúrate de que la ubicación se establezca correctamente
      if (tempData.ubicacion) {
        setUbicacion(tempData.ubicacion);
      }
  
      // Limpiar datos temporales después de restaurarlos
      clearFormTempData();
    }
  }, []);

  // Método para guardar datos antes de cambiar de pantalla
  const handleSeleccionarUbicacion = () => {
    const tempData = {
      descripcion,
      monto,
      categoriaSeleccionada,
      date: date.toISOString(),
      ticketImage,
      ubicacion
    };
    
    // Guardar datos temporales
    saveFormTempData(tempData);
    
    // Navegar a la pantalla de selección de ubicación
    router.push("/SeleccionarUbicacion");
  };



  const coloresPredefinidos = [
    '#009FFF', '#93FCF8', '#BDB2FA', '#FFA5BA', '#FFDDC1',
    '#FFABAB', '#FFC3A0', '#D5AAFF', '#85E3FF', '#B9FBC0',
    '#FFD6E8', '#AFF8DB', '#FFC6FF', '#FFFFD1', '#F6A6FF',
    '#D4A5FF', '#FF99E6', '#FFB5E8', '#FBE4FF', '#ABE9B3',
  ];

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

  // Seleccionar imagen
  const pickImage = async () => {
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

  // Agregar nueva categoría
  const handleAgregarCategoria = async () => {
    if (!nuevaCategoria.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre para la categoría.');
      return;
    }

    if (categorias.some((cat) => cat.nombre.toLowerCase() === nuevaCategoria.toLowerCase())) {
      Alert.alert('Error', 'La categoría ya existe.');
      return;
    }

    if (categorias.some((cat) => cat.color === colorSeleccionado)) {
      Alert.alert('Error', 'El color seleccionado ya está en uso.');
      return;
    }

    const nuevaCat = {
      userId: user.id,
      nombre: nuevaCategoria,
      color: colorSeleccionado,
    };

    await agregarCategoria(nuevaCat);

    setNuevaCategoria('');
    setColorSeleccionado('#009FFF');
    setModalVisible(false);
    Alert.alert('Éxito', 'Categoría creada.');
  };

  // Agregar gasto
  const handleAgregarGasto = () => {
    if (!validateDescripcion() || !validateMonto()) return;

    if (!categoriaSeleccionada) {
      Alert.alert('Error', 'Selecciona una categoría.');
      return;
    }
    console.log("Ubicacion:", ubicacion);
    const nuevoGasto = {
      descripcion,
      monto: parseFloat(monto),
      categoria: categoriaSeleccionada,
      fecha: Math.floor(date.getTime() / 1000),
      userId: user.id,
      ticket: ticketImage,
      ubicacion,
    };
    agregarGasto(nuevoGasto);
    router.replace('/(tabs)/lista_gastos');
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.tittleText}>Descripción:</Text>
        <TextInput
          style={styles.input}
          value={descripcion}
          onChangeText={setDescripcion}
          placeholder="Descripción"
        />
        <Text style={styles.tittleText}>Monto:</Text>
        <TextInput
          style={styles.input}
          value={monto}
          keyboardType="numeric"
          onChangeText={setMonto}
          placeholder="Monto"
        />
        <Text style={styles.tittleText}>Categoría:</Text>
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
        <Button title="Agregar nueva categoría" onPress={() => setModalVisible(true)} />

        <ModalNuevaCategoria
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          nuevaCategoria={nuevaCategoria}
          setNuevaCategoria={setNuevaCategoria}
          coloresPredefinidos={coloresPredefinidos}
          colorSeleccionado={colorSeleccionado}
          setColorSeleccionado={setColorSeleccionado}
          handleAgregarCategoria={handleAgregarCategoria}
        />

        
        <FechaPicker 
            date={date} 
            onShowDatepicker={showDatepicker} 
            dateLabel="Seleccionar fecha" 
          />

        
        <ImagePickerComponent
          ticketImage={ticketImage}
          onPickImage={pickImage}
          onRemoveImage={() => setTicketImage(null)}
        />

        <Text style={styles.tittleText}>Agregar Localizacion (Opcional):</Text>
        <Button
          title="Seleccionar Ubicación"
          onPress={handleSeleccionarUbicacion}
        />
        {ubicacion ? (
        <View>
          <Text>Ubicación Seleccionada:</Text>
          <Text>Latitud: {ubicacion.latitude}</Text>
          <Text>Longitud: {ubicacion.longitude}</Text>
        </View>
      ) : (
        <Text>No se ha seleccionado una ubicación.</Text>
      )}

        <View style={styles.buttonContainer}>
          <Button title="Agregar Gasto" onPress={handleAgregarGasto} color="green" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  tittleText: {
    fontWeight: 'bold'

  },
  text: {
    marginVertical: 10,
  },
  marginTop:{
    marginTop: 10
  }
});

export default AgregarGasto;
