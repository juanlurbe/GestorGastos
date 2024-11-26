import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { GastosContext } from '../../src/context/gastosContext';
import { CategoriasContext } from '../../src/context/categoriasContext';
import { AuthContext } from '../context/authContext';

const GastosPieChart = ({ varGastos, dolares }) => {
  const { gastos } = useContext(GastosContext);
  const { categorias, obtenerCategorias } = useContext(CategoriasContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { user } = useContext(AuthContext);
  const [cotizacionDolar, setCotizacionDolar] = useState(null);

  // refresca categorías al cambiar gastos
  useEffect(() => {
    obtenerCategorias();
  }, [gastos]);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://dolarapi.com/v1/dolares/blue');
        const data = await response.json();
        const cotizacion = data.compra;
        setCotizacionDolar(cotizacion);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchExchangeRate();
  }, []);

  const gastosConvertido = gastos && dolares && cotizacionDolar !== null
    ? gastos.map((gasto) => ({
        ...gasto,
        monto: gasto.monto / cotizacionDolar,
      }))
    : gastos;

  // filtra los gastos del usuario logueado
  const gastosDelUsuario = gastosConvertido.filter((gasto) => gasto.userId === user.id);

  // calcula el acumulado por categoría
  const acumuladoPorCategoria = gastosDelUsuario.reduce((acumulador, gasto) => {
    const { categoria, monto } = gasto;
    if (!acumulador[categoria]) {
      acumulador[categoria] = 0;
    }
    acumulador[categoria] += monto;
    return acumulador;
  }, {});

  // calcula el monto total de los gastos
  const totalMonto = Object.values(acumuladoPorCategoria).reduce(
    (acc, value) => acc + value,
    0
  ).toFixed(2);

  // trae el color de la categoría desde CategoriasContext
  const getColorForCategory = (categoria) => {
    const category = categorias.find((cat) => cat.nombre === categoria);
    return category ? category.color : '#ccc';
  };

  // genera los datos para el gráfico
  const pieData = Object.entries(acumuladoPorCategoria).map(([categoria, value]) => ({
    value,
    color: getColorForCategory(categoria),
    label: categoria,
    focused: selectedCategory && selectedCategory.label === categoria,
  }));

  // renderiza los puntos de color para las leyendas
  const renderDot = (color) => (
    <View style={[styles.dot, { backgroundColor: color }]} />
  );

  // renderiza las leyendas del gráfico
  const renderLegendComponent = () => (
    <View style={styles.legendContainer}>
      {pieData.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.legendItem}
          onPress={() => setSelectedCategory({ label: item.label, value: item.value.toFixed(2) })}
        >
          {renderDot(item.color)}
          <Text style={styles.legendText}>{item.label}: $ {item.value.toFixed(2)}</Text>
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
