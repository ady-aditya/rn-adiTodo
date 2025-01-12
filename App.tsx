/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { APP_BACKGROUND_COLOR, KEY_LOGGED_IN_USER, ORANGE_DARK, TEAL_DARK, TEAL_MEDIUM } from './src/utils/AppConstants';
import { TodoUser } from './src/types/UserTypes';
import PlainButton from './src/components/ui/PlainButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoogleSignIn from './src/components/GoogleSignIn';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import PreviousDays from './src/screens/PreviousDays';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { loadTodos } from './src/redux/todoSlice';
import { firebase } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {FIREBASEAPP_ID, FIREBASE_PROJECT_ID,GOOGLE_SIGNIN_WEBCLIENT_ID } from "@env";

const Tab = createBottomTabNavigator();

firebase.initializeApp({
  appId:FIREBASEAPP_ID,
  projectId:FIREBASE_PROJECT_ID
})

if(!firebase.app.length){
  firebase.initializeApp({
      appId:FIREBASEAPP_ID,
      projectId:FIREBASE_PROJECT_ID
  })
}

GoogleSignin.configure({
  webClientId:GOOGLE_SIGNIN_WEBCLIENT_ID
});


function App(): React.JSX.Element {

  const [loggedInUser, setLoggedinUser] = useState<TodoUser>();
  const [doneCheckingLoggin, setDoneCheckingLoggin] = useState(false);

  useEffect(()=>{

    checkUserInStorage();

    async function checkUserInStorage(){
      const user = await AsyncStorage.getItem(KEY_LOGGED_IN_USER);
      setDoneCheckingLoggin(true);
      if(user){
        setLoggedinUser(JSON.parse(user));
      }
    }
    
  },[]);

  const displayAppNavigation = doneCheckingLoggin && loggedInUser;
  
  return (
    <>
      {displayAppNavigation && 
        <AppNavigation/>
      }
      {
        !displayAppNavigation &&
        <SafeAreaView style={styles.root}>
          <Image source={require('./assests/images/aditodologo.jpeg')} style={{height:500, width:500}}/>
          {doneCheckingLoggin && !loggedInUser &&
            <GoogleSignIn setUser={setLoggedinUser} />
          }
        </SafeAreaView>
      }

    </>

    
  )
}

function AppNavigation(){
  useEffect(()=>{
    store.dispatch(loadTodos())
  },[]);
  return (
    <Provider store={store}>
        <NavigationContainer>
            <Tab.Navigator

            
              
              screenOptions={
              {
                headerShown:false,
                
              }
              
            }
            
            >
              <Tab.Screen name='Home' component={HomeScreen} 
                options={{
                  tabBarIcon : (props)=> <Icon name="home" size={15} color={props.focused ? TEAL_MEDIUM : "black"}/> ,
                  tabBarActiveTintColor : TEAL_MEDIUM
                }} 
              />
              <Tab.Screen name='Previous' component={PreviousDays}
                options={{
                  tabBarIcon : (props)=> <IconFA name="tasks" size={15} color={props.focused ? TEAL_MEDIUM : "black"}/> ,
                  tabBarActiveTintColor : TEAL_MEDIUM
                }} 
              />
            </Tab.Navigator>
          </NavigationContainer>
    </Provider>
      
  )
}

const styles = StyleSheet.create({
  root:{
    flex:1,
    backgroundColor:APP_BACKGROUND_COLOR,
    justifyContent:"center",
    alignItems:"center"
}
});

export default App;
