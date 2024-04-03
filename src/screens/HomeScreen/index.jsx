import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {COLORS} from '../../constants/Colors';
import {useFocusEffect} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';

const Home = ({route, navigation}) => {
  const {name, email, age, profilePicture} = route?.params;

  //
  const handleBackButton = () => {
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      };
    }),
  );
  //
  const logOutHandler = async () => {
    //
    try {
      console.log('>>>>>>>>>>>>>>>>>>JET>>>OUT 🚀//');
      return navigation.navigate('SignUp');
      //
    } catch (error) {
      console.log('🚀 ~ file: Head.js:89 ~ logOutHandler ~ error', error);
    }
  };

  if (!name || !email || !age || !profilePicture) {
    return (
      <ActivityIndicator
        size="large"
        style={{flex: 1, alignContent: 'center'}}
        color={COLORS.primary}
      />
    );
  }

  //
  return (
    <View style={styles.container}>
      {profilePicture && (
        <Image
          source={{uri: profilePicture}}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            alignSelf: 'center',
          }}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: 30,
        }}>
        <View
          style={{
            flexDirection: 'column',
            gap: 20,
            marginRight: 20,
          }}>
          <Text
            style={{
              fontSize: 25,
              color: COLORS.black2,
            }}>
            Name:
          </Text>

          <Text
            style={{
              fontSize: 25,
              color: COLORS.black2,
            }}>
            Email:
          </Text>

          <Text
            style={{
              fontSize: 25,
              color: COLORS.black2,
            }}>
            Age:
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            gap: 20,
          }}>
          <Text
            style={{
              // textAlign: 'center',
              fontSize: 25,
              fontWeight: 'bold',
              color: COLORS.primary,
            }}>
            {`${name}`}
          </Text>

          <Text
            style={{
              // textAlign: 'center',
              fontSize: 25,
              fontWeight: 'bold',
              color: COLORS.primary,
            }}>
            {`${email}`}
          </Text>

          <Text
            style={{
              // textAlign: 'center',
              fontSize: 25,
              fontWeight: 'bold',
              color: COLORS.primary,
            }}>
            {`${age}`}
          </Text>
        </View>
      </View>

      {/* Button */}
      <View
        style={{
          alignSelf: 'center',
          marginVertical: 30,
        }}>
        <CustomButton
          bgColor={COLORS.red}
          text="SignOut"
          onPress={logOutHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  buttonStyles: {
    backgroundColor: COLORS.primary,
  },
  textStyles: {
    fontSize: 20,
    color: COLORS.white,
    padding: 10,
  },
});

export default Home;
