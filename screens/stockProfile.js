import React, { useState } from 'react';
import { View , Button , Text} from 'react-native';
// import EarningChart from '../shared/EarningChart.js';

export default function stockProfile({ navigation }) {
    const sym = navigation.getParam('symbol');
    const FromDate = navigation.getParam('FromDate');
    const UntilDate = navigation.getParam('UntilDate');
    return (
      <View>
          <Text>{sym}</Text>
          <Text>{Date.parse(FromDate)}</Text>
          <Text>{Date.parse(UntilDate)}</Text>
      </View>
    );
}
