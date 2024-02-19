import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ToastAndroid, ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { app } from '../../firebaseConfig.jsx';
import { getFirestore, getDocs, collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '@clerk/clerk-expo';

export default function PostScreen() {
  const [image, setImage] = useState(null);
  const db = getFirestore(app);
  const storage = getStorage();
  const [loading,setLoading]=useState(false);

  const {user}=useUser();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, 'Category'));

    querySnapshot.forEach((doc) => {
      console.log('Docs:', doc.data());
      setCategoryList((prevList) => [...prevList, doc.data()]);
    });
  };

  /**
   * Used to Pick Image from device
   */

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod=async(value)=>{
    setLoading(true)
    const resp=await fetch(image);
    const blob=await resp.blob();
    const storageRef = ref(storage, 'listingPost/'+Date.now()+".jpg");

    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    }).then((resp)=>{
      getDownloadURL(storageRef).then(async(downloadUrl)=>{
        console.log(downloadUrl);
        value.image=downloadUrl;
        value.userName=user.fullName;
        value.userEmail=user.primaryEmailAddress.emailAddress;
        value.userImage=user.imageUrl;

        const docRef = await addDoc(collection(db, "UserListings"), value);
        if(docRef.id)
        {
          setLoading(false);
          Alert.alert('Success!','Post Added Successfully.')
        }
      })
    });

  }
  return (
    <KeyboardAvoidingView>
    <ScrollView className="p-10">
      <Text className="text-[20px] font-bold">Add New Listing</Text>
      <Text className="text-[20px] text-gray-500 mb-6">Create and Specify listing details</Text>

      <Formik
        initialValues={{title: '', desc: '', category: '', address: '', tel: '',
          price: '',
          image: '',
          userName: '',
          userEmail: '',
          userImage: '',
          createdAt:Date.now()}}
        onSubmit={(value) =>onSubmitMethod(value)}
        validate={(values)=>{
          const errors={}
          if (!values.title)
          {
            console.log('Title not Present')
            ToastAndroid.show("Please enter a Title",ToastAndroid.SHORT)
            errors.name="Title is Required"
          }
          return errors
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors}) => (
          <View>
            
            <TouchableOpacity onPress={pickImage}>
            {image?
            <Image source={{uri:image}} style={{width:100, height:100, borderRadius:15}}/> 
            :
            
            <Image source={require('./../../assets/images/login.png')}
                style={{width:100, height:100, borderRadius:15}}
            />}

            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Title"
              onChangeText={handleChange('title')}
              value={values.title}
            />
            <TextInput
              style={styles.input}
              placeholder='Description'
              onChangeText={handleChange('desc')}
              numberOfLines={5}
              value={values?.desc}
            />

            <TextInput
              style={styles.input}
              placeholder='Address'
              onChangeText={handleChange('address')}
              value={values?.address}
            />
            <TextInput
              style={styles.input}
              placeholder='Tel'
              onChangeText={handleChange('tel')}
              value={values?.tel}
            />
            <TextInput
              style={styles.input}
              placeholder='Price'
              onChangeText={handleChange('price')}
              keyboardType='number-pad'
              value={values?.price}
            />

            {/* Other TextInput components */}
            <View style={{borderWidth:1,borderRadius:10,marginTop:12}}>
            <Picker
              selectedValue={values.category}
              className="border-2"
              onValueChange={itemValue=>setFieldValue('category', itemValue)}
            >
              {categoryList.length>0&&categoryList.map((item, index) => (
                <Picker.Item key={index} label={item.name} value={item.name} />
              ))}
            </Picker>
            </View>
            <TouchableOpacity onPress={handleSubmit} 
            style={{
              backgroundColor:loading?'#ccc':'#007BFF',
            }}
            disabled={loading}
            className="p-4 bg-blue-500 rounded-[10px] mt-10">
              {loading?
              <ActivityIndicator color='#fff'/>
              :
              <Text className="text-white text-center text-[16px]">Submit</Text>
              }
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 17,
    fontSize: 17
  }
});

