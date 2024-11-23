import React, { useState, useContext } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GastosContext } from '../../src/context/gastosContext';
import { UserContext } from '../../src/context/userContext';

const DropdownComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const { gastos } = useContext(GastosContext);
  const { user } = useContext(UserContext);

  // Filtra gastos del usuario logueado
  const gastosDelUsuario = gastos.filter(gasto => gasto.userId === user.id);

  // Genera lista de categorías basadas en los gastos del usuario
  const categorias = [
    { label: 'Todas las Categorías', value: null },
    ...Array.from(
      new Set(gastosDelUsuario.map(gasto => gasto.categoria))
    ).map(categoria => ({ label: categoria, value: categoria })),
  ];

  // Filtra los gastos segun la categoría seleccionada
  const gastosFiltrados = selectedCategory
    ? gastosDelUsuario.filter(gasto => gasto.categoria === selectedCategory)
    : gastosDelUsuario;

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={categorias}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Seleccione una categoría' : '...'}
        value={selectedCategory}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setSelectedCategory(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="filter"
            size={20}
          />
        )}
      />

      <FlatList
        data={gastosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
           
            <Text style={[styles.tableCell, styles.leftCell]}>{item.descripcion}</Text>

            <Text style={[styles.tableCell, styles.centerCell]}>
              {new Date(item.fecha * 1000).toLocaleDateString()}
            </Text>

           <Text style={[styles.tableCell, styles.rightCell]}>${item.monto}</Text>
          </View>
        )}
      />

    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    flex: 1,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    fontSize: 14,
    color: '#333',
  },
  leftCell: {
    flex: 2,
    textAlign: 'left',
  },
  centerCell: {
    flex: 1,
    textAlign: 'center',
  },
  rightCell: {
    flex: 1,
    textAlign: 'right',
  },
 
 
});
