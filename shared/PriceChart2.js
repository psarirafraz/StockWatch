import React, { useState, useEffect  } from 'react';
import { View  , StyleSheet , Text, Pressable} from 'react-native';
import { Fontisto , AntDesign } from '@expo/vector-icons';
import { LineChart } from 'react-native-svg-charts'
import { Dimensions } from 'react-native';

const EarningChart = (props) => {
    const symbol = props.symbol;
    const range = "1d";
    const interval = "5m";
    const extended = "false";
    const numberOfIntervals = 78;
    const [lowestPrice ,setlowestPrice] = useState(0);
    const [HighestPrice ,setHighestPrice] = useState(0);
    const [numberOfQuotes,setnumberOfQuotes] = useState(0);
    const windowWidth = Dimensions.get('window').width;
    const [CurrentPrice, setCurrentPrice] = useState(0)
    const [LineDistanceFromLeft , setLineDistanceFromLeft] = useState(0)
    const [diffPrice , setDiffPrice] = useState(0)
    // const [DotDistanceFromTop , setDotDistanceFromTop] = useState(0)
    const [UDsign , setUDsign] = useState("caretup");
    const [msg, setMsg]= useState("Loading...");
    const [Color, setColor]= useState('black');
    // const [CurrentTime, setCurrentTime] = useState("");
    const [timestamp ,setTimestamp] = useState(null);
    const [QuoteTime, setQuoteTime] = useState(new Date());
    const [QuotePrice, setQuotePrice] = useState(null);
    const [SymbolInfo,setSymbolInfo] = useState(null);
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
                            setlowestPrice(arr[0])
                            setHighestPrice(arr[0])
                            for(var i = 1; i < arr.length; i++){
                                if(arr[i] == null ){
                                    arr[i]=arr[i-1]
                                }
                                if(lowestPrice>arr[i]){
                                    setlowestPrice(arr[i])
                                }else if(HighestPrice<arr[i]){
                                    setHighestPrice(arr[i])
                                }
                            }

                            setnumberOfQuotes(arr.length)
                            setLineDistanceFromLeft(((arr.length-1)/numberOfIntervals)*windowWidth)

                            
                            //setting Current Price
                            setQuoteTime(new Date(arrTime[arrTime.length-1]*1000))

                            //changing color baseon increase or decrease
                            if(arr[0]>arr[arr.length-1]){
                                setColor('red')
                                setUDsign('caretdown')
                            }else if(arr[0]<arr[arr.length-1]){
                                setColor('green')
                                setUDsign('caretup')
                            }else{
                                setColor('black')
                            }
                            setDiffPrice(arr[arr.length-1]-arr[0])
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
                    setCurrentPrice(Info.regularMarketPrice)
                    // setDiffPrice(Info.regularMarketPrice-QuotePrice[0])
                })
            })

        }, []);
    };

    const verticalContentInset = { top: 10, bottom: 10 }

    LoadSymbols(symbol);
    
    const GetX = (e) => {
        const X = e.nativeEvent.pageX
        const CurrentIndex = ((X/windowWidth)*numberOfIntervals).toFixed(0)

        if(QuotePrice[CurrentIndex]!=null){

            // setLineDistanceFromLeft(CurrentIndex*(windowWidth/numberOfIntervals))
            setLineDistanceFromLeft(CurrentIndex*(windowWidth/numberOfIntervals))
            
            setCurrentPrice(QuotePrice[CurrentIndex])

            setDiffPrice(QuotePrice[CurrentIndex]-QuotePrice[0])
            // setDotDistanceFromTop((lowestPrice/QuotePrice[CurrentIndex])*220)

            setQuoteTime(new Date(timestamp[CurrentIndex]*1000))
            if(QuotePrice[0]<QuotePrice[CurrentIndex]){
                setColor('green')
                setUDsign('caretup')
            }else{
                setColor('red')
                setUDsign('caretdown')
            }
        }
    }

    const LineBackToX = () => {
        
        setCurrentPrice(SymbolInfo.regularMarketPrice)
        setLineDistanceFromLeft(((numberOfQuotes-1)/numberOfIntervals)*windowWidth)
        setQuoteTime(new Date(timestamp[numberOfQuotes-1]*1000))
        setDiffPrice(QuotePrice[numberOfQuotes-1]-QuotePrice[0])
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
                <View style={{flexDirection: 'row' , paddingLeft: 5 }}>
                    <AntDesign
                        name={UDsign}
                        style={styles.DiffIcon}
                        color={Color}
                    />
                    <Text style={{ color:Color , paddingTop: 5 }}>
                        {diffPrice.toFixed(8)}
                    </Text>
                    <Text style={{ color:'black' , textAlign:'right' , flex: 1, paddingRight: 10 , paddingTop: 5}}>
                        {
                            QuoteTime.getHours().toString()}:{QuoteTime.getMinutes().toString()
                        }
                    </Text>
                </View>
                <View style={{flexDirection: 'row' }}>
                    <View style={{ flexDirection:"row" , width: '50%'}}>
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
                    <Text style={{flex:1 , flexDirection:"row" , textAlign:'right' ,  paddingRight: 10 , fontSize: 24 , paddingTop: 5 , width: '50%'}}
                        allowFontScaling={true}
                        adjustsFontSizeToFit={true}
                        maxFontSizeMultiplier={24}
                        numberOfLines={1}
                    >
                        {SymbolInfo.shortName}
                    </Text>
                    
                </View>
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
                <View style={{position:'absolute' , width: 0, height: 210, borderWidth: 1 , left: LineDistanceFromLeft , top: 65 ,borderColor: 'silver'}}/>
                {/* <View style={{position:'absolute' , width: 8 , height: 8, borderRadius: 8, backgroundColor: Color, left: LineDistanceFromLeft-2.5, top: DotDistanceFromTop}}/> */}
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
    },
    DiffIcon:{
        paddingLeft: 6,
        width: 24,
        paddingTop: 7.5
    }
});

export default EarningChart;