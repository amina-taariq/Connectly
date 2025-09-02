import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Colors } from '../../../constant/Colors';
import fonts from '../../../utils/fonts';
import RegistrationInputs from './RegistrationInputs';
import RegistrationFooter from './RegistrationFooter';
import RegistrationAvatar from './RegistrationAvatar';

interface RegistrationScreenProps {
  navigation: any;
}

const RegistrationScreen: React.FC<RegistrationScreenProps> = () => {


  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header} />
          <View style={styles.content}>
            <View style={styles.headerText}>
              <Text style={styles.titleHeader}>Create Account</Text>
              <Text style={styles.subtitle}>
                Join Connectly and start connecting
              </Text>
            </View>
            <RegistrationAvatar/>
            <RegistrationInputs/>
            <RegistrationFooter/>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flexGrow: 1,
    minHeight: '100%',
    paddingBottom: 43,
    paddingTop: 20,
  },
  header: {
    width: '100%',
    height: 45,
  },
  titleHeader: {
    fontSize: 32,
    fontFamily: fonts.SansBold,
    color: Colors.black,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.lightGrey,
    textAlign: 'center',
  },
  headerText: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 24,
  },
});

export default RegistrationScreen;
