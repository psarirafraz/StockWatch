import React, { useState } from 'react';
import { View , TouchableHighlight , Text} from 'react-native';
import PriceChart from '../shared/PriceChart2.js';

export default function stockProfile({ navigation }) {
    const sym = navigation.getParam('sym');
    const FromDate = navigation.getParam('FromDate');
    const UntilDate = navigation.getParam('UntilDate');

    return (
      <View>
          <View>
            <PriceChart symbol={sym}/>
          </View>
      </View>
    );
}