import React from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Modal, Text } from 'react-native';

const ModalNuevaCategoria = ({
  visible,
  onClose,
  nuevaCategoria,
  setNuevaCategoria,
  coloresPredefinidos,
  colorSeleccionado,
  setColorSeleccionado,
  handleAgregarCategoria,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.modalInput}
            placeholder="Nombre de la nueva categoría"
            value={nuevaCategoria}
            onChangeText={setNuevaCategoria}
          />
          <View style={styles.colorList}>
            {coloresPredefinidos.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorOption,
                  {
                    backgroundColor: color,
                    borderWidth: colorSeleccionado === color ? 3 : 1,
                  },
                ]}
                onPress={() => setColorSeleccionado(color)}
              />
            ))}
          </View>
          <View style={styles.modalButtons}>
            <Button title="Agregar" onPress={handleAgregarCategoria} color="blue" />
            <Button title="Cancelar" onPress={onClose} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  colorList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 15,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
    borderColor: '#000',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
});

export default ModalNuevaCategoria;
