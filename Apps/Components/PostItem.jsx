import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function PostItem({ item }) {
  const navigation = useNavigation();

  // Check if item.imageUrls is not empty and contains at least one URL
  const firstImageUrl = item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : null;

  return (
    <TouchableOpacity className="flex-1 m-1 p-1 rounded-lg border-[1px] border-slate-200 bg-blue-[40]"
      onPress={() => navigation.push('property-details', { property: item })}
    >
      {/* Use the firstImageUrl as the source for the Image component */}
      {firstImageUrl && <Image source={{ uri: firstImageUrl }} className="w-full h-[250px] rounded-lg" />}

      <View className=" flex flex-row text-blue-500 bg-blue-200 mt-1 p-1 text-center rounded-lg px-1 w-full">
         <Text className="text-[15px] pl-1 font-bold">{item.category}</Text>
         <Image source={require('./../../assets/images/location.png')} style={{ width: 16, height: 16 }} />
         <Text className="text-[13px] text-center">{item.address}</Text>
      </View>

      <View className="flex flex-row items-center justify-between justify-center">

        <View className="flex flex-row  items-center ml-1 mt-1  text-[12px] w-[35px]">
          <Image source={require('./../../assets/images/home.png')} style={{ width: 16, height: 16 }} />
          <Text className="ml-1">{item.parlor}</Text>
        </View>


        <View className="flex flex-row  items-center ml-1 mt-1  text-[12px] w-[35px]">
          <Image source={require('./../../assets/images/cutlery.png')} style={{ width: 16, height: 16 }} />
          <Text className="ml-1">{item.kitchen}</Text>
        </View>


        <View className="flex flex-row  items-center ml-1 mt-1 text-[12px] w-[35px]">
          <Image source={require('./../../assets/images/bathtub.png')} style={{ width: 16, height: 16 }} />
          <Text className="ml-1">{item.bathroom}</Text>
        </View>


        <View className="flex flex-row  items-center ml-1 mt-1  text-[12px] w-[35px]">
          <Image source={require('./../../assets/images/sleep.png')} style={{ width: 16, height: 16 }} />
          <Text className="ml-1">{item.bedroom}</Text>
        </View>


      </View>
      <View>
        <Text className="text-[15px] font-bold mt-1">{item.title}</Text>
        <Text className="text-[13px] font-bold text-green-600">{item.price}</Text>
      </View>
    </TouchableOpacity>
  )
}
