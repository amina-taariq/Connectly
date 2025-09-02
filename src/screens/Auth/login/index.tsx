import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,

} from 'react-native';
import { Colors } from '../../../constant/Colors';
import fonts from '../../../utils/fonts';
import LoginFooter from './LoginFooter';
import LoginInput from './LoginInput';
import Logo from '../../../components/Logo';
interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = () => {

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
          <View style={styles.header}>
            <Logo
              iconWidth={56}
              iconHeight={56}
              textSize={28}
              showText
              text="Connectly"
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.titleHeader}>Login to your account</Text>
            <LoginInput />
            <LoginFooter />
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
    paddingTop:20
  },
  logo: {
    width: 300,
  },
  header: {
    width: '100%',
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleHeader: {
    fontSize: 32,
    marginBottom: 20,
    fontFamily: fonts.SansBold,
  },
});

export default LoginScreen;
