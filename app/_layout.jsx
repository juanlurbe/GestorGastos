import { useColorScheme } from "react-native";
import { Stack } from 'expo-router';
import { GastosProvider } from '../src/context/gastosContext';
import { CategoriasProvider } from "../src/context/categoriasContext";
import { AuthProvider } from "../src/context/authContext";
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';



export default function RootLayout(){

    const colorScheme = useColorScheme();
    const router = useRouter();
    return (
    <AuthProvider>
        <GastosProvider>
            <CategoriasProvider>
                <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="agregarGasto" options={{ title: 'Agregar Gasto', headerLeft: () => (
                        <TouchableOpacity onPress={() => router.push('/(tabs)/lista_gastos')}>
                            <Ionicons name="arrow-back" size={30} color="black" />
                        </TouchableOpacity>
                        ), }}>
                    </Stack.Screen>
                </Stack>
            </CategoriasProvider>
        </GastosProvider>
    </AuthProvider>
    )
}