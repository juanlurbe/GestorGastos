import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { GastosContext } from '../../src/context/gastosContext';
import { CategoriasContext } from '../../src/context/categoriasContext';

const GastosPieChart = () => {
  const { gastos } = useContext(GastosContext);
  const { categorias } = useContext(CategoriasContext);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // calculas gastos por categoria
  const acumuladoPorCategoria = gastos.reduce((acumulador, gasto) => {
    const { categoria, monto } = gasto;
    if (!acumulador[categoria]) {
      acumulador[categoria] = 0;
    }
    acumulador[categoria] += monto;
    return acumulador;
  }, {});

  // calcula total de gastos
  const totalMonto = Object.values(acumuladoPorCategoria).reduce(
    (acc, value) => acc + value,
    0
  );

  // busca el color de cada categoria, sino devuelve gris
  const getColorForCategory = (categoria) => {
    const category = categorias.find((cat) => cat.nombre === categoria);
    return category ? category.color : '#ccc'; 
  };

  // pieData con el color correcto traido de categoriasContext
  const pieData = Object.entries(acumuladoPorCategoria).map(([categoria, value]) => ({
    value,
    color: getColorForCategory(categoria),
    label: categoria,
    focused: selectedCategory && selectedCategory.label === categoria, // Mantiene el enfoque
  }));

  // punto de color para cada leyenda
  const renderDot = (color) => (
    <View style={[styles.dot, { backgroundColor: color }]} />
  );

  // leyendas basadas en pieData
  const renderLegendComponent = () => (
    <View style={styles.legendContainer}>
      {pieData.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.legendItem}
          onPress={() => setSelectedCategory({ label: item.label, value: item.value })} 
        >
          {renderDot(item.color)}
          <Text style={styles.legendText}>{item.label}: $ {item.value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gastos</Text>
      <View style={styles.chartContainer}>
        <PieChart
          data={pieData}
          donut
          sectionAutoFocus 
          radius={130}
          innerRadius={90}
          innerCircleColor="#414455"
          onPress={() => null} 
          centerLabelComponent={() => (
            <TouchableOpacity
              onPress={() => setSelectedCategory(null)} 
              style={styles.centerLabel}
            >
              <Text style={styles.centerLabelText}>
                <Text style={styles.pesosSign}>$</Text> 
                {selectedCategory ? selectedCategory.value : totalMonto}
              </Text>
              <Text style={styles.centerLabelSubText}>
               {selectedCategory ? selectedCategory.label : 'Total'}
                
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {renderLegendComponent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  chartContainer: {
    alignItems: 'center',
    width: '100%',
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
  pesosSign: {
    fontSize: 24, 
    color: 'white',
    fontWeight: 'normal',
  },
});

export default GastosPieChart;
