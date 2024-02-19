import { useUser } from '@clerk/clerk-expo'
import React from 'react'
import { View, Text, Image, TextInput} from 'react-native'
import { Ionicons } from '@expo/vector-icons'


export default function Header() {
    const {user}=useUser();
  return (
    <View>
        {/* User Info Section */}
        <View className="flex flex-row item-center gap-2">
            <Image source={{uri:user?.imageUrl}}
                className="rounded-full w-12 h-12"
            />
            <View>
                <Text className="text-[16px]">Welcome</Text>
                <Text className="text-[16px] font-bold">{user?.fullName}</Text>
            </View>
        </View>
        {/* Seach bar */}
        <View className="p-2 px-5 flex flex-row items-center bg-blue-100 mt-5 rounded-full">
        <Ionicons name="search" size={24} color="blue" />
            <TextInput placeholder='Search' 
            className="ml-3 text-[18px]"
                onChangeText={(value)=>console.log(value)}
            />
        </View>
    </View>
  )
}
