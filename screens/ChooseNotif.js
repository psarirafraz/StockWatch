import React, { useState } from 'react';
import { View , TouchableHighlight , Text} from 'react-native';
// import EarningChart from '../shared/EarningChart.js';

export default function stockProfile({ navigation }) {
    const sym = navigation.getParam('sym');
    const FromDate = navigation.getParam('FromDate');
    const UntilDate = navigation.getParam('UntilDate');
    state = {
      language: 'java',
    };
    return (
      <View>
          <View>
            <TouchableHighlight onPress={() => navigation.navigate("InputLimit", {FromDate , sym , UntilDate})}>
              <Text>Limit Notification</Text>
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight onPress={() => navigation.navigate("InputStop", {FromDate , sym , UntilDate})}>
              <Text>Stop Notification</Text>
            </TouchableHighlight>
          </View>
      </View>
    );
}
