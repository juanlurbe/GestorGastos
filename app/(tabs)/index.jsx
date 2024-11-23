import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GastosContext } from '../../src/context/gastosContext';
import GastosPieChart from '../../src/components/GastosPieChart';
import Boton from '../../src/components/Boton';
import { UserContext } from '../../src/context/userContext';

const HomeTabScreen = () => {
  const { gastos, cargando } = useContext(GastosContext);
  const { user} = useContext(UserContext);



  return (
    
    <View style={styles.container}>
      <View style={styles.row}>
       <Text style={styles.textoBienvenida}> Hola {user.usuario}!</Text>
       <Boton ></Boton>

      </View>
     
     
      <GastosPieChart />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#414141',
    justifyContent: 'center',
    
  },
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 20, 
    marginHorizontal: 20
  },
  textoBienvenida: {
    color: "white",
    fontSize: 24,
  }
  

});

export default HomeTabScreen;

