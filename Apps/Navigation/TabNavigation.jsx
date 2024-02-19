import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { View, Text } from 'react-native'
import HomeScreen from '../Screens/HomeScreen';
import PostScreen from '../Screens/PostScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import ExploreScreen from '../Screens/ExploreScreen';
import { Ionicons } from '@expo/vector-icons'
import HomeScreenStackNav from './HomeScreenStackNav';
import ExploreScreenStackNav from './ExploreScreenStackNav';
import ProfileScreenStackNav from './ProfileScreenStackNav';


const Tab= createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown:false
    }}>
        <Tab.Screen name='home-nav' component={HomeScreenStackNav}
          options={{
            tabBarLabel:({color})=>(
              <Text style={{color:color,fontSize:12,marginBottom:3}}>Home</Text>
            ),
            tabBarIcon:({color,size}) =>(
              <Ionicons name="home" size={size} color={color}/>
            )
          }}
         />
        <Tab.Screen name='explore' component={ExploreScreenStackNav}
        options={{
            tabBarLabel:({color})=>(
              <Text style={{color:color,fontSize:12,marginBottom:3}}>Explore</Text>
            ),
            tabBarIcon:({color,size}) =>(
              <Ionicons name="search" size={size} color={color}/>
            )
          }}
         />
        <Tab.Screen name='Post' component={PostScreen}
        options={{
            tabBarLabel:({color})=>(
              <Text style={{color:color,fontSize:12,marginBottom:3}}>Post</Text>
            ),
            tabBarIcon:({color,size}) =>(
              <Ionicons name="camera" size={size} color={color}/>
            )
          }}
         />
        <Tab.Screen name='Profile' component={ProfileScreenStackNav}
        options={{
            tabBarLabel:({color})=>(
              <Text style={{color:color,fontSize:12,marginBottom:3}}>Profile</Text>
            ),
            tabBarIcon:({color,size}) =>(
              <Ionicons name="person" size={size} color={color}/>
            )
          }}
         />
    </Tab.Navigator>
  )
}
