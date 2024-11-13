import {React, useContext} from 'react';
import { View, Text } from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import { GastosContext } from '../../src/context/gastosContext';

const HomeTabScreen = () => {
  const { gastos, cargando } = useContext(GastosContext);

   const primerGasto = gastos[0]

  //  const gastosPorCategoria = gastos.reduce()

  
  const acumuladoPorCategoria = gastos.reduce((acumulador, gasto) => {
    const { categoria, monto } = gasto;
    if (!acumulador[categoria]) {
      acumulador[categoria] = 0;
    }
    acumulador[categoria] += monto;
    return acumulador;
  }, {});

  // console.log(acumuladoPorCategoria)
   
  
  const renderLegend = (text, color) => {

    return (

      <View style={{flexDirection: 'row', marginBottom: 12}}>

        <View

          style={{

            height: 18,

            width: 18,

            marginRight: 10,

            borderRadius: 4,

            backgroundColor: color || 'white',

          }}

        />

        <Text style={{color: 'white', fontSize: 16}}>{text || ''}</Text>

      </View>

    );

  };



  return (

    <View>

      <View

        style={{

          marginVertical: 100,

          marginHorizontal: 30,

          borderRadius: 10,

          paddingVertical: 50,

          backgroundColor: '#414141',

          justifyContent: 'center',

          alignItems: 'center',

        }}>



        {/*********************    Custom Header component      ********************/}

        <Text

          style={{

            color: 'white',

            fontSize: 32,

            fontWeight: 'bold',

            marginBottom: 12,

          }}>

          Gastos Totales

        </Text>

        {/****************************************************************************/}



        <PieChart

          strokeColor="white"

          strokeWidth={4}

          donut

          data={[

            {value: 20, textColor:"black"},

            {value: 40, text:"Entretenimiento", textColor:"white"},

            {value: 20},
            {value: 21}

          ]}

          innerCircleColor="#414141"

          innerCircleBorderWidth={4}

          innerCircleBorderColor={'white'}

          showValuesAsLabels={true}

          showText

          textSize={18}

          showTextBackground={false}

          centerLabelComponent={() => {

            return (

              <View>

                <Text style={{color: 'white', fontSize: 36}}>90</Text>

                <Text style={{color: 'white', fontSize: 18}}>Total</Text>

              </View>

            );

          }}

        />



        {/*********************    Custom Legend component      ********************/}

        <View

          style={{

            width: '100%',

            flexDirection: 'row',

            justifyContent: 'space-evenly',

            marginTop: 20,

          }}>

          {renderLegend('Jan', 'rgb(84,219,234)')}

          {renderLegend('Feb', 'lightgreen')}

          {renderLegend('Mar', 'orange')}
          {renderLegend('Nov', 'red')}

        </View>

        {/****************************************************************************/}


        

      </View>

    </View>

);
};
export default HomeTabScreen;