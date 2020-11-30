import React, { useState, useEffect  } from 'react';
import { View  , StyleSheet , Text, Pressable} from 'react-native';
import { BarChart } from 'react-native-svg-charts'
import { Dimensions } from 'react-native';

const EarningChart = (props) => {
    //source https://www.epochconverter.com/
    const year = 31556926;
    const month = 2629743;
    const week = 604800;

    const symbol = props.symbol;
    const today = new Date();
    const period2 = (Date.parse( today ) / 1000 ).toFixed(0);
    const period1 = ((Date.parse( today ) - ( 2 * year ))/ 1000 ).toFixed(0);;
    // const range = "1d";
    // const interval = "5m";
    // const extended = "false";
    // const numberOfIntervals = 78;
    
    
    const [numberOfQuotes,setnumberOfQuotes] = useState(0);
    const windowWidth = Dimensions.get('window').width;
    const [msg, setMsg]= useState("Loading...");
    // const [CurrentTime, setCurrentTime] = useState("");
    const [timestamp ,setTimestamp] = useState(null);
    const [QuoteTime, setQuoteTime] = useState(new Date());
    const [QuotePrice, setQuotePrice] = useState(null);
    const [SymbolInfo,setSymbolInfo] = useState(null);
    const [Dividend,setDividend] = useState(null);
    const [DividendTime,setDividendTime] = useState(null);
    const [DivPrice,setDivPrice] = useState(null);


    //https://query2.finance.yahoo.com/v8/finance/chart/GECC?formatted=true&includeAdjustedClose=true&interval=1d&period1=1574830664&period2=1606453064&events=div%7Csplit
    const LoadSymbols = (sym) =>{
        useEffect(() =>{
            fetch("https://query2.finance.yahoo.com/v8/finance/chart/" + sym +"?formatted=true&includeAdjustedClose=true&interval=1d&period1="+period1+"&period2="+period2+"&events=div%7Csplit")
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                data.chart.result.map(Data =>{
                    var DividendArray = [];
                    var DivTimeArray = [];
                    var DivPriceArray = [];
                    var arrTime = Data.timestamp
                    
                    for (var k in Data.events.dividends){
                        // console.log(Data.events.dividends[k].amount)
                        DividendArray.push(Data.events.dividends[k].amount)
                        // console.log(new Date(Data.events.dividends[k].date*1000))
                        DivTimeArray.push(Data.events.dividends[k].date)
                    }

                    Data.indicators.quote.map(quotes => {
                        // getting quotes
                        var arr = quotes.close
                        var index = 0
                        // filling the empty places
                        if(arr!==undefined && arr!==null){
                            for(var i = 0; i < arr.length; i++){
                                if(i != 0 && arr[i] == null ){
                                    arr[i]=arr[i-1]
                                }
                                if(arrTime[i] == DivTimeArray[index]){
                                    DivPriceArray.push(arr[i])
                                    index++;
                                }
                            }

                            // getting the number of quotes
                            setnumberOfQuotes(arr.length)

                            // setting the initial distance from left
                            // setLineDistanceFromLeft(((arr.length-1)/numberOfIntervals)*windowWidth)
                            
                            // setting Current Price
                            setQuoteTime(new Date(arrTime[arrTime.length-1]*1000))

                            // adding null values for reminding time
                            // for (var i = arr.length; i < numberOfIntervals; i++){
                            //     arr.push(null)
                            //     arrTime.push(null)
                            // }

                            // getting the array of prices
                            setQuotePrice(arr)

                            // getting the array of timestamp (need to multiply by 1000 to get actual time)
                            setTimestamp(arrTime)

                            console.log(new Date(period1*1000))
                            console.log(new Date(period2*1000))

                            setDividendTime(DivTimeArray)
                            setDividend(DividendArray)
                            setDivPrice(DivPriceArray)
                            
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
        }, []);
    };

    const fill = 'rgb(134, 65, 244)'

    LoadSymbols(symbol);

    if(Dividend == null){
        return (
            <View style={{ height: 220, flexDirection: 'row' , paddingTop: 5 , display: 'block',alignContent: 'center', alignItems: 'center'}}>
                <Text style={{textAlign: 'center', alignContent: 'center', width: '100%'}}>{msg}</Text>
            </View>
        );
    }else{
        return (
            <View>
                <View style={{ height: 220, flexDirection: 'row' , paddingTop: 5 , display: 'block'}}>
                    <View style={{ flex: 1, padding:0}}>
                        <BarChart style={{ height: 200 }} data={Dividend} svg={{ fill }} contentInset={{ top: 30, bottom: 30 }}
                        />
                    </View>
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
    },
    DiffIcon:{
        paddingLeft: 6,
        width: 24,
        paddingTop: 7.5
    }
});

export default EarningChart;