import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'

export default function Categories({categoryList}) {

  const navigation=useNavigation();
  return (
    <View className="mt-3">
        <Text className="font-bold text-[18px]">Categories</Text>
        <FlatList
          data={categoryList}
          numColumns={2}
          renderItem={({item,index})=>(
            <TouchableOpacity 
            onPress={()=>navigation.navigate('item-list',{
              category:item.name
            })}
            className="flex-1 items-center justify-center p-2 border-[1px] border-gray-300 m-1 h-[90px] rounded-lg bg-blue-100">
              <Image source={{uri:item.icon}}
                className="w-[45px] h-[45]" 
              />
              <Text className="text-[12px] mt-1">{item.name}</Text>
            </TouchableOpacity>
          )}
        />
    </View>
  )
}
