import React, { useContext } from 'react';
import { FlatList, View, Text, StyleSheet, Button } from 'react-native';
import { GastosContext } from '../../src/context/gastosContext';
import { useRouter  } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const ExpenseTable = () => {
  const { gastos, cargando, eliminarGasto } = useContext(GastosContext);
  const router = useRouter();
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Gastos</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>ID</Text>
          <Text style={styles.tableHeaderCell}>Descripcion</Text>
          <Text style={styles.tableHeaderCell}>Monto</Text>
          <Text style={styles.tableHeaderCell}>Categoria</Text>
          <Text style={styles.row2}>Acciones</Text>
        </View>
        <FlatList
          data={gastos}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.id}</Text>
              <Text style={styles.tableCell}>{item.descripcion}</Text>
              <Text style={styles.tableCell}>{item.monto}</Text>
              <Text style={styles.tableCell}>{item.categoria}</Text>
              <Text style={styles.col2}> <Ionicons name="trash-outline" size={20} color="red" onPress={() => eliminarGasto(item.id)} /> <Ionicons name="pencil-outline" size={20} color="blue" /></Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
        <Button title="Agregar Gasto" onPress={() => router.push('agregarGasto')} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title:{
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
    },
    tableCell: {
      flex: 1,
      textAlign: 'center',
    },
    row2:{
      flex: 2,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    col2: {
      flex: 2,
      textAlign: 'center',
    }
  });

export default ExpenseTable;