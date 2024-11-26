import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

const FechaPicker = ({ date, onShowDatepicker, dateLabel }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{dateLabel}</Text>
      <Button onPress={onShowDatepicker} title="Seleccionar fecha" />
      <Text style={styles.dateText}>Seleccionada: {date.toLocaleDateString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  text: {
    marginBottom: 20,
    fontWeight: 'bold',
  },
  dateText: {
    marginTop: 5,
  },
});

export default FechaPicker;
