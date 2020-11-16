import React from 'react';
import { View , FlatList , StyleSheet , TouchableHighlight,Text} from 'react-native';

const SearchBox = (props) => {
    const hide = props.hide;
    const Data = props.data;
    const navigation = props.navigation;
    
    if (hide || Data==null) {
        return null;
    }else{
        return (
            <View style={styles.SearchResultBox}>
                <FlatList
                    data={Data}
                    keyExtractor={(item) => item.symbol}
                    renderItem={({ item, index, separators }) => (
                        <TouchableHighlight
                            key={item.symbol}
                            onPress={() => navigation.navigate('FromWhen', item)}>
                            <View style={styles.resultBoxStyle}>
                                <Text style={styles.resultTextStyle}>{item.symbol}</Text>
                            </View>
                        </TouchableHighlight>
                    )}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    SearchResultBox:{
        width: '100%',
        height: 'auto',
        padding: 5,
        backgroundColor: '#d9d9d9',
        position:'absolute',
        top:50
    },
    resultBoxStyle:{
        padding: 5,
        borderBottomWidth: 2
    },
    resultTextStyle:{
        fontSize: 20
    }
});

export default SearchBox;