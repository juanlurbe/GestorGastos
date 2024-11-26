import React from 'react';
import { View, Button, Image, StyleSheet, Text } from 'react-native';

const ImagePickerComponent = ({ ticketImage, onPickImage, onRemoveImage }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.tittleText}>Adjuntar ticket (opcional)</Text>

      
      <Button title="Seleccionar imagen" onPress={onPickImage} />
      {ticketImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: ticketImage }} style={styles.imagePreview} />
          <Button title="Eliminar" onPress={onRemoveImage} color="red" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 5,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  tittleText:{
    fontWeight: "bold",
    marginBottom: 10
  }
});

export default ImagePickerComponent;
