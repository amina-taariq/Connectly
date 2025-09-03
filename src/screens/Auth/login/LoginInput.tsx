import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Text, Image, Alert, ActivityIndicator} from 'react-native';
import fonts from '../../../utils/fonts';
import { Colors } from '../../../constant/Colors';
import { useNavigation } from '@react-navigation/native';
import authService from '../../../services/authService';
import { validateLoginForm } from '../../../utils/validation';

const LoginInput: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const navigation = useNavigation<any>();
  
  const validateForm = (): boolean => {
    const validationResult = validateLoginForm(email, password);
    setErrors({
      email: validationResult.email,
      password: validationResult.password
    });
    return validationResult.isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    try {
      const { user, profile } = await authService.signInWithEmail(email.trim(), password);
      console.log('Login successful', { user: user.uid, profile });
      // Reset navigation stack and set Home as the only screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getInputStyle = (fieldName: keyof typeof errors) => [
    styles.input,
    errors[fieldName] ? styles.inputTextError : null,
    fieldName === 'password' ? styles.inputFlex : null
  ];

  const getInputWrapperStyle = (fieldName: keyof typeof errors) => [
    styles.inputWrapper,
    errors[fieldName] ? styles.inputError : null,
    fieldName === 'password' ? styles.inputRow : null
  ];

  return (
    <View>
      <View style={styles.inputContainer}>
        <View style={getInputWrapperStyle('email')}>
          <TextInput
            style={getInputStyle('email')}
            placeholder="Email"
            placeholderTextColor={Colors.grey2}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (errors.email) {
                setErrors(prev => ({ ...prev, email: '' }));
              }
            }}
            returnKeyType="next"
            editable={!isLoading}
          />
        </View>
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}
      </View>
      <View style={styles.inputContainer}>
        <View style={getInputWrapperStyle('password')}>
          <TextInput
             style={getInputStyle('password')}
             placeholder="Password"
             placeholderTextColor={Colors.grey2}
             secureTextEntry={!showPassword}
             autoCapitalize="none"
             autoCorrect={false}
             value={password}
             onChangeText={text => {
              setPassword(text);
              if (errors.password) {
                setErrors(prev => ({ ...prev, password: '' }));
              }
            }}
             returnKeyType="done"
             editable={!isLoading}
             onSubmitEditing={handleLogin}
           />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={isLoading}>
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
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={[styles.loginButton, isLoading && styles.disabledButton]}
        onPress={handleLogin}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.black} />
        ) : (
          <Text style={styles.loginText}>Login</Text>
        )}
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
    marginTop: 12,
  },
  inputError: {
    borderColor: '#FF6B6B',
    borderWidth: 1.5,
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
  inputTextError: {
    color: '#FF6B6B',
  },
  inputFlex: {
    flex: 1,
  },
  eyeStyle: {
    height: 20,
    width: 20,
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
  disabledButton: {
    opacity: 0.7,
  },
  loginText: {
    fontFamily: fonts.SansBold,
    color: Colors.black,
    fontSize: 16,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    fontFamily: fonts.SansMedium,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default LoginInput;
