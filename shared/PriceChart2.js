import React, { useState, useEffect  } from 'react';
import { View  , StyleSheet} from 'react-native';
import { Grid, AreaChart, XAxis, YAxis } from 'react-native-svg-charts'

const EarningChart = (props) => {
    const symbol = props.symbol;
    const range = "1d";
    const interval = "1m";
    const extended = "false";
    const numberOfMin = 390;

    const [MaxQuote, setMaxQuote] = useState(0);
    const [MinQuote, setMinQuote] = useState(0);
    // const [MaxTime, setMaxTime] = useState(0);
    // const [MinTime, setMinTime] = useState(0);
    const timestamp = ["9:30","10:00","10:30","11:00","11:30","12:00","12:30","1:00","1:30","2:00","2:30","3:00","3:30","4:00"]
    const [Earnings, setEarnings] = useState(null);
    const LoadSymbols = (sym) =>{
        useEffect(() =>{
            fetch("https://query1.finance.yahoo.com/v7/finance/chart/" + sym + "?range=" + range + "&interval=" + interval + "&indicators=quote&includePrePost=" + extended + "&events=div%7Csplit%7Cearn")
            .then(response => response.json())
            .then(data => {
                data.chart.result.map(Data =>{
                    // setTimestamp(Data.timestamp);
                    Data.indicators.quote.map(quotes => {
                        // setEarnings(quotes.close);
                        var arr = quotes.close
                        for (var i = arr.length-1; i < numberOfMin; i++){
                            arr.push(null)
                        }
                        setEarnings(arr)
                    })
                })
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

    const axesSvg = { fontSize: 5, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30
    const contentInset = { top: 20, bottom: 20 }

    LoadSymbols(symbol);
    

    if(Earnings==null){
        return null;
    }else{
        return (
            <View style={{ height: 150, flexDirection: 'row' , paddingTop: 5 }}>
                <YAxis
                    data={Earnings}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 5,
                    }}
                    numberOfTicks={5}
                    formatLabel={(value) => value}
                />
                <View style={{ flex: 1, padding:0}}>
                    
                    <AreaChart
                        style={{ flex: 1 }}
                        data={Earnings}
                        contentInset={verticalContentInset}
                        svg={{ fill: 'rgb(134, 65, 244)' }}
                    >
                    </AreaChart>
                    <XAxis
                        style={{ marginHorizontal: -10, height: xAxisHeight , paddingTop: 4}}
                        data={timestamp}
                        formatLabel={(value,index) => timestamp[index]}
                        contentInset={{ left: 10, right: 10 }}
                        svg={axesSvg}
                    />
                </View>
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