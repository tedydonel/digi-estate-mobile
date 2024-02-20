import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, FlatList } from 'react-native';
import { app } from '../../firebaseConfig.jsx';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '@clerk/clerk-expo';

export default function PostScreen() {
  const [images, setImages] = useState([]);
  const db = getFirestore(app);
  const storage = getStorage();
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
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

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 1,
      multiple: true, // Enable multiple selection
    });

    if (!result.cancelled) {
      const newImages = result.assets.map(asset => asset.uri);
      setImages([...images, ...newImages]);
    }
  };

  const onSubmitMethod = async (values) => {
    setLoading(true);
    const uploadTasks = images.map(async (imageUri) => {
      const resp = await fetch(imageUri);
      const blob = await resp.blob();
      const storageRef = ref(storage, 'listingPost/' + Date.now() + ".jpg");

      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);
      return downloadUrl;
    });

    try {
      const imageUrls = await Promise.all(uploadTasks);
      values.imageUrls = imageUrls;
      values.userName = user.fullName;
      values.userEmail = user.primaryEmailAddress.emailAddress;
      values.userImage = user.imageUrl;

      const docRef = await addDoc(collection(db, "UserListings"), values);
      if (docRef.id) {
        setLoading(false);
        Alert.alert('Success!', 'Post Added Successfully.');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      setLoading(false);
      Alert.alert('Error', 'Failed to upload images');
    }
  };

  const clearData = () => {
    setImages([]) // Clear image data

  };

  return (
    <KeyboardAvoidingView>
      <ScrollView className="p-10">
        <Text className="text-[20px] font-bold">Add New Listing</Text>
        <Text className="text-[20px] text-gray-500 mb-6">Create and Specify listing details</Text>

        <Formik
          initialValues={{
            title: '', desc: '', category: '', address: '', tel: '',
            price: '',
            parlor: '',
            kitchen: '',
            bathroom: '',
            bedroom: '',
            imageUrls: '',
            userName: '',
            userEmail: '',
            userImage: '',
            createdAt: Date.now()
          }}
          onSubmit={(values) => onSubmitMethod(values)}
          validate={(values) => {
            const errors = {}
            if (!values.title) {
              errors.title = "Title is Required";
            }
            return errors;
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors }) => (
            <ScrollView>

              <View className="flex flex-row justify-between my-4">
                <TouchableOpacity onPress={pickImages}>
              <Image source={require('./../../assets/images/image.png')}
                style={{width:70, height:70, borderRadius:15}}/>
              </TouchableOpacity> 

              <TouchableOpacity onPress={clearData} style={{ backgroundColor: '#FF6347',
                }} className="text-red-600 p-4 rounded-[10px] mt-5 ">
                  <Text className="text-white text-center text-[16px]">clear Data</Text>
              </TouchableOpacity>
              </View>

              

              <FlatList
                horizontal
                data={images}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Image source={{ uri: item }} style={styles.image} />
                )}
              />

              {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Title"
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                onChangeText={handleChange('desc')}
                onBlur={handleBlur('desc')}
                numberOfLines={4}
                value={values.desc}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
              />
              <TextInput
                style={styles.input}
                placeholder="Tel"
                onChangeText={handleChange('tel')}
                onBlur={handleBlur('tel')}
                value={values.tel}
              />
              <TextInput
                style={styles.input}
                placeholder="Price in XAF"
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
                keyboardType='number-pad'
                value={values.price}
              />
              <TextInput
                style={styles.input}
                placeholder="Parlor"
                onChangeText={handleChange('parlor')}
                onBlur={handleBlur('parlor')}
                keyboardType='number-pad'
                value={values.parlor}
              />
              <TextInput
                style={styles.input}
                placeholder="Kitchen"
                onChangeText={handleChange('kitchen')}
                onBlur={handleBlur('kitchen')}
                keyboardType='number-pad'
                value={values.kitchen}
              />
              <TextInput
                style={styles.input}
                placeholder="Bathroom"
                onChangeText={handleChange('bathroom')}
                onBlur={handleBlur('bathroom')}
                keyboardType='number-pad'
                value={values.bathroom}
              />
              <TextInput
                style={styles.input}
                placeholder="Bedroom"
                onChangeText={handleChange('bedroom')}
                onBlur={handleBlur('bedroom')}
                keyboardType='number-pad'
                value={values.bedroom}
              />

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={values.category}
                  onValueChange={itemValue =>setFieldValue('category', itemValue)
                  }>
                  <Picker.Item label="Select Category" value="" />
                  {categoryList.length>0&&categoryList.map((item, index) => (
                    <Picker.Item key={index} label={item.name} value={item.name} />
                  ))}
                </Picker>
              </View>

              <TouchableOpacity onPress={handleSubmit}
                style={{
                  backgroundColor: loading ? '#ccc' : '#067BFF',
                }}
                disabled={loading}
                className="p-4 rounded-[10px] mt-5 mb-20 ">
                {loading ?
                  <ActivityIndicator color='#fff' />
                  :
                  <Text className="text-white text-center text-[16px]">Create Listing</Text>
                }
              </TouchableOpacity>            

            </ScrollView>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 17,
    textAlignVertical: 'top',
    fontSize: 17,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 0,
  },
});
