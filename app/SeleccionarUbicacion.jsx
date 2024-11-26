import React, { useState, useEffect} from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function SeleccionarUbicacion() {
  const router = useRouter();

  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState({
    latitude: -34.6037,
    longitude: -58.3816,
  });

  const handleSeleccionarUbicacion = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setUbicacionSeleccionada({ latitude, longitude });
  };

  const guardarUbicacion = () => {
    router.replace({
      pathname: "/agregarGasto",
      params: {ubicacion: JSON.stringify(ubicacionSeleccionada) },
    });
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
      <Button
        title="Guardar Ubicación"
        onPress={() => guardarUbicacion(ubicacionSeleccionada)}
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
