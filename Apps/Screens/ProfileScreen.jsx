import { useAuth, useUser } from '@clerk/clerk-expo'
import React from 'react'
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import edit from './../../assets/images/edit.png'
import logout from './../../assets/images/logout.png'
import magnifying from './../../assets/images/magnifying.png'
import { useNavigation } from '@react-navigation/native'

export default function ProfileScreen() {

  const {user}=useUser();
  const navigation=useNavigation();
  const { isLoaded, signOut } = useAuth();
  const menuList=[
    {
      id:1,
      name:'My Listings',
      icon:edit,
      path:'my-listings'
    },
    {
      id:2,
      name:'Explore',
      icon:magnifying,
      path:'explore'
    },
    {
      id:3,
      name:'Logout',
      icon:logout
    }
  ]

  const onMenuPress=(item)=>{
    if(item.name==='Logout')
    {
      return  signOut();
    }
    item?.path?navigation.navigate(item.path):null;
  }
  return (
    <View className="p-5 bg-white flex-1">
    <View className="items-center mt-14"> 
      <Image source={{uri:user?.imageUrl}}
        className="w-[80px] h-[80px] rounded-full"
      />
      <Text className="font-bold text-[25px] mt-2">{user?.fullName}</Text>
      <Text className="text-[18px] mt-2 text-gray-500">{user?.primaryEmailAddress.emailAddress}</Text>

    </View>
       <FlatList
        data={menuList}
        numColumns={3}
        style={{marginTop:60}}
        renderItem={({item,index})=>(
          <TouchableOpacity 
          onPress={()=>onMenuPress(item)}
          className="flex-1 p-3 border-[1px]
           items-center m-2 rounded-lg border-gray-600 
           bg-gray-200">
            {item.icon&& <Image source={item.icon}
              className="w-[60px] h-[60px]"
            />}
            <Text className="text-[12px] mt-2 ">{item.name}</Text>
          </TouchableOpacity>
        )}
       />      
    </View>
  )
}
