import React, {useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import {COLORS} from '../constants/Colors';

const {Navigator, Screen} = createNativeStackNavigator();

const Navigation = () => {
  const [user, setUser] = useState(false);

  if (user === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={COLORS.primary} />
      </View>
    );
  }

  //
  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false}}>
        <Screen name="SignUp" component={SignUpScreen} />
        <Screen name="Home" component={HomeScreen} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
