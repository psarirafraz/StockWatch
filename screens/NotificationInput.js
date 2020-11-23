import React, { useState , useEffect} from 'react';
import { StyleSheet, View , TouchableHighlight , TextInput , Text} from 'react-native';
import PriceChart from '../shared/PriceChart2.js';
import { Fontisto } from '@expo/vector-icons';

export default function stockProfile({ navigation }) {
    const sym = navigation.getParam('sym');
    const FromDate = navigation.getParam('FromDate');
    const UntilDate = navigation.getParam('UntilDate');
    const notificationType = navigation.getParam('notificationType');
    const [value, setValue] = useState("0");
    const LoadHighAndLow = (symbol) =>{
      useEffect(() =>{
        fetch("https://query2.finance.yahoo.com/v7/finance/quote?&symbols="+symbol)
        .then(res => res.json())
        .then(data => {
            data.quoteResponse.result.map(SymbolInfo => {
                if(notificationType==="Stop"){
                  setValue(String(SymbolInfo.fiftyTwoWeekLow))
                }else if(notificationType==="Limit"){
                  setValue(String(SymbolInfo.fiftyTwoWeekHigh))
                }
                // console.log(SymbolInfo)
            })
        })
      }, []);
    };

    LoadHighAndLow(sym);

    if(value != 0){
      return (
        <View style={{ flex: 1}}>
            <View>
              <PriceChart symbol={sym}/>
            </View>
            <View style={{ flex: 1 , flexDirection: 'row', alignContent:'center', alignSelf:'center'}}>
              <Text style={{ padding: 10, height: 40}}>Set the {notificationType} Price: </Text>
              <Fontisto 
                name="dollar"
                size={24} 
                style={styles.dollarIcon}
              />
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 , width: 100 , textAlign: 'center' , borderRadius: 5 }}
                onChangeText={text => setValue(text)}
                value={value}
                keyboardType={'decimal-pad'}
              />
            </View>
        </View>
      );
    }else{
      return null;
    }
}

const styles = StyleSheet.create({
  dollarIcon:{
    height: 40,
    width: 24,
    paddingLeft: 6,
    paddingTop: 8
  }
});