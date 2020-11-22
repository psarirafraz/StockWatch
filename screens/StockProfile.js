import React, { useState } from 'react';
import { View , TouchableHighlight , Text ,StyleSheet , Button} from 'react-native';
import PriceChart from '../shared/PriceChart2.js';

export default function stockProfile({ navigation }) {
    const sym = navigation.getParam('symbol');
    
    return (
      <View>
          <View>
            <PriceChart symbol={sym}/>
          </View>
          <View>
            <Button
              title='Limit Notification'
              onPress={() => navigation.navigate('FromWhen', { sym , notificationType:"Limit"})}
            />
          </View>
          <View>
            <Button
              title='Stop Notification'
              onPress={() => navigation.navigate('FromWhen', { sym , notificationType:"Stop"})}
            />
          </View>
      </View>
    );
}


const styles = StyleSheet.create({
    OptionButtomText:{
        textAlign: 'center',
        fontSize: 15,
        color:'blue',
        padding: 5
    },
});
