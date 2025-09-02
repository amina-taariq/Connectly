import React from 'react';
import {Modal, View, StyleSheet, Pressable, TouchableOpacity, Image, Text} from 'react-native';
import { Colors } from '../constant/Colors';
import fonts from '../utils/fonts';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  options?: Array<{
    key: string;
    label: string;
    icon?: any;
    onPress: () => void;
  }>;
  children?: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ visible, onClose, options, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.sheetHandle} />
        <View style={styles.content}>
          {options && options.length > 0 ? (
            options.map(opt => (
              <TouchableOpacity
                key={opt.key}
                style={styles.optionItem}
                onPress={() => {
                  onClose();
                  setTimeout(() => opt.onPress(), 0);
                }}
                activeOpacity={0.8}
              >
                {opt.icon ? (
                  <Image source={opt.icon} style={styles.optionIcon} resizeMode="contain" />
                ) : null}
                <Text style={styles.optionLabel}>{opt.label}</Text>
              </TouchableOpacity>
            ))
          ) : (
            children
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    elevation: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
  },
  sheetHandle: {
    width: 44,
    height: 4,
    backgroundColor: Colors.borderColor,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  optionIcon: {
    height: 22,
    width: 22,
    marginRight: 10,
  },
  optionLabel: {
    fontFamily: fonts.SansBold,
    fontSize: 16,
    color: Colors.black,
  },
});

export default BottomSheet;


