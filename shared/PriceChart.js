import React, { useState, useEffect  } from 'react';
import { View  , StyleSheet , Text, Pressable , TouchableOpacity} from 'react-native';
import { Fontisto , AntDesign } from '@expo/vector-icons';
import { LineChart , ProgressCircle } from 'react-native-svg-charts'
import { Dimensions } from 'react-native';


const EarningChart = (props) => {
    const symbol = props.symbol;
    const range = ["1d", "5d", "1mo", "3mo", "6mo", "ytd", "1y", "2y", "5y", "10y", "max"];
    const interval = ["1m", "2m", "5m", "15m", "30m", "60m", "90m", "1h", "1d", "5d", "1wk", "1mo", "3mo"];
    const extended = "false";
    const [numberOfIntervals, setNumberOfIntervals] = useState(390);
    const [intervalIndex, setIntervalIndex] = useState(0);
    const [reangeIndex, setRangeIndex] = useState(0);
    const [numberOfQuotes,setnumberOfQuotes] = useState(0);
    const windowWidth = Dimensions.get('window').width;
    const [CurrentPrice, setCurrentPrice] = useState(0);
    const [LineDistanceFromLeft , setLineDistanceFromLeft] = useState(0);
    const [diffPrice , setDiffPrice] = useState(0);
    const [UDsign , setUDsign] = useState("caretup");
    const [msg, setMsg]= useState("Loading...");
    const [Color, setColor]= useState('black');
    const [timestamp ,setTimestamp] = useState(null);
    const [QuoteTime, setQuoteTime] = useState(new Date());
    const [QuotePrice, setQuotePrice] = useState(null);
    const [SymbolInfo, setSymbolInfo] = useState(null);
    const [RequestProgress, setRequestProgress]= useState(0);

    const LoadSymbols = (sym) =>{
        useEffect(() =>{
            fetch("https://query1.finance.yahoo.com/v7/finance/chart/" + sym + "?range=" + range[reangeIndex] + "&interval=" + interval[intervalIndex] + "&indicators=quote&includeTimestamps=true&includePrePost=" + extended + "&events=div%7Csplit%7Cearn")
            .then(response => response.json())
            .then(data => {
                if(data.chart.result){
                    setRequestProgress(0.4)
                    data.chart.result.map(Data =>{
                        
                        var arrTime = Data.timestamp

                        Data.indicators.quote.map(quotes => {
                            // getting quotes
                            var arr = quotes.close

                            // filling the empty places
                            if(arr!==undefined && arr!==null){
                                setRequestProgress(0.5)
                                
                                for(var i = 1; i < arr.length; i++){
                                    if(arr[i] == null ){
                                        arr[i]=arr[i-1]
                                    }
                                }
                                setRequestProgress(0.8)
                                // getting the number of quotes
                                setnumberOfQuotes(arr.length)
                                
                                if(reangeIndex==0){
                                    setNumberOfIntervals(390)
                                }else{
                                    setNumberOfIntervals(arr.length)
                                }

                                // setting the initial distance from left
                                setLineDistanceFromLeft(((arr.length-1)/numberOfIntervals)*windowWidth)
                                
                                // setting Current Price
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

                                // setting the initial price difference
                                setDiffPrice(arr[arr.length-1]-arr[0])

                                setRequestProgress(0.9)

                                // adding null values for reminding time
                                for (var i = arr.length; i < numberOfIntervals; i++){
                                    arr.push(null)
                                    arrTime.push(null)
                                }

                                // getting the array of prices
                                setQuotePrice(arr)
                                
                                // getting the array of timestamp (need to multiply by 1000 to get actual time)
                                setTimestamp(arrTime)

                                setRequestProgress(1.0)
                                
                            }else{
                                setQuotePrice(null)
                                setMsg("Yahoo API is not available for this Symbol")
                            }
                        })
                    })
                }else{
                    setQuotePrice(null)
                    setMsg("Yahoo API is not available for this Date")   
                }
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
                })
            })

        }, []);
    };

    const ReloadSymbols = (sym) =>{
        setQuotePrice(null)
        setMsg("Loading...")

        fetch("https://query1.finance.yahoo.com/v7/finance/chart/" + sym + "?range=" + range[reangeIndex] + "&interval=" + interval[intervalIndex] + "&indicators=quote&includeTimestamps=true&includePrePost=" + extended + "&events=div%7Csplit%7Cearn")
        .then(response => response.json())
        .then(data => {
            if(data.chart.result){
                
                setRequestProgress(0.4)

                data.chart.result.map(Data =>{
                    
                    var arrTime = Data.timestamp

                    Data.indicators.quote.map(quotes => {
                        // getting quotes
                        var arr = quotes.close

                        // filling the empty places
                        if(arr!==undefined && arr!==null){

                            setRequestProgress(0.5)

                            for(var i = 1; i < arr.length; i++){
                                if(arr[i] == null ){
                                    arr[i]=arr[i-1]
                                }
                            }

                            setRequestProgress(0.8)

                            // getting the number of quotes
                            setnumberOfQuotes(arr.length)
                            
                            if(reangeIndex==0){
                                setNumberOfIntervals(390)
                            }else{
                                setNumberOfIntervals(arr.length)
                            }
                            // setting the initial distance from left
                            setLineDistanceFromLeft(((arr.length-1)/numberOfIntervals)*windowWidth)
                            
                            // setting Current Price
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

                            // setting the initial price difference
                            setDiffPrice(arr[arr.length-1]-arr[0])
                            
                            setRequestProgress(0.9)
                            // adding null values for reminding time
                            for (var i = arr.length; i < numberOfIntervals; i++){
                                arr.push(null)
                                arrTime.push(null)
                            }
                            
                            // getting the array of prices
                            setQuotePrice(arr)

                            // getting the array of timestamp (need to multiply by 1000 to get actual time)
                            setTimestamp(arrTime)

                            setRequestProgress(1.0)
                            
                        }else{
                            setQuotePrice(null)
                            setMsg("Yahoo API is not available for this Symbol")
                        }
                    })
                })
            }else{
                setQuotePrice(null)
                setMsg("Yahoo API is not available for this Date")   
            }
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
            })
        })
    };

    const verticalContentInset = { top: 10, bottom: 10 }

    LoadSymbols(symbol);

    useEffect(() =>{
        let rotationInterval = setInterval( () => {
            fetch("https://query1.finance.yahoo.com/v7/finance/chart/" + symbol + "?range=" + range[reangeIndex] + "&interval=" + interval[intervalIndex] + "&indicators=quote&includeTimestamps=true&includePrePost=" + extended + "&events=div%7Csplit%7Cearn")
            .then(response => response.json())
            .then(data => {
                if(data.chart.result){
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

                            // getting the number of quotes
                            setnumberOfQuotes(arr.length)

                            if(reangeIndex==0){
                                setNumberOfIntervals(390)
                            }else{
                                setNumberOfIntervals(arr.length)
                            }

                            // setting the initial distance from left
                            setLineDistanceFromLeft(((arr.length-1)/numberOfIntervals)*windowWidth)

                            // setting Current Price
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

                            // setting the initial price difference
                            setDiffPrice(arr[arr.length-1]-arr[0])

                            // adding null values for reminding time
                            for (var i = arr.length; i < numberOfIntervals; i++){
                                arr.push(null)
                                arrTime.push(null)
                            }

                            // getting the array of prices
                            setQuotePrice(arr)

                            // getting the array of timestamp (need to multiply by 1000 to get actual time)
                            setTimestamp(arrTime)
                            
                        }else{
                            setQuotePrice(null)
                            setMsg("Yahoo API is not available for this Symbol")
                        }
                    })
                })
            }else{
                setQuotePrice(null)
                setMsg("Yahoo API is not available for this Date")
            }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
            fetch("https://query2.finance.yahoo.com/v7/finance/quote?&symbols="+symbol)
            .then(res => res.json())
            .then(data => {
                data.quoteResponse.result.map(Info => {
                    setCurrentPrice(Info.regularMarketPrice)
                })
            })
        }, 5000);
        return () => {
            clearInterval(rotationInterval);
        }
    });

    const GetX = (e) => {
        const X = e.nativeEvent.pageX
        const CurrentIndex = ((X/windowWidth)*numberOfIntervals).toFixed(0)

        if(QuotePrice[CurrentIndex]!=null){
            setLineDistanceFromLeft(CurrentIndex*(windowWidth/numberOfIntervals))
            
            setCurrentPrice(QuotePrice[CurrentIndex])

            setDiffPrice(QuotePrice[CurrentIndex]-QuotePrice[0])

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

    const runTheJewls = (id) => {
        if(id==reangeIndex){
            return{
                backgroundColor: "#99ccff",
                borderRadius: 5,
                height: 35, 
                width: 35,
                paddingTop: 9
            }
        }else{
            return{
                borderRadius: 5,
                height: 35, 
                width: 35,
                paddingTop: 9
            }
        }
    }

    const OhhLala = (id) => {
        if(id==reangeIndex){
            return{
                color: 'white',
                fontSize: 12.5,
                textAlign: 'center',
            }
        }else{
            return{
                color: Color,
                fontSize: 12.5,
                textAlign: 'center',
            }
        }
    }

    if(QuotePrice==null || SymbolInfo==null){
        if(msg==="Loading..."){
            return (
                <View style={{ height: 330, flexDirection: 'row' , paddingTop: 5 , display: 'block',alignContent: 'center', alignItems: 'center'}}>
                    <Text style={{textAlign: 'center', alignContent: 'center', width: '100%', position: "absolute"}}>{msg}</Text>
                    <ProgressCircle
                        style={{ height: '100%',width: '100%', alignContent:'center', alignItems: 'center', alignItems: 'center' }} progress={RequestProgress} progressColor={'rgb(134, 65, 244)'} startAngle={ 0 } endAngle={ Math.PI * 2 }
                    />
                </View>
            );
        }else{
            return (
                <View style={{ height: 220, flexDirection: 'row' , paddingTop: 5 , display: 'block',alignContent: 'center', alignItems: 'center'}}>
                    <Text style={{textAlign: 'center', alignContent: 'center', width: '100%'}}>{msg}</Text>
                </View>
            );
        }
    }else{
        return (
            <View>
                <View style={{flexDirection: 'row' , paddingLeft: 5 }}>
                    <AntDesign
                        name={UDsign}
                        style={styles.DiffIcon}
                        color={Color}/>
                    <Text style={{ color:Color , paddingTop: 5 }}>
                        {diffPrice.toFixed(8)}
                    </Text>
                    <Text style={{ color:'black' , textAlign:'right' , flex: 1, paddingRight: 10 , paddingTop: 5}}>
                        {(QuoteTime.getMonth()+1).toString()} / {QuoteTime.getDate().toString()} / {QuoteTime.getFullYear().toString()}      {QuoteTime.getHours().toString()}:{QuoteTime.getMinutes().toString()}
                    </Text>
                </View>
                <View style={{flexDirection: 'row' }}>
                    <View style={{ flexDirection:"row" , width: '50%'}}>
                        <Fontisto 
                        name="dollar"
                        size={24} 
                        style={styles.dollarIcon}
                        color={Color}/>
                        <Text style={{ fontSize: 24 , color:Color , paddingTop: 5 }}>
                            {CurrentPrice.toFixed(4)}
                        </Text>  
                    </View>  
                    <Text 
                    style={{flex:1 , flexDirection:"row" , textAlign:'right' ,  paddingRight: 10 , fontSize: 24 , paddingTop: 5 , width: '50%'}}
                    allowFontScaling={true}
                    adjustsFontSizeToFit={true}
                    maxFontSizeMultiplier={24}
                    numberOfLines={1}>
                        {SymbolInfo.shortName}
                    </Text>
                    
                </View>
                <Pressable 
                onPressOut={() => LineBackToX() } 
                onTouchEnd={() => LineBackToX() } 
                onTouchMove={(e) => GetX(e)}>
                    <View style={{ height: 220, flexDirection: 'row' , paddingTop: 5 , display: 'block'}}>
                        <View style={{ flex: 1, padding:0}}>
                            <LineChart
                                style={{ flex: 1 }}
                                data={QuotePrice}
                                contentInset={verticalContentInset}
                                svg={{ stroke: Color }}
                                animate={true}
                                // animationDuration={0}
                                />
                        </View>
                    </View>
                </Pressable>
                <View style={{position:'absolute' , width: 0, height: 210, borderWidth: 1 , left: LineDistanceFromLeft , top: 65 ,borderColor: 'silver'}}/>
                <View style={{ height: 50, flexDirection: 'row' , padding: 5 , display: 'block'}}> 
                    <TouchableOpacity
                        style={{flex: 1}}
                        onPress={()=>{
                            if(reangeIndex!=0){
                                setRangeIndex(0)
                                setIntervalIndex(0)
                                setNumberOfIntervals(390)
                                ReloadSymbols(symbol)
                            }}}
                        >
                        <View style={runTheJewls(0)}>
                            <Text style={OhhLala(0)}>
                                1d
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex: 1}}
                        onPress={()=>{
                            if(reangeIndex!=1){
                                setRangeIndex(1)
                                setIntervalIndex(1)
                                ReloadSymbols(symbol)
                            }}}
                        >
                        <View style={runTheJewls(1)}>
                            <Text style={OhhLala(1)}>
                                5d
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex: 1}}
                        onPress={()=>{
                            if(reangeIndex!=2){
                                setRangeIndex(2)
                                setIntervalIndex(2)
                                ReloadSymbols(symbol)
                            }}}
                        >
                        <View style={runTheJewls(2)}>
                            <Text style={OhhLala(2)}>
                                1m
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex: 1}}
                        onPress={()=>{
                            if(reangeIndex!=3){
                                setRangeIndex(3)
                                setIntervalIndex(5)
                                ReloadSymbols(symbol)
                            }}}
                        >
                        <View style={runTheJewls(3)}>
                            <Text style={OhhLala(3)}>
                                3m
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex: 1}}
                        onPress={()=>{
                            if(reangeIndex!=4){
                                setRangeIndex(4)
                                setIntervalIndex(5)
                                ReloadSymbols(symbol)
                            }}}
                        >
                        <View style={runTheJewls(4)}>
                            <Text style={OhhLala(4)}>
                                6m
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex: 1}}
                        onPress={()=>{
                            if(reangeIndex!=5){
                                setRangeIndex(5)
                                setIntervalIndex(8)
                                ReloadSymbols(symbol)
                            }}}
                        >
                        <View style={runTheJewls(5)}>
                            <Text style={OhhLala(5)}>
                                ytd
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex: 1}}
                        onPress={()=>{
                            if(reangeIndex!=6){
                                setRangeIndex(6)
                                setIntervalIndex(8)
                                ReloadSymbols(symbol)
                            }}}
                        >
                        <View style={runTheJewls(6)}>
                            <Text style={OhhLala(6)}>
                                1y
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex: 1}}
                        onPress={()=>{
                            if(reangeIndex!=7){
                                setRangeIndex(7)
                                setIntervalIndex(9)
                                ReloadSymbols(symbol)
                            }}}
                        >
                        <View style={runTheJewls(7)}>
                            <Text style={OhhLala(7)}>
                                2y
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex: 1}}
                        onPress={()=>{
                            if(reangeIndex!=8){
                                setRangeIndex(8)
                                setIntervalIndex(9)
                                ReloadSymbols(symbol)
                            }}}
                        >
                        <View style={runTheJewls(8)}>
                            <Text style={OhhLala(8)}>
                                5y
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex: 1}}
                        onPress={()=>{
                            if(reangeIndex!=9){
                                setRangeIndex(9)
                                setIntervalIndex(10)
                                ReloadSymbols(symbol)
                            }}}
                        >
                        <View style={runTheJewls(9)}>
                            <Text style={OhhLala(9)}>
                                10y
                            </Text>
                        </View>
                    </TouchableOpacity>
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
        backgroundColor: "#f5fcff", 
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
    },
});

export default EarningChart;