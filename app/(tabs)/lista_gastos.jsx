import React, { useContext, useState } from 'react';
import { FlatList, View, Text, StyleSheet, Button, Image, Modal, TouchableOpacity } from 'react-native';
import { GastosContext } from '../../src/context/gastosContext';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../src/context/authContext';
import { Linking } from 'react-native';


const ExpenseTable = () => {
  const { gastos, cargando, eliminarGasto, obtenerGastos } = useContext(GastosContext);
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const gastosFiltrados = gastos.filter((gasto) => gasto.userId == user.id);

  useFocusEffect(
    React.useCallback(() => {
      obtenerGastos();
    }, [])
  );

  const openImage = (uri) => {
    setSelectedImage(uri);
    setModalVisible(true);
  };

  const openMap = (ubicacion) => {
    if (ubicacion && Object.keys(ubicacion).length > 0) {
      const lat = ubicacion.latitude;
      const lon = ubicacion.longitude;
      const url = `https://www.google.com/maps?q=${lat},${lon}`;
      Linking.openURL(url); // Abre Google Maps en el navegador
    } else {
      alert('No hay ubicacion asociada a este gasto');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Gastos</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderCell}>Descripcion</Text>
        <Text style={styles.tableHeaderCell}>Monto</Text>
        <Text style={styles.tableHeaderCell}>Categoria</Text>
        <Text style={styles.tableHeaderCell}>Fecha</Text>
        <Text style={styles.row2}>Acciones</Text>
      </View>
      <FlatList
        data={gastosFiltrados}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.descripcion}</Text>
            <Text style={styles.tableCell}>{item.monto}</Text>
            <Text style={styles.tableCell}>{item.categoria}</Text>
            <Text style={styles.tableCell}>{new Date(item.fecha * 1000).toLocaleDateString()}</Text>
            <View style={styles.col2}>
              
              {item.ticket && (
                <TouchableOpacity onPress={() => openImage(item.ticket)}>
                  <Image
                    source={{ uri: item.ticket }}
                    style={styles.imagePreview}
                  />
                </TouchableOpacity>
              )}
              {item.ubicacion && Object.keys(item.ubicacion).length > 0 ? (
                <Ionicons 
                  name="map-outline" 
                  size={20} 
                  color="orange" 
                  onPress={() => openMap(item.ubicacion)} 
                />
              ) : (
                <Ionicons name="map-outline" size={20} color="gray" />
              )}
              
              <Ionicons name="trash-outline" size={20} color="red" onPress={() => eliminarGasto(item.id)} />
              <Ionicons name="pencil-outline" size={20} color="blue" onPress={() => router.push(`modificarGasto?id=${item.id}`)}/>
                
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <Button title="Agregar Gasto" onPress={() => router.push('agregarGasto')} />

     
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close-circle" size={30} color="white" />
          </TouchableOpacity>

          <Image source={{ uri: selectedImage }} style={styles.modalImage} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    marginTop: 50,
    marginHorizontal: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5,
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  row2: {
    flex: 2,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  col2: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imagePreview: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 30,
    right: 30,
  },
  modalImage: {
    width: '90%',
    height: '70%',
    borderRadius: 10,
  },
});

export default ExpenseTable;
