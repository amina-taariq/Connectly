import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../constant/Colors';
import fonts from '../../../utils/fonts';
import BottomSheet from '../../../components/BottomSheet';
import imagePicker from '../../../services/imagePicker';

const AVATAR_SIZE = 110;
const CAMERA_SIZE = 36;

interface RegistrationAvatarProps {
  onImageChange?: (uri: string | undefined) => void;
}

const RegistrationAvatar: React.FC<RegistrationAvatarProps> = ({
  onImageChange,
}) => {
  const [sheetVisible, setSheetVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

  const handleImageSelected = (uri: string | undefined) => {
    setImageUri(uri);
    onImageChange?.(uri);
  };

  const handlePickFromGallery = async () => {
    setSheetVisible(false);
    const picked = await imagePicker.pickImageFromGallery();
    if (picked?.uri) {
      handleImageSelected(picked.uri);
    }
  };

  const handlePickFromCamera = async () => {
    setSheetVisible(false);
    const picked = await imagePicker.captureImageFromCamera();
    if (picked?.uri) {
      handleImageSelected(picked.uri);
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={() => setSheetVisible(true)}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.avatarImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Add Photo</Text>
          </View>
        )}
        <View style={styles.cameraButton}>
          <Image
            style={styles.cameraIcon}
            source={require('../../../assets/images/camera.png')}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>

      <BottomSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        options={[
          {
            key: 'gallery',
            label: 'Gallery',
            icon: require('../../../assets/images/gallery.png'),
            onPress: handlePickFromGallery,
          },
          {
            key: 'camera',
            label: 'Camera',
            icon: require('../../../assets/images/camera.png'),
            onPress: handlePickFromCamera,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: Colors.backgroundWhite,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 2,
    borderColor: Colors.borderColor,
  },
  avatarImage: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontFamily: fonts.SansMedium,
    color: Colors.grey2,
    fontSize: 14,
  },
  cameraButton: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: CAMERA_SIZE,
    height: CAMERA_SIZE,
    borderRadius: CAMERA_SIZE / 2,
    backgroundColor: Colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  cameraIcon: {
    height: 20,
    width: 20,
  },
});

export default RegistrationAvatar;
