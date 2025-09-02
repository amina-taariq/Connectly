import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import { Colors } from '../../../constant/Colors';
import fonts from '../../../utils/fonts';

interface RegistrationInputsProps {
  onSubmit?: (data: { fullName: string; email: string; password: string; confirmPassword: string }) => void;
}

const RegistrationInputs: React.FC<RegistrationInputsProps> = ({ onSubmit }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor={Colors.grey2}
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="next"
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={Colors.grey2}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={[styles.inputWrapper, styles.inputRow]}>
          <TextInput
            style={[styles.input, styles.inputFlex]}
            placeholder="Password"
            placeholderTextColor={Colors.grey2}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={setPassword}
            returnKeyType="next"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={
                showPassword
                  ? require('../../../assets/images/show.png')
                  : require('../../../assets/images/hidden.png')
              }
              resizeMode="contain"
              style={styles.eyeStyle}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={[styles.inputWrapper, styles.inputRow]}>
          <TextInput
            style={[styles.input, styles.inputFlex]}
            placeholder="Confirm Password"
            placeholderTextColor={Colors.grey2}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
            autoCorrect={false}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            returnKeyType="done"
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Image
              source={
                showConfirmPassword
                  ? require('../../../assets/images/show.png')
                  : require('../../../assets/images/hidden.png')
              }
              resizeMode="contain"
              style={styles.eyeStyle}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() =>
          onSubmit?.({ fullName, email, password, confirmPassword })
        }
      >
        <Text style={styles.primaryText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 12,
  },
  inputWrapper: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    height: 57,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginTop: 0,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontFamily: fonts.SansMedium,
    color: Colors.black,
    fontSize: 16,
  },
  inputFlex: {
    flex: 1,
  },
  eyeStyle: {
    height: 20,
    width:20,
    paddingLeft: 8,
  },
  primaryButton: {
    backgroundColor: Colors.yellow,
    height: 57,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  primaryText: {
    fontFamily: fonts.SansBold,
    color: Colors.black,
    fontSize: 16,
  },
});

export default RegistrationInputs;


