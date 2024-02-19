import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, Linking, Share, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function ProductDetails({ navigation }) {
  const { params } = useRoute();
  const [property, setProperty] = useState([]);

  useEffect(() => {
    setProperty(params.property);
    shareButton();
  }, [params, navigation])

  const shareButton = () => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={shareProduct}>
          <Ionicons name="share-social-sharp" size={24} color="white" style={{ marginRight: 15 }} />
        </TouchableOpacity>
      ),
    });
  }

  const shareProduct = () => {
    const content = {
      message: property?.title + "\n" + property?.desc,
    }
    Share.share(content).then(resp => {
      console.log(resp);
    }, (error) => {
      console.log(error)
    })
  }

  const sendEmailMessage = () => {
    const subject = 'Regarding ' + property.title;
    const body = "Hi " + property.userName + "\n" + "I am interested in your property at " + property.address + ". Please contact me on"
    Linking.openURL('mailto:' + property.userEmail + "?" + subject + "&body=" + body);
  }

  return (
    <ScrollView className="bg-white">
      <FlatList
        horizontal
        data={property.imageUrls}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={{ width: 400, height: 320, marginRight: 10 }} />
        )}
      />
      <View className="p-3">
        <Text className="text-[24px] font-bold">{property?.title}</Text>
        <View className="items-baseline">
          <Text className="p-2 px-10 mt-2 rounded-[10px] bg-blue-200 text-blue-500">{property.category}</Text>
        </View>
        <Text className="mt-3 text-[20px] font-bold">Description</Text>
        <Text className="py-2 text-[17px] text-gray-600">{property?.desc}</Text>
      </View>
      <View className="p-3 flex flex-row items-center gap-3 bg-blue-100 border-gray-500">
        <Image source={{ uri: property.userImage }} className="w-12 h-12 rounded-full" />
        <View>
          <Text className="font-bold text-[18px]">{property.userName}</Text>
          <Text className="font-bold text-gray-500">{property.userEmail}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={sendEmailMessage} className="z-40 bg-blue-500 rounded-lg p-4 m-2">
        <Text className="text-center text-white">Send Message</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
