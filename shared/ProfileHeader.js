import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileHeader({ title , navigation }) {

  return (
      <View style={styles.header}>
        <View style={styles.headerTitle}>
            <Text style={styles.headerText}>{title}</Text>
        </View>
        <View style={styles.NotificationIconContainer}>
            <TouchableOpacity onPress={() => {
                    navigation.navigate('ChooseNotificationType', { title })
                }}>
                <MaterialCommunityIcons name="bell-ring-outline" size={24} color="white" />
            </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    letterSpacing: 1,
  },
  headerTitle: {
    flexDirection: 'row',
  },
  headerImage: {
    width: 26,
    height: 26,
    marginHorizontal: 10
  },
  NotificationIconContainer: {
      width:40,
      height:40,
      position: 'absolute',
      right: -100,
      paddingTop: 5,
      paddingLeft: 10
  }
});