import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors } from '../../constant/Colors';
import Logo from '../../components/Logo';
type RootStackParamList = {
  Login: undefined;
};

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;


const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login')
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Logo
        iconWidth={56}
        iconHeight={56}
        textSize={28}
        showText
        text="Connectly"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.main,
  },
  logo: {
    width: 400,
    height: 400,
  },
});

export default SplashScreen;
