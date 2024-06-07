import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import images from "../../constants/images";
import { Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link } from "expo-router";
import { signIn } from "../../lib/appwrite";
import { Alert } from "react-native";
import { router } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setisSubmitting] = useState(false);

  const submitForm = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
    }

    setisSubmitting(true);

    try {
      await signIn(form.email, form.password);

      // set to global state ...

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error");
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <View className="w-full justify-center  px-4 my-6">
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
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />

            <CustomButton
              handlePress={submitForm}
              title="Sign In"
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-white text-sm  font-pregular">
                {" "}
                Dont have an account?
              </Text>
              <Link
                className="text-lg text-secondary text-sm  font-psemibold"
                href="/sign-up"
              >
                {" "}
                Sign Up
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default SignIn;
