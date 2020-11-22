import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default function Header({ title }) {

  return (
      <View style={styles.header}>
        <View style={styles.headerTitle}>
            <Text style={styles.headerText}>{title}</Text>
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
    flexDirection: 'row'
  },
  headerImage: {
    width: 26,
    height: 26,
    marginHorizontal: 10
  },
});