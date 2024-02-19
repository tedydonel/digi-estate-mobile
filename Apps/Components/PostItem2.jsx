import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function PostItem({item}) {

  const navigation=useNavigation();

  return (
    <TouchableOpacity className="flex-1 m-1 p-1 rounded-lg border-[1px] border-slate-200 bg-blue-[40]"
    onPress={()=>navigation.push('property-details',
    {
      property:item
    })}
    >
    <Image source={{uri: item.image}}
      className="w-full h-[150px] rounded-lg"/>
      <View>
        <Text className="text-blue-500 bg-blue-200 mt-1 p-1 text-center rounded-full px-2 text-[12px] w-[70px]">{item.category}</Text>
        <Text className="text-[15px] font-bold mt-1">{item.title}</Text>
        <Text className="text-[17px] font-bold text-green-600">{item.price} XAF / Month</Text>
      </View>
  </TouchableOpacity>
  )
}
