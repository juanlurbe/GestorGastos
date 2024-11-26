import React, { useContext } from 'react'
import {Text, StyleSheet, TouchableOpacity} from 'react-native'
import { useRouter } from 'expo-router'
import { AuthContext } from '../context/authContext'


export const Boton = () => {
    const {logout} = useContext(AuthContext);
    const router = useRouter();

    const handleOnPress = async() => {
      await logout();
      router.push('../');
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
      fontWeight: 'light',
    },
  });

  export default Boton