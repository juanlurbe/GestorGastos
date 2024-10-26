import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

const expensesData = [
    { id: 1, descripcion: 'Almuerzo', monto: 10000 , categoria: 'Comida'},

    { id: 2, descripcion: 'Teatro', monto: 20000, categoria: 'Entretenimiento' },
  
    { id: 3, descripcion: 'Internet', monto: 50000 , categoria: 'Servicios'},
  
    { id: 4, descripcion: 'Cena', monto: 6000, categoria: 'Comida' },
  
    { id: 5, descripcion: 'Cine', monto: 8000 , categoria: 'Entretenimiento'},
  
    { id: 6, descripcion: 'Taxi', monto: 10000, categoria: 'Viajes' }
];

const ExpenseTable = () => {
    return (
      <View style={styles.container}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>ID</Text>
          <Text style={styles.tableHeaderCell}>Descripcion</Text>
          <Text style={styles.tableHeaderCell}>Monto</Text>
          <Text style={styles.tableHeaderCell}>Categoria</Text>
        </View>
        <FlatList
          data={expensesData}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.id}</Text>
              <Text style={styles.tableCell}>{item.descripcion}</Text>
              <Text style={styles.tableCell}>{item.monto}</Text>
              <Text style={styles.tableCell}>{item.categoria}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    tableHeader: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      padding: 10,
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
      padding: 10,
    },
    tableCell: {
      flex: 1,
      textAlign: 'center',
    },
  });

export default ExpenseTable;