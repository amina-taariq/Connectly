import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native';
import fonts from '../../../utils/fonts';
import { Colors } from '../../../constant/Colors';

const LoginInput: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Colors.grey2}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          returnKeyType="next"
        />
      </View>
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
          returnKeyType="done"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.eyeText}>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={() => {}}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    height: 57,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginTop: 12,
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
  eyeText: {
    fontFamily: fonts.SansBold,
    color: Colors.black,
    fontSize: 14,
    paddingLeft: 8,
  },
  loginButton: {
    backgroundColor: Colors.yellow,
    height: 57,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  loginText: {
    fontFamily: fonts.SansBold,
    color: Colors.black,
    fontSize: 16,
  },
});

export default LoginInput;
