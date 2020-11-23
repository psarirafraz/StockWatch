import React, { useState, useEffect  } from 'react';
import { View  , StyleSheet , Text, Pressable} from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import { Dimensions } from 'react-native';

const EarningChart = (props) => {
    const symbol = props.symbol;
    const range = "1d";
    const interval = "5m";
    const extended = "false";
    const numberOfIntervals = 78;
    const [numberOfQuotes,setnumberOfQuotes] = useState(0);
    const windowWidth = Dimensions.get('window').width;
    const [CurrentPrice, setCurrentPrice]=useState(0)
    const [LineDistanceFromLeft , setLineDistanceFromLeft]=useState(0)
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

                            setnumberOfQuotes(arr.length)
                            setLineDistanceFromLeft((numberOfQuotes/numberOfIntervals)*windowWidth)
                            console.log((numberOfQuotes/numberOfIntervals)*windowWidth)
                            //setting Current Price
                            setCurrentPrice(arr[arr.length-1])

                            //changing color baseon increase or decrease
                            if(arr[0]>arr[arr.length-1]){
                                setColor('red')
                            }else if(arr[0]<arr[arr.length-1]){
                                setColor('green')
                            }else{
                                setColor('black')
                            }

                            // adding null values for reminding time
                            for (var i = arr.length; i < numberOfIntervals; i++){
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
    
    const GetX = (e) => {
        const X = e.nativeEvent.pageX
        // const windowWidth = Dimensions.get('window').width;
        setLineDistanceFromLeft(X)
        // if()
        setCurrentPrice(QuotePrice[((X/windowWidth)*numberOfIntervals).toFixed(0)])
        // console.log(QuotePrice)
    }

    if(QuotePrice==null){
        return (
            <View style={{ height: 220, flexDirection: 'row' , paddingTop: 5 , display: 'block',alignContent: 'center', alignItems: 'center'}}>
                <Text style={{textAlign: 'center', alignContent: 'center', width: '100%'}}>{msg}</Text>
            </View>
        );
    }else{
        return (
            <View>
                <Pressable 
                    onPressOut={() => {
                        setCurrentPrice(QuotePrice[QuotePrice.length-1])
                        setLineDistanceFromLeft((numberOfQuotes/numberOfIntervals)*windowWidth)
                    }} 
                    onTouchEnd={() => {
                        setCurrentPrice(QuotePrice[QuotePrice.length-1])
                        setLineDistanceFromLeft((numberOfQuotes/numberOfIntervals)*windowWidth)
                    }} 
                    onTouchMove={(e) => GetX(e)}>
                    <View style={{ height: 220, flexDirection: 'row' , paddingTop: 5 , display: 'block'}}>
                        <View style={{ flex: 1, padding:0}}>
                            <LineChart
                                style={{ flex: 1 }}
                                data={QuotePrice}
                                contentInset={verticalContentInset}
                                svg={{ stroke: Color }}
                            />
                        </View>
                    </View>
                </Pressable>
                <View style={{position:'absolute' , width:0, height:220, borderWidth:1 ,left:LineDistanceFromLeft}}></View>
                <View style={{flexDirection: 'row' }}>
                    <Fontisto 
                        name="dollar"
                        size={24} 
                        style={styles.dollarIcon}
                        color={Color}
                    />
                    <Text style={{ fontSize: 24 , color:Color , paddingTop: 5 }}>
                        {CurrentPrice.toFixed(4)}
                    </Text>
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
    dollarIcon:{
        height: 40,
        width: 24,
        paddingLeft: 6,
        paddingTop: 8,
    }
});

export default EarningChart;