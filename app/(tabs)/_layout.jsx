import { View, Text, Image } from 'react-native';
import { Tabs, Redirect } from 'expo-router';
import { icons } from '../../constants';

const TabIcon = ({icon, color, name, focused}) => {
    return (
        <View className='items-center justify-center gap-2'>
            <Image 
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className = 'w-6 h-6' 
            />
            <Text 
                className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs'}`} 
                style={{ color: color }}
            >
                {name}
            </Text>
        </View>
    )
}


// Adds bottom bar that allows switching between different pages through the application
const TabsLayout = () => {
  return (
    <>
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#FFA001',
                tabBarInactiveTintColor: '#CDCDEO',
                tabBarStyle: {
                    backgroundColor: '#161616',
                    borderTopWidth: 1,
                    borderTopColor: '#232533',
                    height: 65,
                }
            }}
        >
            <Tabs.Screen 
                name="home" 
                options={{ 
                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon 
                            icon={icons.home} 
                            color={color} 
                            focused={focused} 
                            name = 'Home'
                        />
                    )
                }} 
            />
            <Tabs.Screen 
                name="bookmark" 
                options={{ 
                    headerShown: false,
                    title: 'Bookmark',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon 
                            icon={icons.bookmark} 
                            color={color} 
                            focused={focused} 
                            name = 'Bookmark'
                        />
                    )
                }} 
            />
            <Tabs.Screen 
                name="create" 
                options={{ 
                    headerShown: false,
                    title: 'Create',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon 
                            icon={icons.plus} 
                            color={color} 
                            focused={focused} 
                            name = 'Create'
                        />
                    )
                }} 
            />
            <Tabs.Screen 
                name="profile" 
                options={{ 
                    headerShown: false,
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon 
                            icon={icons.profile} 
                            color={color} 
                            focused={focused} 
                            name = 'Profile'
                        />
                    )
                }} 
            />
        </Tabs>
    </>
  )
}

export default TabsLayout