import React, { useState } from 'react';
import { View , TouchableHighlight , Text ,StyleSheet} from 'react-native';
import PriceChart from '../shared/PriceChart2.js';

export default function stockProfile({ navigation }) {
    const sym = navigation.getParam('symbol');

    return (
      <View>
          <View>
            <PriceChart symbol={sym}/>
          </View>
          <View>
            <TouchableHighlight 
                onPress={() => navigation.navigate('FromWhen', { sym , notificationType:"Limit"})}
                >
              <Text style={styles.OptionButtomText}>Limit Notification</Text>
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight
                onPress={() => navigation.navigate('FromWhen', { sym , notificationType:"Stop"})}
                >
              <Text style={styles.OptionButtomText}>Stop Notification</Text>
            </TouchableHighlight>
          </View>
      </View>
    );
}

const styles = StyleSheet.create({
    OptionButtomText:{
        textAlign: 'center',
        fontSize: 25,
        color:'blue'
    },
});