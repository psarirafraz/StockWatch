import React, { useState, useEffect  } from 'react';
import { StyleSheet, View, TextInput , FlatList , ListItem } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SearchBox from '../shared/SearchBox.js';

export default function Home({ navigation }) {
    const [SearchInputValue, setSearchInputValue]=useState("");
    const [modalOpen, setBoxHide] = useState(true);
    const [Symbols, setFoundSymbols] = useState(null);
    const LoadSymbols = (sym) =>{
        fetch('https://autoc.finance.yahoo.com/autoc?query=' + sym + '&region=1&lang=en')
        .then(response => response.json())
        .then(data => setFoundSymbols(data.ResultSet.Result))
        .catch(error => {
            console.error('There was an error!', error);
        });
    };
    const GetSymbols = (text) => {
        setSearchInputValue(text);
        LoadSymbols(text);
        setBoxHide(false);
    };
    const FinishSearch = () => {
        if(Symbols != null && SearchInputValue != ""){
          Symbols.map(sym =>{
            if(sym.symbol==SearchInputValue.toUpperCase()){
              navigation.navigate('FromWhen', sym)
            }
          })
        }
    };

    // const Item = ({ symbol }) => (
    //     <View style={styles.item}>
    //         <Text style={styles.symbol}>{symbol}</Text>
    //     </View>
    // );
    // const renderItem = ({ symbol }) => (
    //     <Item symbol={symbol.symbol} />
    // );

  return (
    <View>
        <View style={styles.SearchBarInput}>
            <MaterialIcons 
                name='search'
                size={24} 
                style={styles.searchIcon}
            />
            <TextInput
                style={styles.SearchInput}
                placeholder='Search By Symbol'
                autoCorrect={false}
                onChangeText={text => GetSymbols(text)}
                value={SearchInputValue}
                onEndEditing={FinishSearch}
            />
        </View>
        <SearchBox hide={modalOpen} data={Symbols} navigation={navigation}>
        </SearchBox> 
    </View>
  );
}

const styles = StyleSheet.create({
  searchIcon:{
    margin:10
  },
  SearchBarInput: {
      width: '100%',
      height: 50,
      padding: 2,
      borderWidth: 1,
      flexDirection: 'row'
  },
  SearchInput:{
      width:'100%'
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  symbol: {
    fontSize: 32,
  },
});