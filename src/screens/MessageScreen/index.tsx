import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Platform, TextInput, ScrollView} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import { Colors } from '../../constant/Colors';
import fonts from '../../utils/fonts';

interface Message {
  id: number;
  text: string;
  isFromMe: boolean;
  timestamp: Date;
  isRead: boolean;
}

const todayAt = (hour: number, minute: number): Date => {
  const d = new Date();
  d.setHours(hour, minute, 0, 0);
  return d;
};

const initialMessages: Message[] = [
  {
    id: 1,
    text: 'Hello! How are you?',
    isFromMe: false,
    timestamp: todayAt(12, 0),
    isRead: true,
  },
  {
    id: 2,
    text: "Hi! I'm doing great, thanks for asking.",
    isFromMe: true,
    timestamp: todayAt(12, 2),
    isRead: true,
  },
  {
    id: 3,
    text: "Hi! I'm doing great, thanks for asking.",
    isFromMe: false,
    timestamp: todayAt(12, 20),
    isRead: true,
  },
  {
    id: 4,
    text: "Hi! I'm doing great, thanks for asking.",
    isFromMe: true,
    timestamp: todayAt(12, 22),
    isRead: true,
  },
  {
    id: 5,
    text: "Hi! I'm doing great, thanks for asking.",
    isFromMe: false,
    timestamp: todayAt(12, 32),
    isRead: true,
  },
];

const MessageScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {chatData} = route.params as any;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: inputText.trim(),
        isFromMe: true,
        timestamp: new Date(),
        isRead: false,
      };
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
    }
  };

  const renderMessage = (message: Message) => (
    <View
      key={message.id}
      style={[
        styles.messageBubble,
        message.isFromMe ? styles.myMessage : styles.otherMessage,
      ]}
    >
      <Text style={[styles.messageText]}>{message.text}</Text>
      <View style={styles.msgInnerContainer}>
        <Text style={styles.timeText}>{formatTime(message.timestamp)}</Text>
        {message.isRead ? (
          <Image
            style={styles.tickIcon}
            source={require('../../assets/images/doubleTick.png')}
            resizeMode="contain"
          />
        ) : (
          <Image
            style={styles.tickIcon}
            source={require('../../assets/images/singleTick.png')}
            resizeMode="contain"
          />
        )}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View style={styles.header}>
        <View style={styles.headerInnerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.backBtn}
              source={require('../../assets/images/backButton.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.userContainer}>
            <Image
              style={styles.profileContainer}
              source={chatData?.profilePic}
            />
            <View style={styles.userNameContainer}>
              <Text style={styles.headerText}>{chatData?.name || 'Chat'}</Text>
              <Text style={styles.smallText}>Last view 1h ago</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.menuStyle}>
          <Image
            style={styles.menu}
            source={require('../../assets/images/menuIcon.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.chatContainer}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(renderMessage)}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.imageUpload}>
            <Image
              style={styles.uploadIcon}
              source={require('../../assets/images/imageUpload.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Enter your message"
            placeholderTextColor={Colors.lightGrey}
            multiline
            maxLength={500}
          />
          <TouchableOpacity onPress={sendMessage} disabled={!inputText.trim()}>
            <Image
              style={styles.sendIcon}
              source={require('../../assets/images/sendBtn.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  headerInnerContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  headerText: {
    fontFamily: fonts.SansBold,
    fontSize: 18,
    color: Colors.black,
  },
  menuStyle: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    height: 36,
    width: 36,
    borderRadius: 18,
  },
  userContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  smallText: {
    fontFamily: fonts.SansRegular,
    fontSize: 12,
    color: Colors.black,
  },
  userNameContainer: {
    gap: 2,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'column',
    gap: 4,
    backgroundColor: '#F3F6F7',
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  myMessage: {
    alignSelf: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
  },
  messageText: {
    fontFamily: fonts.SansRegular,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.black,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 8,
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderColor: '#E1E8EB',
    borderWidth: 1,
  },

  textInput: {
    flex: 1,
    fontFamily: fonts.SansRegular,
    fontSize: 16,
    color: Colors.black,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E1E8EB',
  },
  imageUpload: {
    height: 45,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  msgInnerContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  timeText: {
    fontFamily: fonts.SansRegular,
    fontSize: 12,
    color: Colors.black,
  },
  tickIcon: {
    height: 14,
    width: 14,
  },
  backBtn: {
    height: 40,
    width: 40,
  },
  menu: {
    height: 22,
    width: 4,
  },
  uploadIcon: {
    height: 24,
    width: 24,
  },
  sendIcon: {
    height: 46,
    width: 45,
  },
});

export default MessageScreen;
