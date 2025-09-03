
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { Colors } from '../../../constant/Colors';
import fonts from '../../../utils/fonts';
import { useNavigation } from '@react-navigation/native';

interface RegistrationFooterProps {
  onError?: (error: string) => void;
}

const RegistrationFooter: React.FC<RegistrationFooterProps> = () => {
  const navigation = useNavigation<any>();

  return (
    <View>
      <Image
        source={require('../../../assets/images/orImage.png')}
        style={styles.orImage}
        resizeMode="contain"
      />


      <Text style={styles.dontAccount}>Have an Account?</Text>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.registerText}>Login With Email</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundWhite,
    padding: 12,
    borderRadius: 16,
    marginTop: 10,
    height: 57,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  registerText: {
    fontSize: 16,
    fontFamily: fonts.SansBold,
    color: Colors.black,
  },
});

export default RegistrationFooter;
