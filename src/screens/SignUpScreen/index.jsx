import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Image,
  Platform,
  PermissionsAndroid,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {useIsFocused} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Logo from '../../../assets/images/magghub.png';
import Avatar from '../../../assets/images/avatar.png';
import {COLORS} from '../../constants/Colors';
import PermissionModal from '../../components/PermissionModal';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const NUMBER_REGEX = /^\d+$/;

let initialErrorObj = {
  status: false,
  message: '',
};
let initialGoodObj = {
  status: false,
  message: '',
};

const SignUpScreen = () => {
  const {control, handleSubmit, watch, reset} = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploads, setImageUploads] = useState([]);
  const [error, setError] = useState(initialErrorObj);
  const [good, setGood] = useState(initialGoodObj);
  const [openAccess, setOpenAccess] = useState({
    status: false,
    message: [],
  });
  const isVisible = useIsFocused();
  const navigation = useNavigation();
  const {height} = useWindowDimensions();

  ///
  useEffect(() => {
    // console.log("called when screen open and also on close");
    // this will call on both screen open and screen close.

    // setIsLoading(true);
    if (isVisible) {
      //called when screen open or when back on screen
      // console.log("called when screen open or when back on screen ");
      reset();
      setImageUploads([]);
    }

    // () => setIsLoading(false);
  }, [isVisible]);

  const onRegisterPressed = async data => {
    setIsLoading(true);
    setError(initialErrorObj);

    // validate user
    if (
      data.name.trim() &&
      data.email.trim() &&
      data.age.trim() &&
      imageUploads.length > 0
    ) {
      navigation.navigate('Home', {
        name: data.name,
        email: data.email,
        age: data.age,
        profilePicture: imageUploads[0]?.uri,
      });
    } else {
      alert('Empty Space is not allowed');
      return;
    }
    setIsLoading(false);
  };

  const showImagePicker = async value => {
    //

    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'LuminaryExchange Camera Permission',
            message: 'LuminaryExchange needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera Permission GIVEN');
        } else {
          console.log('Camera Permission DENIED');
        }
      } catch (error) {
        console.log('Camera Permission ERROR', error);
      }
    }

    const options = {
      mediaType: 'photo',
      // includeBase64: true,
      quality: 0.5,
      selectionLimit: 1,
      maxWidth: 400,
      maxHeight: 400,
    };

    const optionsCamera = {
      mediaType: 'photo',
      // includeBase64: true,
      quality: 0.5,
      saveToPhotos: true,
      selectionLimit: 1,
      maxWidth: 400,
      maxHeight: 400,
    };

    if (value === 1) {
      setOpenAccess({status: false, message: []});
      setTimeout(() => {
        // for camera
        launchCamera(optionsCamera, response => {
          // console.log("response :->>>>", response);
          if (response.didCancel) {
            console.log('showImagePicker User cancelled Image picker :->>>>');
          } else if (response.errorMessage) {
            console.log(
              'showImagePicker ImagePicker ERROR :->>>>',
              response.errorMessage,
            );
          } else if (response.errorCode) {
            console.log(
              'showImagePicker User tapped custom button :->>>>',
              response.errorCode,
            );
          } else {
            // console.log("showImagePicker CAMERA DATA :->>>>", response.assets);
            // let urix = (response.assets + "").split("/");
            // delete urix[urix.length - 1];

            // console.log(
            //   "URIX-->",
            //   urix.join("/")
            // );
            setImageUploads(response.assets);
          }
        });
      }, 300);
    } else if (value === 2) {
      setOpenAccess({status: false, message: []});
      setTimeout(() => {
        // for Photo Library
        launchImageLibrary(options, response => {
          // console.log("response :->>>>", response);
          if (response.didCancel) {
            console.log('showImagePicker User cancelled Image picker :->>>>');
          } else if (response.errorMessage) {
            console.log(
              'showImagePicker ImagePicker ERROR :->>>>',
              response.errorMessage,
            );
          } else if (response.errorCode) {
            console.log(
              'showImagePicker User tapped custom button :->>>>',
              response.errorCode,
            );
          } else {
            // console.log("showImagePicker LIBRARY DATA :->>>>", response.assets);
            // let urix = (response.assets[0].uri + "").split("/");
            // delete urix[urix.length - 1];

            // console.log("URIX-->", urix.join("/"));
            setImageUploads(response.assets);
          }
        });
      }, 500);
    }
  };

  const permissionModal = value => {
    if (value === 'open') {
      return setOpenAccess({status: true, message: []});
    }
    setOpenAccess({status: false, message: []});
  };

  const onTermsOfUsePressed = () => {
    console.warn('Terms Accepted');
  };

  const onPrivacyPressed = () => {
    console.warn('Policy Accepted');
  };
  const closeSuccessModal = () => {
    setGood(initialGoodObj);
  };

  const closeFailureModal = () => {
    setError(initialErrorObj);
  };

  //
  return (
    <View style={styles.root}>
      <PermissionModal
        showImagePicker={showImagePicker}
        isModalVisible={openAccess.status}
        closeModal={permissionModal}
        message={openAccess.message}
      />
      <Image
        source={Logo}
        style={[styles.logo, {height: height * 0.1}]}
        resizeMode="contain"
      />

      <View style={{height: 10}} />

      <CustomInput
        name="name"
        control={control}
        placeholder="Name"
        rules={{
          required: 'Name is required',
        }}
      />
      <CustomInput
        name="email"
        control={control}
        placeholder="Email"
        rules={{
          required: 'Email is required',
          pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
        }}
      />
      <CustomInput
        name="age"
        control={control}
        placeholder="Age"
        rules={{
          required: 'Age is required',
          pattern: {value: NUMBER_REGEX, message: 'Age is number only'},
        }}
      />
      <View style={{height: 10}} />

      <Pressable
        onPress={() => permissionModal('open')}
        style={{
          borderRadius: 100,
          height: 100,
          width: 100,
        }}>
        {imageUploads.length > 0 ? (
          <Image
            source={{uri: imageUploads[0]?.uri}}
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,
            }}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={Avatar}
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,
            }}
            resizeMode="cover"
          />
        )}
      </Pressable>

      <View style={{height: 20}} />
      <CustomButton
        disable={imageUploads.length <= 0}
        text="Submit"
        onPress={handleSubmit(onRegisterPressed)}
      />

      <View style={{height: 20}} />

      <Text style={styles.text}>
        By registering, you confirm that you accept our{' '}
        <Text style={styles.link} onPress={onTermsOfUsePressed}>
          Terms of Use
        </Text>{' '}
        and{' '}
        <Text style={styles.link} onPress={onPrivacyPressed}>
          Privacy Policy
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 50,
    paddingHorizontal: 50,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    marginTop: 50,
    marginBottom: 50,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: COLORS.purples,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignUpScreen;
