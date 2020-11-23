import React, { useState, useEffect  } from 'react';
import { View  , StyleSheet , Text, Pressable} from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { LineChart } from 'react-native-svg-charts'
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
    // const [CurrentTime, setCurrentTime] = useState("");
    const [timestamp ,setTimestamp] = useState(null);
    const [QuoteTime, setQuoteTime] = useState(new Date());
    const [QuotePrice, setQuotePrice] = useState(null);
    const [SymbolInfo,setSymbolInfo]= useState(null);
    const LoadSymbols = (sym) =>{
        useEffect(() =>{
            fetch("https://query1.finance.yahoo.com/v7/finance/chart/" + sym + "?range=" + range + "&interval=" + interval + "&indicators=quote&includeTimestamps=true&includePrePost=" + extended + "&events=div%7Csplit%7Cearn")
            .then(response => response.json())
            .then(data => {
                data.chart.result.map(Data =>{
                    
                    var arrTime = Data.timestamp

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
                            setLineDistanceFromLeft(((arr.length/numberOfIntervals)*windowWidth)-2)

                            
                            //setting Current Price
                            setCurrentPrice(arr[arr.length-1])
                            setQuoteTime(new Date(arrTime[arrTime.length-1]*1000))
            
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
                                arrTime.push(null)
                            }
                            setQuotePrice(arr)
                            setTimestamp(arrTime)
                            
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
            fetch("https://query2.finance.yahoo.com/v7/finance/quote?&symbols="+sym)
            .then(res => res.json())
            .then(data => {
                data.quoteResponse.result.map(Info => {
                    setSymbolInfo(Info)
                    // console.log(Info)
                })
            })

        }, []);
    };

    const axesSvg = { fontSize: 5, fill: Color };
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30
    const contentInset = { top: 20, bottom: 20 }

    LoadSymbols(symbol);
    
    const GetX = (e) => {
        const X = e.nativeEvent.pageX
        if(QuotePrice[((X/windowWidth)*numberOfIntervals).toFixed(0)]!=null){

            setLineDistanceFromLeft(((X/windowWidth)*numberOfIntervals).toFixed(0)*(windowWidth/numberOfIntervals))
            setCurrentPrice(QuotePrice[((X/windowWidth)*numberOfIntervals).toFixed(0)])

            setQuoteTime(new Date(timestamp[((X/windowWidth)*numberOfIntervals).toFixed(0)]*1000))
            if(QuotePrice[0]<QuotePrice[((X/windowWidth)*numberOfIntervals).toFixed(0)]){
                setColor('green')
            }else{
                setColor('red')
            }
        }
    }

    const LineBackToX = () => {
        setCurrentPrice(QuotePrice[numberOfQuotes-1])
        setLineDistanceFromLeft(((numberOfQuotes/numberOfIntervals)*windowWidth)-2)
        setQuoteTime(new Date(timestamp[timestamp.length-1]*1000))
    }

    if(QuotePrice==null || SymbolInfo==null){
        return (
            <View style={{ height: 220, flexDirection: 'row' , paddingTop: 5 , display: 'block',alignContent: 'center', alignItems: 'center'}}>
                <Text style={{textAlign: 'center', alignContent: 'center', width: '100%'}}>{msg}</Text>
            </View>
        );
    }else{
        return (
            <View>
                <Pressable 
                    onPressOut={() => LineBackToX() } 
                    onTouchEnd={() => LineBackToX() } 
                    onTouchMove={(e) => GetX(e)}
                >
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
                <View style={{position:'absolute' , width:0, height:210, borderWidth:1 , left:LineDistanceFromLeft , top:5}}></View>
                <View style={{flexDirection: 'row' }}>
                    <Text>
                        {SymbolInfo.shortName}
                    </Text>
                    <Text style={{ color:'black' , textAlign:'right' , flex: 1, paddingRight: 10}}>
                        {QuoteTime.getHours().toString()}:{QuoteTime.getMinutes().toString()
                        }
                    </Text>
                </View>
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