import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, Image, Linking, Share, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import { useUser } from '@clerk/clerk-expo';
import { collection, deleteDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';

export default function ProductDetails({ navigation }) {
  const { params } = useRoute();
  const {user}=useUser();
  const db = getFirestore(app);
  const nav=useNavigation();
  const [property, setProperty] = useState({
    imageUrls: [], // Provide a default empty array for imageUrls
  });

  useEffect(() => {
    if (params && params.property) {
      setProperty(params.property);
      shareButton();
    }
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

  const handleCall = () => {
    const phoneNumber = property.tel // Replace with the phone number you want to dial
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const sendEmailMessage = () => {
    const subject = 'Regarding ' + property.title;
    const body = "Hi " + property.userName + "\n" + "I am interested in your property at " + property.address + ". Please contact me on"
    Linking.openURL('mailto:' + property.userEmail + "?" + subject + "&body=" + body);
  }

  const deleteUserPost=()=>{
      Alert.alert('Delete Listing?', 'Do you want to Delete Listing?',[
        {
        text:'Yes',
        onPress:()=>deleteFromFirestore()
      },
      {
        text:'Cancel',
        onPress:()=> console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ])
  }
  const deleteFromFirestore=async()=>{
      const q=query(collection(db,"UserListings"),where("title","==",property.title));
      const snapshot=await getDocs(q);
      snapshot.forEach(doc=>{
        deleteDoc(doc.ref).then(resp=>{
          console.log('Deleted the Doc');
          nav.goBack();
        });
      })
  }
  return (
    <ScrollView className="bg-white">
      <Swiper style={{ height: 320 }}>
        {property.imageUrls.map((imageUrl, index) => (
          <View key={index}>
            <Image source={{ uri: imageUrl }} style={{ width: 400, height: 320 }} />
          </View>
        ))}
      </Swiper>
      <View className="p-3">
        <Text className="text-[24px] font-bold">{property?.title}</Text>
        
        <View className=" flex flex-row text-blue-500 bg-blue-200 mt-3 p-2 text-center rounded-lg px-1 w-full">
         <Text className="text-[18px] pl-1 font-bold">{property.category}</Text>
         <Image source={require('./../../assets/images/location.png')} style={{ width: 24, height: 24 }} />
         <Text className="text-[19px] text-center">{property.address}</Text>
      </View>

      <View className="flex flex-row p-2 items-center justify-between justify-center">

        <View className="flex flex-row mr-5 items-center ml-1 mt-1  text-[12px] w-[35px]">
          <Image source={require('./../../assets/images/home.png')} style={{ width: 24, height: 24 }} />
          <Text className="ml-1">{property.parlor}</Text>
        </View>


        <View className="flex flex-row mr-5 items-center ml-1 mt-1 text-[12px] w-[35px]">
          <Image source={require('./../../assets/images/cutlery.png')} style={{ width: 24, height: 24 }} />
          <Text className="ml-1">{property.kitchen}</Text>
        </View>


        <View className="flex flex-row mr-5 items-center ml-1 mt-1 text-[12px] w-[35px]">
          <Image source={require('./../../assets/images/bathtub.png')} style={{ width: 24, height: 24 }} />
          <Text className="ml-1">{property.bathroom}</Text>
        </View>


        <View className="flex flex-row mr-5 items-center ml-1 mt-1  text-[12px] w-[35px]">
          <Image source={require('./../../assets/images/sleep.png')} style={{ width: 24, height: 24 }} />
          <Text className="ml-1">{property.bedroom}</Text>
        </View>


      </View>
      <View>
        <Text className="p-2 text-[18px] text-center font-bold text-green-600">{property.price} XAF</Text>
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
      {user?.primaryEmailAddress.emailAddress==property.userEmail?
        <TouchableOpacity onPress={()=>deleteUserPost()} 
        className="z-40 bg-red-500 rounded-lg p-4 m-2">
        <Text className="text-center text-white">Delete Post</Text>
      </TouchableOpacity>
      :
      <View>
        <TouchableOpacity onPress={sendEmailMessage} className="z-40 bg-blue-500 rounded-lg p-4 m-2">
          <Text className="text-center text-white">Send Message</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCall} className="z-40 bg-green-500 rounded-lg p-4 m-2">
          <Text className="text-center text-white">Call</Text>
        </TouchableOpacity>
      </View>
      }
      

    </ScrollView>
  )
}
