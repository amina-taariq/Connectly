import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import fonts from '../../utils/fonts';
import {Colors} from '../../constant/Colors';

interface ChatBoxProps {
  name: string;
  time: string;
  message: string;
  profilePic: any;
  isRead: boolean;
}

type RootStackParamList = {
  MessageScreen: {chatData: any};
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const ChatBox = ({name, time, message, profilePic, isRead}: ChatBoxProps) => {
  const navigation = useNavigation<NavigationProp>();

  const handleChatPress = () => {
    const chatData = {
      name,
      time,
      message,
      profilePic,
      isRead,
    };
    navigation.navigate('MessageScreen', {chatData});
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleChatPress}>
      <Image style={styles.profileContainer} source={profilePic} />
      <View style={styles.firstContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.H3}>{name}</Text>
          <Text>{time}</Text>
        </View>
        <View style={styles.msgBox}>
                      <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.smallLabel,
                {fontFamily: isRead ? fonts.SansRegular : fonts.SansBold}
              ]}>
              {message}
            </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    paddingVertical: 8,
  },
  profileContainer: {
    height: 70,
    width: 70,
    borderWidth: 2,
    borderColor: '#E1E8EB',
    borderRadius: 35,
  },
  firstContainer: {
    flexDirection: 'column',
    marginVertical: 10,
    gap: 4,
    flex: 1,
  },
  innerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  H3: {
    fontSize: 18,
    fontFamily: fonts.SansBold,
    color: Colors.black,
  },
  smallLabel: {
    fontSize: 14,
    color: Colors.black,
  },
  msgBox: {
    paddingRight: 31,
    width: '100%',
  },
});

export default ChatBox;
