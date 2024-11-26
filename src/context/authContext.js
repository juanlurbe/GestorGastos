import {createContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [status, setStatus] = useState('checking');
    const [user, setUser] = useState(null);

    useEffect(() =>{
        const cargarEstadoAuth = async () =>{
            const isAuthenticated = await AsyncStorage.getItem('isAuthenticated');
            const userData = await AsyncStorage.getItem('userData');

            if(isAuthenticated === 'true' && userData){
                setUser(JSON.parse(userData));
                setStatus('authenticated');
            }else{
                setStatus('unauthenticated');
            }
        }
        cargarEstadoAuth()
    }, [user])

    const login = async (usuario, password) => {
        try {
            const response = await fetch('https://673d0fc14db5a341d833e773.mockapi.io/Usuarios');
            const data = await response.json()
        
            const user = data.find( u => u.usuario === usuario && u.password === password );

            if(user){
                await AsyncStorage.setItem('isAuthenticated', 'true')
                await AsyncStorage.setItem('userData', JSON.stringify(user));
                setUser(user);
                setStatus('authenticated');
            }else{
                setStatus('unauthenticated');
            }
        } catch (error) {
            console.error(error)
            alert('Error en la autenticacion')
        }
    }

    const register = async (usuario, email, password) => {
    try {
        const response = await fetch('https://673d0fc14db5a341d833e773.mockapi.io/Usuarios');
        const data = await response.json()
        
        const userExist = data.some( u => u.usuario === usuario);
        const emailExist = data.some( u => u.email === email);

        if(userExist){
            alert('Usuario ya registrado')
        }
        else if(emailExist){
            alert('Email ya registrado')
        }
        else{
        const body = JSON.stringify({
            usuario: usuario,
            email: email,
            password: password,
            admin: false
        })

        const response = await fetch('https://673d0fc14db5a341d833e773.mockapi.io/Usuarios', {
            method: 'POST',
            headers:{
            'Content-Type':'application/json'
            },
            body: body
        });

        if(response.ok){
            alert('Registro Exitoso')
        }else{
            alert('Error al registrar el usuario')
        }
        }
    } catch (error) {
        alert('Error en la autenticacion')
    }
    }

    const logout = async() =>{
        setStatus('unauthenticated');
    }

    return (
        <AuthContext.Provider value={{login, register, status, user, logout}}>
            {children}
        </AuthContext.Provider>
    )
}