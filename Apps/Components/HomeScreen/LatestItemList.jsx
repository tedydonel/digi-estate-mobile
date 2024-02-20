import React from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import PostItem from '../PostItem'

export default function LatestItemList({latestItemList,heading}) {
  return (
    <View className="mt-3 mb-20">
      <Text className="font-bold text-[20px]">{heading}</Text>
      <FlatList
        data={latestItemList}
        numColumns={1}
        renderItem={({item,index})=>(
          <PostItem item={item}/>
        )}
      />
    </View>
  )
}
