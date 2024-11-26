import { useColorScheme } from "react-native";
import { Stack } from 'expo-router';
import { GastosProvider } from '../src/context/gastosContext';
import { AuthProvider } from "../src/context/authContext";

export default function RootLayout(){

    const colorScheme = useColorScheme();

    return (
        <AuthProvider>
            <GastosProvider>
                <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="agregarGasto" options={{ title: 'Agregar Gasto' }} />
                </Stack>
            </GastosProvider>
        </AuthProvider>
    )
}