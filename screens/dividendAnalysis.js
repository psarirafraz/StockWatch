import React from 'react';
import { View , StyleSheet } from 'react-native';
import DividendPriceChart from '../shared/DividendPriceChart.js';

export default function stockProfile({ navigation }) {
    const sym = navigation.getParam('sym');
    
    return (
      <View>
          <View>
            <DividendPriceChart symbol={sym}/>
          </View>
      </View>
    );
}


// const styles = StyleSheet.create({
    
// });
