import React, { useState, useContext } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { GastosContext } from '../../src/context/gastosContext';
import { AuthContext } from '../../src/context/authContext';
import { CategoriasContext } from '../../src/context/categoriasContext';
import ModalNuevaCategoria from '../../src/components/ModalNuevaCategoria';

const DropdownComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [colorSeleccionado, setColorSeleccionado] = useState('#009FFF');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const { gastos, modificarGasto } = useContext(GastosContext);
  const { user } = useContext(AuthContext);
  const { categorias, agregarCategoria, eliminarCategoria, modificarCategoria } = useContext(CategoriasContext);

  // Colores predefinidos
  const coloresPredefinidos = [
    '#009FFF', '#93FCF8', '#BDB2FA', '#FFA5BA', '#FFDDC1',
    '#FFABAB', '#FFC3A0', '#D5AAFF', '#85E3FF', '#B9FBC0',
    '#FFD6E8', '#AFF8DB', '#FFC6FF', '#FFFFD1', '#F6A6FF',
    '#D4A5FF', '#FF99E6', '#FFB5E8', '#FBE4FF', '#ABE9B3',
  ];

  // Filtra gastos del usuario logueado
  const gastosDelUsuario = gastos.filter(gasto => gasto.userId === user.id);

  // Genera lista de categorías basadas en los gastos del usuario
  const listaCategorias = [
    { label: 'Todas las Categorías', value: null },
    ...categorias.map(cat => ({ label: cat.nombre, value: cat.nombre })),
  ];

  // Eliminar categoría con validación
  const handleEliminarCategoria = () => {
    const existeEnGastos = gastosDelUsuario.some(gasto => gasto.categoria === selectedCategory);
    if (existeEnGastos) {
      Alert.alert('Error', 'No se puede eliminar una categoría que está siendo utilizada en un gasto.');
      return;
    }

    const categoria = categorias.find(cat => cat.nombre === selectedCategory);
    if (categoria) {
      Alert.alert(
        'Eliminar Categoría',
        '¿Estás seguro de que deseas eliminar esta categoría?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Eliminar', onPress: () => eliminarCategoria(categoria.id) },
        ]
      );
    }
  };

  // Modificar categoría
  const handleModificarCategoria = () => {
    const categoria = categorias.find(cat => cat.nombre === selectedCategory);
    if (categoria) {
      setCategoriaSeleccionada(categoria);
      setNuevaCategoria(categoria.nombre);
      setColorSeleccionado(categoria.color);
      setModalVisible(true);
    }
  };

  // Agregar nueva categoría
  const handleAgregarCategoria = () => {
    setCategoriaSeleccionada(null);
    setNuevaCategoria('');
    setColorSeleccionado('#009FFF');
    setModalVisible(true);
  };

  // Filtra los gastos según la categoría seleccionada
  const gastosFiltrados = selectedCategory
    ? gastosDelUsuario.filter(gasto => gasto.categoria === selectedCategory)
    : gastosDelUsuario;

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={listaCategorias}
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
            <AntDesign style={styles.icon} color={isFocus ? 'blue' : 'black'} name="filter" size={20} />
          )}
        />

        <TouchableOpacity onPress={handleAgregarCategoria} style={styles.actionButton}>
          <Ionicons name="add-circle-outline" size={30} color="green" />
        </TouchableOpacity>

        {selectedCategory && (
          <>
            <TouchableOpacity onPress={handleModificarCategoria} style={styles.actionButton}>
              <Ionicons name="create-outline" size={30} color="blue" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleEliminarCategoria} style={styles.actionButton}>
              <Ionicons name="trash-outline" size={30} color="red" />
            </TouchableOpacity>
          </>
        )}
      </View>

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

      <ModalNuevaCategoria
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        nuevaCategoria={nuevaCategoria}
        setNuevaCategoria={setNuevaCategoria}
        coloresPredefinidos={coloresPredefinidos}
        colorSeleccionado={colorSeleccionado}
        setColorSeleccionado={setColorSeleccionado}
        handleAgregarCategoria={() => {
          if (categoriaSeleccionada) {
            modificarCategoria(categoriaSeleccionada.id, { nombre: nuevaCategoria, color: colorSeleccionado });
          } else {
            agregarCategoria({ nombre: nuevaCategoria, color: colorSeleccionado });
          }
          setModalVisible(false);
        }}
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
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dropdown: {
    flex: 1,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  actionButton: {
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
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
