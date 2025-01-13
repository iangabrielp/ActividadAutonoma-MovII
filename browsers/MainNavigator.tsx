import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "../screens/LoginScreen";
import RegistroScreen from "../screens/RegistroScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import GaleriaScreen from "../screens/GaleriaScreen";
import CamaraScreen from "../screens/CamaraScreen";

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function MyStack(){
    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Login"  component={ LoginScreen}/>
            <Stack.Screen name='Registro' component={ RegistroScreen} />
            <Stack.Screen name="Welcome" component={MyTabs} />
        </Stack.Navigator>
    )
}

function MyTabs(){
    return(
        <Tab.Navigator>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Galeria" component={GaleriaScreen} />
            <Stack.Screen name="Camara" component={CamaraScreen} />
        </Tab.Navigator>
    )
}

export default function Navegador(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}