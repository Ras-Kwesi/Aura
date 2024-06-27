import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';


const SignIn = () => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const submit = () => {
        console.log(form)
    }

    const [isSubmitting, setIsSubmitting] = useState(false)
  return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView>
            <View className="w-full justify-center min-h-[98vh] my-6 px-4"> 
                {/* // items-center */}
                <Image 
                    source={images.logo}
                    className='w-[130px] h-[84px]'
                    resizeMode='contain'
                />
                <Text
                    className='text-2xl text-white text-semibold font-psemibold mt-10'
                >
                    Log in to Aura!
                </Text>

                <FormField 
                    title = 'Email'
                    value = {form.email}
                    handleChangeText={(e) => setForm({...form, email: e})}
                    otherStyles='mt-7'
                    placeholder={'Enter your email'}
                    keyboardType='email-address'
                />
                <FormField 
                    title = 'Password'
                    value = {form.password}
                    handleChangeText={(e) => setForm({...form, password: e})}
                    otherStyles='mt-7'
                    placeholder={'Enter your password'}
                    keyboardType='password'
                />
                <CustomButton 
                    title='Sign in'
                    handlePress = {submit}
                    containerStyles = 'w-full mt-12'
                    isLoading={isSubmitting}
                />

                <View className='justify-center pt-5 flex-row gap-2'>
                    <Text className='text-lg text-gray-100 font-pregular'>
                        Don't have an account?
                    </Text>
                    <Link href='/sign-up' className='text-lg text-secondary font-psemibold'>
                        Sign up!
                    </Link>

                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn