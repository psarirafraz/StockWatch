import React from 'react';
import { View , StyleSheet , Button ,Text} from 'react-native';
import PriceChart from '../shared/PriceChart.js';
import { BottonStyles } from '../styles/CommonUI'

export default function stockProfile({ navigation }) {
    const sym = navigation.getParam('symbol');
    
    return (
      <View>
          <View>
            <PriceChart symbol={sym}/>
          </View>
          
          <View style={BottonStyles.CommonBotton}>
            <Button
              color='white'
              title='Limit Notification'
              onPress={() => navigation.navigate('FromWhen', { sym , notificationType:"Limit"})}
            />
          </View>
          <View style={BottonStyles.CommonBotton}>
            <Button
              color='white'
              title='Stop Notification'
              onPress={() => navigation.navigate('FromWhen', { sym , notificationType:"Stop"})}
            />
          </View>
          <View style={BottonStyles.CommonBotton}>
            <Button
              color='white'
              title='Dividend Analysis'
              onPress={() => navigation.navigate('dividendAnalysis', { sym })}
            />
          </View>
          {//console.log(PriceChart)
          }
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
