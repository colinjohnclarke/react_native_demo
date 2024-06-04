import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import images from "../../constants/images";
import { Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FormField from "../components/FormField";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <View className="w-full justify-center h-full full px-4 my-6">
            <Image
              resizeMode="contain"
              source={images.logo}
              className="w-[115px] h-[35px]"
            />
            <Text className="text-2xl mt-10 text-white"> Log in to Aora</Text>

            <FormField
              placeholder="email"
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            <FormField
              placeholder="password"
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default SignIn;
