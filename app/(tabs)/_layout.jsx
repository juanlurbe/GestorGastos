import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '../../constants/Colors'
import { useColorScheme } from 'react-native'
import { GastosProvider } from '../../src/context/gastosContext'

export default function TabLayout(){

    const colorScheme = useColorScheme()

    return (
        <GastosProvider>
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons size={28} name={focused ? 'home' : 'home-outline'} color={color}/>
                    )
                }}
            />
            <Tabs.Screen
                name="lista_gastos"
                options={{
                    title: "Lista de Gastos",
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons size={28} name={focused ? 'document-text' : 'document-text'} color={color}/>
                    )
                }}
            />
            <Tabs.Screen
                name="categorias"
                options={{
                    title: "Categorias",
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons size={28} name={focused ? 'albums' : 'albums'} color={color}/>
                    )
                }}
            />
        </Tabs>
        </GastosProvider>
    )
}