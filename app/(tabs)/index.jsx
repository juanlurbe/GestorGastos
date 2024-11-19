import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GastosContext } from '../../src/context/gastosContext';
import GastosPieChart from '../../src/components/GastosPieChart';

const HomeTabScreen = () => {
  const { gastos, cargando } = useContext(GastosContext);

 
  const acumuladoPorCategoria = gastos.reduce((acumulador, gasto) => {
    const { categoria, monto } = gasto;
    if (!acumulador[categoria]) {
      acumulador[categoria] = 0;
    }
    acumulador[categoria] += monto;
    return acumulador;
  }, {});

  return (
    <View style={styles.container}>
     
      <GastosPieChart />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#414141',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

});

export default HomeTabScreen;
