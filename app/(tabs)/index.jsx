import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GastosContext } from '../../src/context/gastosContext';
import GastosPieChart from '../../src/components/GastosPieChart';
import Boton from '../../src/components/Boton';
import { UserContext } from '../../src/context/userContext';

const HomeTabScreen = () => {
  const { gastos, cargando } = useContext(GastosContext);
  const { user} = useContext(UserContext);
 
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
      
       <Boton ></Boton>
       <Text> {user.id}</Text>
     
     
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
