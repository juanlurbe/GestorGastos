import React, { useState, useEffect, useContext} from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { GastosContext } from '../src/context/gastosContext';

export default function SeleccionarUbicacion() {
  const router = useRouter();
  const { getFormTempData, saveFormTempData} = useContext(GastosContext);
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState({
    latitude: -34.6037,
    longitude: -58.3816,
  });

  const [locationPermission, setLocationPermission] = useState(null);

  // Solicitar permisos de ubicación
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');

      if (status !== 'granted') {
        Alert.alert(
          'Permiso de Ubicación',
          'La aplicación necesita permiso para acceder a tu ubicación. Por favor, habilítalo en la configuración de tu dispositivo.',
          [{ text: 'OK', onPress: () => {} }]
        );
      }
    } catch (error) {
      console.error('Error solicitando permisos de ubicación:', error);
      Alert.alert('Error', 'No se pudieron obtener los permisos de ubicación');
    }
  };

  // Solicitar permisos al cargar el componente
  useEffect(() => {
    requestLocationPermission();
  }, []);


  const handleSeleccionarUbicacion = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setUbicacionSeleccionada({ latitude, longitude });
    await obtenerDireccion(latitude, longitude);
  };

  const guardarUbicacion = () => {
    const tempData = getFormTempData();
    
    // Guarda los datos temporales con la ubicacion
    saveFormTempData({
      ...tempData,
      ubicacion: ubicacionSeleccionada
    });
    router.replace("/agregarGasto");
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: ubicacionSeleccionada.latitude,
          longitude: ubicacionSeleccionada.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleSeleccionarUbicacion}
      >
        <Marker coordinate={ubicacionSeleccionada} />
      </MapView>
        <View style={styles.infoContainer}>
          <Text style={styles.coordenadasTitulo}>Ubicación Seleccionada:</Text>
          <Text style={styles.coordenadasTexto}>
            Latitud: {ubicacionSeleccionada.latitude.toFixed(4)}
            {'\n'}
            Longitud: {ubicacionSeleccionada.longitude.toFixed(4)}
          </Text>
        </View>
      <Button
        title="Guardar Ubicación"
        onPress={guardarUbicacion}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
