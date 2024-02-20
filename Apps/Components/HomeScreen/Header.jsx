import { useUser } from '@clerk/clerk-expo'
import React from 'react'
import { View, Text, Image, TextInput} from 'react-native'
import { Ionicons } from '@expo/vector-icons'


export default function Header() {
    const {user}=useUser();
  return (
    <View>
        {/* User Info Section */}
        <View className="flex flex-row item-center gap-2 mt-6">
            <Image source={{uri:user?.imageUrl}}
                className="rounded-full w-12 h-12"
            />
            <View>
                <Text className="text-[16px]">Welcome</Text>
                <Text className="text-[16px] font-bold">{user?.fullName}</Text>
            </View>
        </View>
    </View>
  )
}
