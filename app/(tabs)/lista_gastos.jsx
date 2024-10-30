import React, { useContext } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { GastosContext } from '../../src/context/gastosContext';


const ExpenseTable = () => {
  const { gastos, cargando } = useContext(GastosContext);
    return (
      <View style={styles.container}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>ID</Text>
          <Text style={styles.tableHeaderCell}>Descripcion</Text>
          <Text style={styles.tableHeaderCell}>Monto</Text>
          <Text style={styles.tableHeaderCell}>Categoria</Text>
        </View>
        <FlatList
          data={gastos}
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