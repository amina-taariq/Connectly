import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet, Modal, Pressable} from 'react-native';
import { Colors } from '../../../constant/Colors';
import fonts from '../../../utils/fonts';

const AVATAR_SIZE = 110;
const CAMERA_SIZE = 36;

const RegistrationAvatar: React.FC = () => {
  const [sheetVisible, setSheetVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

  return (
    <View style={styles.wrapper}>
      <View style={styles.avatarContainer}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.avatarImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Add Photo</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() => setSheetVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.cameraIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={sheetVisible}
        onRequestClose={() => setSheetVisible(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setSheetVisible(false)} />
        <View style={styles.sheet}>
          <View style={styles.sheetHandle} />
          <TouchableOpacity style={styles.sheetItem} onPress={() => { setSheetVisible(false); }}>
            <Text style={styles.sheetIcon}>🗂️</Text>
            <Text style={styles.sheetText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sheetItem} onPress={() => { setSheetVisible(false); }}>
            <Text style={styles.sheetIcon}>📸</Text>
            <Text style={styles.sheetText}>Camera</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    fontSize: 18,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 20,
    paddingTop: 12,
  },
  sheetHandle: {
    width: 44,
    height: 4,
    backgroundColor: Colors.borderColor,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },
  sheetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  sheetIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  sheetText: {
    fontFamily: fonts.SansBold,
    color: Colors.black,
    fontSize: 16,
  },
  sheetCancel: {
    marginTop: 6,
    alignSelf: 'center',
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sheetCancelText: {
    fontFamily: fonts.SansBold,
    color: Colors.black,
    fontSize: 14,
  },
});

export default RegistrationAvatar;


