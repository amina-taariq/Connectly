import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../../../constant/Colors';
import fonts from '../../../utils/fonts';
import authService, {
  UserRegistrationData,
} from '../../../services/authService';
import { useNavigation } from '@react-navigation/native';
import { validateRegistrationForm } from '../../../utils/validation';

interface RegistrationInputsProps {
  photoUri?: string;
  onSuccess?: (user: any, profile: any) => void;
  onError?: (error: string) => void;
  onNavigateToHome?: () => void; // New prop for navigation
}

const RegistrationInputs: React.FC<RegistrationInputsProps> = ({
  photoUri,
  onSuccess,
  onError,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
   const navigation = useNavigation<any>();
  

  // Function to clear all form fields
  const clearAllFields = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setErrors({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const validateForm = (): boolean => {
    const validationResult = validateRegistrationForm(
      fullName,
      email,
      password,
      confirmPassword
    );
    
    setErrors({
      fullName: validationResult.fullName,
      email: validationResult.email,
      password: validationResult.password,
      confirmPassword: validationResult.confirmPassword
    });
    
    return validationResult.isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const registrationData: UserRegistrationData = {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        confirmPassword,
        photoUri,
      };

      const { user, profile } = await authService.registerWithEmail(
        registrationData,
      );

      // Show success alert with navigation
      Alert.alert(
        'Success',
        'Account created successfully! Welcome to the app!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Call onSuccess callback first
              onSuccess?.(user, profile);

              // Clear all form fields
              clearAllFields();

              // Reset navigation stack and set Home as the only screen
              if (navigation) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Home' }],
                });
              } else {
                console.warn(
                  'Navigation prop not provided to RegistrationInputs',
                );
              }
            },
          },
        ],
        { cancelable: false }, // Prevent dismissing by tapping outside
      );
    } catch (error: any) {
      console.error('Registration failed:', error);
      const errorMessage =
        error.message || 'Registration failed. Please try again.';

      Alert.alert('Registration Failed', errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getInputStyle = (fieldName: keyof typeof errors) => [
    styles.input,
    errors[fieldName] ? styles.inputError : null,
  ];

  const getInputWrapperStyle = (fieldName: keyof typeof errors) => [
    styles.inputWrapper,
    errors[fieldName] ? styles.inputWrapperError : null,
  ];

  return (
    <View>
      {/* Full Name Input */}
      <View style={styles.inputContainer}>
        <View style={getInputWrapperStyle('fullName')}>
          <TextInput
            style={getInputStyle('fullName')}
            placeholder="Full Name"
            placeholderTextColor={Colors.grey2}
            value={fullName}
            onChangeText={text => {
              setFullName(text);
              if (errors.fullName) {
                setErrors(prev => ({ ...prev, fullName: '' }));
              }
            }}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="next"
            editable={!isLoading}
          />
        </View>
        {errors.fullName ? (
          <Text style={styles.errorText}>{errors.fullName}</Text>
        ) : null}
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <View style={getInputWrapperStyle('email')}>
          <TextInput
            style={getInputStyle('email')}
            placeholder="Email"
            placeholderTextColor={Colors.grey2}
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (errors.email) {
                setErrors(prev => ({ ...prev, email: '' }));
              }
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            editable={!isLoading}
          />
        </View>
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <View style={[getInputWrapperStyle('password'), styles.inputRow]}>
          <TextInput
            style={[getInputStyle('password'), styles.inputFlex]}
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
            returnKeyType="next"
            editable={!isLoading}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
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

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <View
          style={[getInputWrapperStyle('confirmPassword'), styles.inputRow]}
        >
          <TextInput
            style={[getInputStyle('confirmPassword'), styles.inputFlex]}
            placeholder="Confirm Password"
            placeholderTextColor={Colors.grey2}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
            autoCorrect={false}
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              if (errors.confirmPassword) {
                setErrors(prev => ({ ...prev, confirmPassword: '' }));
              }
            }}
            returnKeyType="done"
            editable={!isLoading}
            onSubmitEditing={handleSubmit}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={isLoading}
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
        {errors.confirmPassword ? (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        ) : null}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[
          styles.primaryButton,
          isLoading && styles.primaryButtonDisabled,
        ]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={Colors.black} size="small" />
        ) : (
          <Text style={styles.primaryText}>Create Account</Text>
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
    marginTop: 0,
  },
  inputWrapperError: {
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
  inputError: {
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
  primaryButton: {
    backgroundColor: Colors.yellow,
    height: 57,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  primaryButtonDisabled: {
    backgroundColor: Colors.grey2,
    opacity: 0.6,
  },
  primaryText: {
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

export default RegistrationInputs;
