import React from 'react';
import { StyleSheet, Text } from 'react-native';
import EarningChart from '../shared/EarningChart.js';


export default function stockProfile({ navigation }) {
    const sym = navigation.getParam('symbol')
    return (
        <EarningChart symbol={sym}></EarningChart> 
    );
}
  
  const styles = StyleSheet.create({
    rating: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 16,
      marginTop: 16,
      borderTopWidth: 1,
      borderTopColor: '#eee',
    }
  });