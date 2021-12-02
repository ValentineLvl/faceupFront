import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

import React from 'react';
//import { StyleSheet , Text, View } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import SnapScreen from './screens/SnapScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import pseudo from './reducers/pseudo';
import photoList from './reducers/photo';

const store = createStore(combineReducers({photoList, pseudo}));

const Stack = createStackNavigator();
 const Tab = createBottomTabNavigator();


 function BottomNavigator() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
    
      tabBarIcon: ({ color }) => {
        let iconName;
        if (route.name === 'Snap') {
          iconName = 'camera';
        } else if (route.name === 'Gallery') {
          iconName = 'images-outline';
        }
        return <Ionicons name={iconName} size={25} color={color} />;
      },
      tabBarActiveTintColor: "#009788",
    tabBarInactiveTintColor: "#FFFFFF",
    tabBarStyle: {backgroundColor:"#111224"},
    headerShown: false
    }
    
    )}
    >
       <Tab.Screen name="Snap" component={SnapScreen} />
      <Tab.Screen name="Gallery" component={GalleryScreen} />
    </Tab.Navigator>
  );
  }

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer >
       <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      </Stack.Navigator>
  </NavigationContainer>
  </Provider>
  );
}

