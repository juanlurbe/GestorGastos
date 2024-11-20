import { useColorScheme } from "react-native";
import { Stack } from 'expo-router';
import { GastosProvider } from '../src/context/gastosContext';
import { UserProvider } from "../src/context/userContext";

export default function RootLayout(){

    const colorScheme = useColorScheme();

    return (
        <GastosProvider>
            <UserProvider>

            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="agregarGasto" options={{ title: 'Agregar Gasto' }} />
            </Stack>
            </UserProvider>
        </GastosProvider>
    )
}