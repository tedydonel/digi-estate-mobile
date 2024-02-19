import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import HomeScreen from '../Screens/HomeScreen';
import ItemList from '../Screens/ItemList';
import PropertyDetails from '../Screens/PropertyDetails'

const Stack = createStackNavigator();
export default function HomeScreenStackNav() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='home' component={HomeScreen}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen name='item-list' 
        component={ItemList}
        options={({ route }) => ({ title: route.params.category })}
        />
        <Stack.Screen name='property-details' 
        component={PropertyDetails}
        options={{
          headerStyle: { backgroundColor: '#00BFFF', },
          headerTintColor: "#fff",
          headerTitle:'Details'
        }}
        />
    </Stack.Navigator>
    
    
  )
}
