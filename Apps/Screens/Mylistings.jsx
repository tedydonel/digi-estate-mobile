import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { app } from '../../firebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import LatestItemList from '../Components/HomeScreen/LatestItemList'
import { useNavigation } from '@react-navigation/native'

export default function Mylistings() {
  const {user}=useUser();
  const [propertyList,setPropertyList]=useState();
  const navigation=useNavigation();
  useEffect(()=>{
    user&&getUserPost();
  },[user])
  
  useEffect(()=>{
    navigation.addListener('focus',(e)=>{
      console.log(e);
      getUserPost();
    })
  },[navigation])

  const db=getFirestore(app)
  const getUserPost=async()=>{
    setPropertyList([]);
    const q=query(collection(db,'UserListings'),where('userEmail','==',user?.primaryEmailAddress.emailAddress));
    const snapshot=await getDocs(q);
    snapshot.forEach(doc=>{
        setPropertyList(propertyList=>[...propertyList,doc.data()]);
    })
  }
  return (
    <View>
      <LatestItemList latestItemList={propertyList} 
        
      />
    </View>
  )
}
