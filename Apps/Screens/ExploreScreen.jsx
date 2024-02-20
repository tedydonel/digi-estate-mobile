import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { app } from '../../firebaseConfig'
import LatestItemList from '../Components/HomeScreen/LatestItemList'


export default function ExploreScreen() {
  const db=getFirestore(app)
  const [propertyList,setPropertyList]=useState([]);
  
  useEffect(() => {
    getAllProperties();
  },[])


  const getAllProperties=async()=>{
    setPropertyList([]); 
    const q=query(collection(db,'UserListings'),orderBy('createdAt','asc'));

    const snapshot=await getDocs(q);

    snapshot.forEach((doc)=>{
      setPropertyList(propertyList=>[...propertyList,doc.data()]); 
    })
  }
  return (
    <ScrollView className="p-4 px-4">
      <Text className="text-[24px] font-bold">Explore More</Text>
      <LatestItemList latestItemList={propertyList} />
    </ScrollView>
  )
}
