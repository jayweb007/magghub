import React from 'react';
import {COLORS, SIZES} from '../constants/Colors';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

// import Icon from 'react-native-vector-icons/EvilIcons';
import Modal from 'react-native-modal';

const PermissionModal = ({
  isModalVisible,
  closeModal,
  message,
  showImagePicker,
}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      coverScreen={true}
      // hasBackdrop={false}
      backdropColor={COLORS.darkBlue}
      backdropOpacity={0.7}
      propagateSwipe
      // onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      style={{margin: 0}}>
      <View
        style={{
          //    flex: 1,
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.padding / 2.2,
          //  opacity: 0.5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: SIZES.radius,
            width: '70%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: SIZES.padding,
          }}>
          <CustomButton
            text={'Take Photo...'}
            bgColor={COLORS.darkBlue}
            active
            style={{height: 45, width: '100%', marginVertical: 10}}
            onPress={() => showImagePicker(1)}
          />
          <CustomButton
            text={'Choose Photo from Library...'}
            bgColor={COLORS.darkBlue}
            active
            style={{height: 45, width: '100%', marginVertical: 10}}
            onPress={() => showImagePicker(2)}
          />
          <CustomButton
            text={'Cancel'}
            bgColor={COLORS.darkBlue}
            active
            style={{height: 45, width: '100%', marginVertical: 10}}
            onPress={closeModal}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PermissionModal;

const CustomButton = ({
  loading,
  text,
  bgColor,
  active,
  onPress,
  style,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      // loading={loading}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: active ? bgColor : COLORS.gray2,
        paddingVertical: SIZES.padding / 6,
        paddingHorizontal: SIZES.padding / 1.5,
        borderRadius: SIZES.radius / 2,
        ...style,
      }}>
      {loading ? (
        <ActivityIndicator color={'white'} />
      ) : (
        <Text
          style={{
            // ...FONTS.body4,
            fontSize: SIZES.body4,
            fontWeight: active ? '600' : '700',
            color: active ? COLORS.white : COLORS.gray,
          }}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};
