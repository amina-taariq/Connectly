import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import fonts from '../../../utils/fonts';
import { Colors } from '../../../constant/Colors';
import { useNavigation } from '@react-navigation/native';

const LoginFooter: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <View>
      <Image
        source={require('../../../assets/images/orImage.png')}
        style={styles.orImage}
        resizeMode="contain"
      />
      <Text style={styles.dontAccount}>Don't have an Account?</Text>
      <TouchableOpacity 
        style={styles.registerButton} 
        onPress={() => navigation.navigate('Registration')}
      >
        <Text style={styles.registerText}>Register With Email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  orImage: {
    width: '100%',
    height: 20,
    resizeMode: 'contain',
    marginTop: 20,
  },
  dontAccount: {
    fontFamily: fonts.SansMedium,
    color: Colors.grey2,
    textAlign: 'center',
    marginTop: 20,
  },

  registerButton: {
    backgroundColor: Colors.backgroundWhite,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    height: 57,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },

  registerText: {
    fontSize: 16,
    fontFamily: fonts.SansBold,
    color: Colors.black,
  },
});

export default LoginFooter;
