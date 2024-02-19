import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import ProfileScreen from '../Screens/ProfileScreen';
import Mylistings from '../Screens/Mylistings';
import PropertyDetails from '../Screens/PropertyDetails'



const Stack=createStackNavigator();
export default function ProfileScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='profile-tab' 
      options={{
        headerShown:false
      }}
      component={ProfileScreen}/>
      <Stack.Screen name='my-listings' 
      component={Mylistings}
      options={{
        headerStyle:{
            backgroundColor:'#00BFFF'
        },
        headerTintColor:'#fff',
        headerTitle:'My Listings'
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
