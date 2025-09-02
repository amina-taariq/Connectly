import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Colors } from '../../constant/Colors';
import ChatBox from './ChatBox';
import ChatList from './ChatList';
import Logo from '../../components/Logo';

const HomeScreen = () => {
  const renderChatItem = ({ item }: { item: any }) => (
    <ChatBox
      name={item.name}
      time={item.time}
      message={item.message}
      profilePic={item.profilePic}
      isRead={item.isRead}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo iconWidth={44} iconHeight={44} textSize={22} showText text="Connectly"  />
      </View>
      <View style={styles.content}>
        <FlatList
          data={ChatList}
          renderItem={renderChatItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
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
    paddingBottom: 24,
  },
  header: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems:'flex-start'
  },
  logo: {
    width: 140,
    height: 40,
  },
});

export default HomeScreen;
