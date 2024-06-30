import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import {createUser} from '../../lib/appwrite'


const SignUp = () => {

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })

    const submit = async () => {
        console.log('Submit event started')
        if (!form.username || !form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all fields');
            
            // Set to global state using react context

        }
        setIsSubmitting(true);
        try {
            const result = await createUser(form.email, form.password, form.username);
            console.log('result\n\n',result,'\n\n')
            router.replace('/home')
        } catch (error) {
            Alert.alert('Error', error.message); 
        } finally {
            setIsSubmitting(false);
        }
    }

    const [isSubmitting, setIsSubmitting] = useState(false)
  return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView>
            <View className="w-full justify-center min-h-[90vh] my-6 px-4"> 
                {/* // items-center */}
                <Image 
                    source={images.logo}
                    className='w-[130px] h-[84px]'
                    resizeMode='contain'
                />
                <Text
                    className='text-2xl text-white text-semibold font-psemibold mt-10'
                >
                    Create your Aura Account
                </Text>
                <FormField 
                    title = 'Username'
                    value = {form.username}
                    handleChangeText={(e) => setForm({...form, username: e})}
                    otherStyles='mt-10'
                    placeholder={'Username'}
                />

                <FormField 
                    title = 'Email'
                    value = {form.email}
                    handleChangeText={(e) => setForm({...form, email: e})}
                    otherStyles='mt-7'
                    placeholder={'Email'}
                    keyboardType='email-address'
                />
                <FormField 
                    title = 'Password'
                    value = {form.password}
                    handleChangeText={(e) => setForm({...form, password: e})}
                    otherStyles='mt-7'
                    placeholder={'Password'}
                    keyboardType='password'
                />
                <CustomButton 
                    title='Sign Up'
                    handlePress = {submit}
                    containerStyles = 'w-full mt-12'
                    isLoading={isSubmitting}
                />
                <View className='justify-center pt-5 flex-row gap-2'>
                    <Text className='text-lg text-gray-100 font-pregular'>
                        Already have an account?
                    </Text>
                    <Link href='/sign-in' className='text-lg text-secondary font-psemibold'>
                        Sign in
                    </Link>

                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp