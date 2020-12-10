import React, { useState, useEffect } from 'react';
import { View , StyleSheet ,Text} from 'react-native';

const TableRow = (props) => {
    const reduceTheNumber = (value) =>{
        if(Number.isInteger(value) && value > 1000000000){
            return (value/1000000000).toFixed(1)+"b"
        }else if(Number.isInteger(value) && value > 1000000){
            return (value/1000000).toFixed(1)+"m"
        }else{
            return value
        }
    }
    const CellTitle1 = props.CellTitle1;
    const CellInfo1 = reduceTheNumber(props.CellInfo1);
    const CellTitle2 = props.CellTitle2;
    const CellInfo2 = reduceTheNumber(props.CellInfo2);
    return(
        <View style={{flexDirection:'row'}}>
            <View style={{flex:1, flexDirection: 'row'}}>
                <View style={styles.TableTitleCell}>
                    <Text 
                        allowFontScaling={true}
                        adjustsFontSizeToFit={true}
                        maxFontSizeMultiplier={24}
                        numberOfLines={1}>
                        {CellTitle1}
                    </Text>
                </View>
                <View style={styles.TableInfoCell}>
                    <Text style={styles.TableInfoText}>
                        {CellInfo1}
                    </Text>
                </View>
            </View>
            <View style={{flex:1, flexDirection: 'row'}}>
                <View style={styles.TableTitleCell}>
                    <Text 
                        allowFontScaling={true}
                        adjustsFontSizeToFit={true}
                        maxFontSizeMultiplier={24}
                        numberOfLines={1}>
                        {CellTitle2}
                    </Text>
                </View>
                <View style={styles.TableInfoCell}>
                    <Text style={styles.TableInfoText}>
                        {CellInfo2}
                    </Text>
                </View>
            </View>
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
                    console.log(Data)
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
                    <Text style={{textAlign:'center' , flex: 1, marginBottom: 20, fontSize: 18}}>Stock Information</Text>
                </View>
                <TableRow CellTitle2="Market Cap." CellInfo2={info.marketCap} CellTitle1="Ask" CellInfo1={info.askSize+" x "+info.ask}/>
                <TableRow CellTitle2="Volume" CellInfo2={info.regularMarketVolume} CellTitle1="Bid" CellInfo1={info.bidSize+" x "+info.bid}/>
                <TableRow CellTitle1="Today High" CellInfo1={info.regularMarketDayHigh} CellTitle2="52w High" CellInfo2={info.fiftyTwoWeekHigh}/>
                <TableRow CellTitle1="Today Low" CellInfo1={info.regularMarketDayLow} CellTitle2="52w Low" CellInfo2={info.fiftyTwoWeekLow}/>
                <TableRow CellTitle1="Ex.divid" CellInfo1={(new Date(info.dividendDate*1000).getMonth()+1)+"/"+new Date(info.dividendDate*1000).getDate()+"/"+new Date(info.dividendDate*1000).getFullYear()} CellTitle2="1 year divid" CellInfo2={info.trailingAnnualDividendRate} />
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
        flex: 2,
        height: 35,
        paddingLeft: 10,
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    TableInfoCell:{
        flex: 3,
        height: 35
    },
    TableInfoText:{
        textAlign: 'center',
    }
})

export default StockInfo;