import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import ExploreScreen from '../Screens/ExploreScreen';
import PropertyDetails from '../Screens/PropertyDetails'


const Stack=createStackNavigator();
export default function ExploreScreenStackNav() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='explore-tab' component={ExploreScreen}
         options={{
                headerShown: false,
            }}
        />
        <Stack.Screen name="property-details"
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
