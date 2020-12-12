import React from 'react';
import { View , StyleSheet , Button , ScrollView} from 'react-native';
import PriceChart from '../shared/PriceChart.js';
import StockInfo from '../shared/StockInfo.js';
import { BottonStyles } from '../styles/CommonUI'

export default function stockProfile({ navigation }) {
    const sym = navigation.getParam('symbol');
    
    return (
      <ScrollView>
          <View>
            <PriceChart symbol={sym}/>
          </View>
          <StockInfo symbol={sym}/>
          <View style={BottonStyles.CommonBotton}>
            <Button
              color='white'
              title='Dividend Analysis'
              onPress={() => navigation.navigate('dividendAnalysis', { sym })}
            />
          </View>
      </ScrollView>
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
