import { useColorScheme } from "react-native";
import { Stack } from 'expo-router';
import { GastosProvider } from '../src/context/gastosContext';
import { CategoriasProvider } from "../src/context/categoriasContext";
import { AuthProvider } from "../src/context/authContext";


export default function RootLayout(){

    const colorScheme = useColorScheme();

    return (

 <AuthProvider>
        <GastosProvider>
            
                <CategoriasProvider>

            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="agregarGasto" options={{ title: 'Agregar Gasto' }} />
            </Stack>
                </CategoriasProvider>
            
        </GastosProvider>
 </AuthProvider>

    )
}