import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.kwesi.aura',
    projectId: '6681203900259194ae78',
    databaseId: '668122200011ab02325f',
    userCollectionId: '6681225a0026eb9a71b2',
    videoCollectionId: '6681229e003c6f09e0d9',
    storage: '66812430002688c6e7cb',
}

// Init your React Native SDK
const client = new Client();
const avatars = new Avatars(client);
const databases = new Databases(client);

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
    ;

const account = new Account(client);

export const createUser = async (email, password, username) => {
    // Register User
    try {
        const newAccount = await account.create(  // Creates new user
            ID.unique(),
            email,
            password,
            username

        )
        console.log('New User Created')

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password)

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                acountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )
        console.log('ABout to return new user')
        return newUser;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
    
};


export async function signIn(email, password, username){    // signIn function that handles creating a user session into application 
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        throw new Error(error);        
    }
}

