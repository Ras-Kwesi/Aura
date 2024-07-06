import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.kwesi.aura',
    projectId: '6681203900259194ae78',
    databaseId: '668122200011ab02325f',
    userCollectionId: '6681225a0026eb9a71b2',
    videoCollectionId: '6681229e003c6f09e0d9',
    storage: '66812430002688c6e7cb',
}

const {
    endpoint, 
    platform, 
    projectId, 
    databaseId, 
    userCollectionId, 
    videoCollectionId, 
    storage, 
} = appwriteConfig;

// Init your React Native SDK
const client = new Client();
const avatars = new Avatars(client);
const databases = new Databases(client);

client
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(projectId) // Your project ID
    .setPlatform(platform) // Your application ID or bundle ID.
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
            databaseId,
            userCollectionId,
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


export const signIn = async (email, password) => {    // signIn function that handles creating a user session into application 
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        throw new Error(error);        
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error ;

        const currentUser = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal('acountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0]
    } catch (error) {
        throw new Error(error);
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
        )

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    } 
    
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt',Query.limit(7))]
        );

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    } 
    
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title', query)]
        );

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    } 
    
}