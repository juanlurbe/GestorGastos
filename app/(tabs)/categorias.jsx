import React, { useState, useContext } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GastosContext } from '../../src/context/gastosContext';
import { TouchableOpacity } from 'react-native';
import { CategoriasContext } from '../../src/context/categoriasContext';

  const DropdownComponent = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const { gastos, cargando } = useContext(GastosContext);
    const [gastosFiltrados, setGastosFiltrados] = useState(gastos);
    const { categorias} = useContext(CategoriasContext);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Dropdown label
          </Text>
        );
      }
      return null;
    };


    const filtrar_x_cat = (categoria) => {
        if(categoria){
            const filtrados = gastos.filter(gasto => gasto.categoria===categoria.value)
            setGastosFiltrados(filtrados)
        }
        else{
            setGastosFiltrados(gastos)
        }
    }
    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={categorias}
          search
          maxHeight={300}
          labelField="nombre"
          valueField="color"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            setGastosFiltrados(gastos);
            filtrar_x_cat(item)
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
        <FlatList
          data  = {gastosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.gastos}>{item.monto}</Text>
              <Text style={styles.gastos}>{item.categoria}</Text>
            </View>
          )}
        />

          <FlatList
          data  = {categorias}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.gastos}>{item.nombre}</Text>
              <Text style={styles.gastos}>{item.color}</Text>
            </View>
          )}
        />

        <TouchableOpacity style={styles.button} onPress={console.log("boton")}>
          <Text>Press Here</Text>
        </TouchableOpacity>


      </View>


    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
    },
  });