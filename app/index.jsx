import { Image, StyleSheet, Platform, View, Text, TextInput, Button, Switch, Alert } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'expo-router';
import { AuthContext } from '../src/context/authContext';
import * as LocalAuthentication from 'expo-local-authentication';

export default function Login() {
  const [esLogin, setEsLogin] = useState(false)
  const [usuario, setUsuario ] = useState('');
  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');

  const {login, register, status, user} = useContext(AuthContext);

  const router = useRouter()

  const handleSubmit = async () =>{
    if(esLogin){
      await login(usuario,password);
      if (status === 'authenticated') {
        router.push('/(tabs)'); 
      } else {
        Alert.alert('Credenciales incorrectas');
      }
    }else{
      await register(usuario,email,password);
    }
  }

  const handleAuth = async () =>{
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if(!hasHardware){
      console.log("Error, el dispositivo no permite la authenticacion biometrica")
    }
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if(!isEnrolled){
      console.log("Error, No hay datos biometricos registrados en el dispositivo")
    }
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Porfavor confirme su identidad'
    });
    if(auth.success){
      router.push('/(tabs)');
    }else{
      Alert.alert("Error, no se pudo verificar la identidad")
    }
   }

  useEffect(() =>{
    if(status === 'authenticated'){
      handleAuth();
    }
  }, [status])

  if(status === 'checking'){
    return (
      <View style={styles.containerCenter}> 
        <Text style={styles.cargando}>Cargando...</Text> 
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{esLogin ? 'Login' : 'Register'}</Text>
      <Text>Usuario:</Text>
      <TextInput 
        style={ styles.input} 
        placeholder='Ingrese su Usuario'
        value={usuario}
        onChangeText={setUsuario}
        />
      {
        !esLogin && (
          <>
          <Text>Email:</Text>
          <TextInput 
            style={ styles.input} 
            placeholder='Ingrese su Email'
            value={email}
            onChangeText={setEmail}
            />
          </>
        )
      }
      <Text>Password:</Text>
      <TextInput 
        secureTextEntry={true}  
        style={ styles.input} 
        placeholder='Ingrese su password'
        value={password}
        onChangeText={setPassword}
        />
      <View style={styles.register}>
        <Button title={'Iniciar Sesion'} onPress={handleSubmit} />
      </View>
      <View>
        <Text>{esLogin ? "Cambia a Registro" : 'Cambia a Login'}</Text>
        <Switch value={esLogin} onValueChange={setEsLogin}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input:{
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  title:{
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },  
  register:{
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  containerCenter:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cargando:{
    textAlign: 'center',
    fontSize: 20,
  }
});
