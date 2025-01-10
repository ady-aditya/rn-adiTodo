import { GoogleSignin } from "@react-native-google-signin/google-signin";
import PlainButton from "./ui/PlainButton";
import auth, { firebase } from '@react-native-firebase/auth';
import { TodoUser } from "../types/UserTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEY_LOGGED_IN_USER } from "../utils/AppConstants";
import { Alert } from "react-native";
import { Dispatch, SetStateAction } from "react";
import { saveDummyTodoStartingYesterDay } from "../dataService/TodoData";

type GoogleSignInProps={
    setUser: Dispatch<SetStateAction<TodoUser | undefined>>
}


export default function GoogleSignIn({setUser}:GoogleSignInProps){

    async function googleSignin() {
        try{
            const { data } = await GoogleSignin.signIn();
            console.log(data)
            console.log(data?.user);
            const idToken = data?.idToken;
            if (!idToken) {
                throw new Error('No ID token found');
            }
            
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
            
            
            if(data?.idToken){
                const userName = auth().currentUser?.displayName;
                const email = auth().currentUser?.email;
                if(userName && email){
                    const todoUser : TodoUser = {
                        name:userName,
                        email:email
                    }
                    AsyncStorage.setItem(KEY_LOGGED_IN_USER, JSON.stringify(todoUser));
                    saveDummyTodoStartingYesterDay();
                    setUser(todoUser);
                }else{
                    Alert.alert("Something went wrong.","Please try again")
                }    
            }
            
        }catch(error){
            console.error(error);
            Alert.alert("Something went wrong.","Please try again")
        }
    }

    return(
        <PlainButton text='Google signin' onPress={googleSignin} />
    )
}