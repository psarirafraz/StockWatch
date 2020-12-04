import React, { useState, useEffect } from 'react';
import { View , StyleSheet ,Text} from 'react-native';

const TableRow = (props) => {
    const CellTitle1 = props.CellTitle1;
    const CellInfo1 = props.CellInfo1;
    const CellTitle2 = props.CellTitle2;
    const CellInfo2 = props.CellInfo2;
    return(
        <View style={{flexDirection:'row'}}>
            <View style={styles.TableTitleCell}><Text>{CellTitle1}</Text></View>
            <View style={styles.TableInfoCell}><Text style={styles.TableInfoText}>{CellInfo1}</Text></View>
            <View style={styles.TableTitleCell}><Text>{CellTitle2}</Text></View>
            <View style={styles.TableInfoCell}><Text style={styles.TableInfoText}>{CellInfo2}</Text></View>
        </View>
    );
}

const StockInfo = (props) =>{
    const symbol = props.symbol;
    const [info, setInfo] = useState(null);

    const LoadInfo = (sym) =>{
        useEffect(() => {
            fetch("https://query2.finance.yahoo.com/v7/finance/quote?&symbols="+sym)
            .then(response => response.json())
            .then(data => {
                data.quoteResponse.result.map(Data =>{
                    setInfo(Data)
                })
            })
        }, [])
    }

    LoadInfo(symbol);

    
    if(info!=null){
        return(
            <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{textAlign:'center' , flex: 1, marginBottom: 10, fontSize: 18}}>Stock Information</Text>
                </View>
                <TableRow CellTitle1="working" CellInfo1="!" CellTitle1="Ask" CellInfo1={info.askSize+" x "+info.ask}/>
                <TableRow CellTitle1="working" CellInfo1="!" CellTitle1="Bid" CellInfo1={info.bidSize+" x "+info.bid}/>
            </View>
        );
    }else{
        return(
            <Text>Loading...</Text>
        );
    }
}

const styles = StyleSheet.create({
    TableTitleCell:{
        flex: 1,
        height: 25,
        paddingLeft: 15
    },
    TableInfoCell:{
        flex: 2,
        height: 25
    },
    TableInfoText:{
        textAlign: 'center'
    }
})

export default StockInfo;