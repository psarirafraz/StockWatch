import React, { useState, useEffect  } from 'react';
import { View  , StyleSheet , Text} from 'react-native';
import { block } from 'react-native-reanimated';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'

const EarningChart = (props) => {
    const symbol = props.symbol;
    const range = "1d";
    const interval = "1m";
    const extended = "false";
    const numberOfMin = 390;
    const [msg, setMsg]= useState("Loading...");
    const [Color, setColor]= useState('black');
    const timestamp = ["9:30","10:00","10:30","11:00","11:30","12:00","12:30","1:00","1:30","2:00","2:30","3:00","3:30","4:00"]
    const [QuotePrice, setQuotePrice] = useState(null);
    const LoadSymbols = (sym) =>{
        useEffect(() =>{
            fetch("https://query1.finance.yahoo.com/v7/finance/chart/" + sym + "?range=" + range + "&interval=" + interval + "&indicators=quote&includePrePost=" + extended + "&events=div%7Csplit%7Cearn")
            .then(response => response.json())
            .then(data => {
                data.chart.result.map(Data =>{
                    // setTimestamp(Data.timestamp);
                    
                    Data.indicators.quote.map(quotes => {
                        // getting quotes
                        var arr = quotes.close

                        // filling the empty places
                        if(arr!==undefined && arr!==null){
                            for(var i = 1; i < arr.length; i++){
                                if(arr[i] == null ){
                                    arr[i]=arr[i-1]
                                }
                            }

                            //changing color baseon increase or decrease
                            if(arr[0]>arr[arr.length-1]){
                                setColor('red')
                            }else if(arr[0]<arr[arr.length-1]){
                                setColor('green')
                            }else{
                                setColor('black')
                            }

                            // adding null values for reminding time
                            for (var i = arr.length-1; i < numberOfMin; i++){
                                arr.push(null)
                            }
                            setQuotePrice(arr)
                        }else{
                            setQuotePrice(null)
                            setMsg("Yahoo API is not available for this Symbol")
                        }
                    })
                    
                })
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
            // fetch("https://query2.finance.yahoo.com/v7/finance/quote?&symbols="+sym)
            // .then(res => res.json())
            // .then(data => {
            //     data.quoteResponse.result.map(SymbolInfo => {
            //         setMaxQuote(SymbolInfo.regularMarketDayHigh)
            //         setMinQuote(SymbolInfo.regularMarketDayLow)
            //     })
            // })

        }, []);
    };

    const axesSvg = { fontSize: 5, fill: Color };
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30
    const contentInset = { top: 20, bottom: 20 }

    LoadSymbols(symbol);
    

    if(QuotePrice==null){
        return (
            <View style={{ height: 220, flexDirection: 'row' , paddingTop: 5 , display: 'block',alignContent: 'center', alignItems: 'center'}}>
                <Text style={{textAlign: 'center', alignContent: 'center', width: '100%'}}>{msg}</Text>
            </View>
        );
    }else{
        return (
            <View style={{ height: 220, flexDirection: 'row' , paddingTop: 5 , display: 'block'}}>
                <YAxis
                    data={QuotePrice}
                    contentInset={contentInset}
                    svg={{
                        // fill: 'grey',
                        fontSize: 5,
                    }}
                    numberOfTicks={5}
                    formatLabel={(value) => value}
                />
                <View style={{ flex: 1, padding:0}}>
                    
                    <LineChart
                        style={{ flex: 1 }}
                        data={QuotePrice}
                        contentInset={verticalContentInset}
                        svg={{ stroke: Color }}
                    >
                    </LineChart>
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