import React, { useState , useEffect} from 'react';
import { StyleSheet, View , TextInput , Text, Button} from 'react-native';
import PriceChart from '../shared/PriceChart.js';
import { Fontisto } from '@expo/vector-icons';
import { BottonStyles } from '../styles/CommonUI'

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

    const CreateNotification = () => {
      navigation.navigate('Home')
    }

    if(value != 0){
      return (
          <View>
              <View>
                <PriceChart symbol={sym}/>
              </View>
              <View style={{ flexDirection: 'row', alignContent:'center', alignSelf:'center' , marginTop:10}}>
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
              <View style={BottonStyles.CommonBotton}>
                <Button
                  color="white"
                  title="create Notification"
                  onPress={() => CreateNotification()}
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