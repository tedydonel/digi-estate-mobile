import React from 'react'
import { Text, Image, View, TouchableOpacity } from 'react-native'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
 
WebBrowser.maybeCompleteAuthSession(); 
export default function LoginScreen() {

    useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
 
    return (
      <View className="bg-white">
        <Image source={require('./../../assets/images/login.png')}
            className="w-full h-[400px] object-cover"

        />
        <View className="p-8 bg-white mt-[-20px] rounded-t-3xl shadow-md">
            <Text className="text-[33px] font-bold">Digi Estate</Text>
            <Text className="text-[18px] text-slate-500 mt-6">Buy, Rent and sell Real Estate properties</Text>
            <TouchableOpacity onPress={onPress} className="p-3 bg-blue-500 rounded-[10px] mt-20">
                <Text className="text-white text-center text-[17px]">Get Started</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
}
