import React, { useState, useEffect  } from 'react';
import { StyleSheet, Text } from 'react-native';
// import EarningChart from '../shared/EarningChart.js';
import DateTimePicker from '@react-native-community/datetimepicker'

export default function stockProfile({ navigation }) {
    // const sym = navigation.getParam('symbol')
    const [date,setDate] = useState(new Date());
    return (
        <DateTimePicker 
        value={ date }
        mode='datetime'
        display='default'
        onChange={ date => setDate(date) } 
        />
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