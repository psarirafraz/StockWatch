import React, { useState, useEffect  } from 'react';
import { View  , StyleSheet} from 'react-native';
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";

const EarningChart = (props) => {
    const symbol = props.symbol;
    const range = "1d";
    const interval = "1m";
    const extended = "false";
    const [MaxQuote, setMaxQuote] = useState(0);
    const [MinQuote, setMinQuote] = useState(0);
    // const [MaxTime, setMaxTime] = useState(0);
    // const [MinTime, setMinTime] = useState(0);
    const [timestamp ,setTimestamp] = useState(null);
    const [Earnings, setEarnings] = useState(null);
    const LoadSymbols = (sym) =>{
        useEffect(() =>{
            fetch("https://query2.finance.yahoo.com/v7/finance/chart/" + sym + "?range=" + range + "&interval=" + interval + "&indicators=quote&includeTimestamps=true&includePrePost=" + extended + "&events=div%7Csplit%7Cearn")
            .then(response => response.json())
            .then(data => {
                data.chart.result.map(Data =>{
                    setTimestamp(Data.timestamp);
                    Data.indicators.quote.map(quotes => {
                        setEarnings(quotes.close);
                        // setMaxQuote(Math.max.apply(null, quotes.high))
                        // setMinQuote(Math.min.apply(null, quotes.low))
                        // console.log(quotes)
                    })
                })
                // setMinTime(timestamp[0])
                // setMaxTime(timestamp[timestamp.length-1])
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
            
            fetch("https://query2.finance.yahoo.com/v7/finance/quote?&symbols="+sym)
            .then(res => res.json())
            .then(data => {
                data.quoteResponse.result.map(SymbolInfo => {
                    setMaxQuote(SymbolInfo.regularMarketDayHigh)
                    setMinQuote(SymbolInfo.regularMarketDayLow)
                })
            })

        }, []);
    };

    
    LoadSymbols(symbol);
    

    if(Earnings==null){
        return null;
    }else{
        return (
            <View style={styles.container}>
                <VictoryChart domain={{y : [MinQuote, MaxQuote]}} theme={VictoryTheme.material}>
                    <VictoryLine data={timestamp,Earnings}/>
                </VictoryChart>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
    },
});

export default EarningChart;