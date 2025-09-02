
import { View, StyleSheet, Image, Text, ViewStyle, ImageSourcePropType } from 'react-native';
import fonts from '../utils/fonts';
import { Colors } from '../constant/Colors';

type LogoProps = {
  iconWidth?: number;
  iconHeight?: number;
  textSize?: number;
  showText?: boolean;
  text?: string;
  containerStyle?: ViewStyle;
  source?: ImageSourcePropType; // optional override image
};

const Logo: React.FC<LogoProps> = ({
  iconWidth = 44,
  iconHeight = 44,
  textSize = 28,
  showText = true,
  text = 'Connectly',
  containerStyle,
  source,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image
        source={source ?? require('../../src/assets/images/chat.png')}
        style={[styles.logo, { width: iconWidth, height: iconHeight }]}
        resizeMode="contain"
      />
      {showText && <Text style={[styles.text, { fontSize: textSize }]}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    gap: 6,
  },
  logo: {
    width: 44,
    height: 44,
  },
  text: {
    fontFamily: fonts.SansBold,
    fontSize: 28,
    color:Colors.white
  }
});

export default Logo;
