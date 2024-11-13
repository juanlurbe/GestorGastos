import { useColorScheme } from "react-native";
import { Stack } from 'expo-router';
import { GastosProvider } from '../src/context/gastosContext';

export default function RootLayout(){

    const colorScheme = useColorScheme();

    return (
        <GastosProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="agregarGasto" options={{ title: 'Agregar Gasto' }} />
            </Stack>
        </GastosProvider>
    )
}