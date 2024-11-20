import React from 'react'
import {Text, StyleSheet, TouchableOpacity} from 'react-native'
import { useRouter } from 'expo-router'


export const Boton = () => {
    const router = useRouter();

    const handleOnPress = () => {
        router.push('../')
    }

  return (
    <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handleOnPress}>Logout</Text>
    </TouchableOpacity>
  )

  
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#4287f5',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  export default Boton