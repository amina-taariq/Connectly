import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
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
      <TouchableOpacity style={styles.googleButton}>
        <Image
          source={require('../../../assets/images/google.png')}
          resizeMode="contain"
          style={styles.googleImage}
        />
        <Text style={styles.registerText}>Sign In With Google</Text>
      </TouchableOpacity>
      <Text style={styles.dontAccount}>Don't have an Account?</Text>
      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Registration')}>
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
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundWhite,
    padding: 12,
    borderRadius: 16,
    marginTop: 10,
    height: 57,
    gap:6
  },
  registerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundWhite,
    padding: 12,
    borderRadius: 16,
    marginTop: 10,
    height: 57,
  },
  registerText: {
    fontSize: 16,
    fontFamily: fonts.SansBold,
    color: Colors.black,
  },
  googleImage: {
    height: 22,
    width:22
  }
});

export default LoginFooter;
