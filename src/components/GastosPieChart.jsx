import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { GastosContext } from '../../src/context/gastosContext';
import { CategoriasContext } from '../../src/context/categoriasContext';





const GastosPieChart = () => {
    const { gastos, cargando } = useContext(GastosContext);
    const { categorias } = useContext(CategoriasContext);

    console.log(categorias);

//   const pieData = [
//     {
//       value: 47,
//       color: '#009FFF',
//     //   gradientCenterColor: '#006DFF',
      
//     },
//     { value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
//     { value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
//     { value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
//   ];


   const acumuladoPorCategoria = gastos.reduce((acumulador, gasto) => {
    const { categoria, monto } = gasto;
    if (!acumulador[categoria]) {
      acumulador[categoria] = 0;
    }
    acumulador[categoria] += monto;
    return acumulador;
  }, {});

  const getColorForCategory = (categoria) => {
    const category = categorias.find(cat => cat.nombre === categoria);
    return category ? category.color : '#ccc';
  };

  const pieData = Object.entries(acumuladoPorCategoria).map(([categoria, value]) => ({
    value, 
    color:getColorForCategory(categoria),
    label: categoria,
  }));

  const renderDot = (color) => (
    <View style={[styles.dot, { backgroundColor: color }]} />
  );

  
  const renderLegendComponent = () => (
    <View style={styles.legendContainer}>
      {pieData.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          {renderDot(item.color)}
          <Text style={styles.legendText}>{item.label}: {item.value}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gráfico</Text>
      <View style={styles.chartContainer}>
        <PieChart
          data={pieData}
          donut
           
          focusOnPress
          radius={130}
          innerRadius={90}
          innerCircleColor={'#232B5D'}
          centerLabelComponent={() => (
            <View style={styles.centerLabel}>
              <Text style={styles.centerLabelText}>47%</Text>
              <Text style={styles.centerLabelSubText}>Total</Text>
            </View>
          )}
        />
      </View>
      {renderLegendComponent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    // backgroundColor: '#34448B',
    borderRadius: 20,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  chartContainer: {
    alignItems: 'center',
    width: "100%",
  },
  centerLabel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerLabelText: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
  },
  centerLabelSubText: {
    fontSize: 18,
    color: 'white',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  legendItemMargin: {
    marginRight: 30,
  },
  legendText: {
    color: 'white',
    fontSize: 16,
  },
  dot: {
    height: 20,
    width: 20,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default GastosPieChart;
