import React from 'react';
import { View } from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import ExpenseTable from './lista_gastos';

const HomeTabScreen = () => {
  const data = [
    { value: 50 },
    { value: 80 },
    { value: 90 },
    { value: 70 },
  ];

  return (
    <View style={{alignItems: 'center', marginTop: 400 }}>
      <PieChart data={data} donut focusOnPress='true'/>

    </View>
  );
};
export default HomeTabScreen;