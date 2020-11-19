import React, { useState } from 'react';
import { View , Button , Text} from 'react-native';
// import EarningChart from '../shared/EarningChart.js';
import DateTimePicker from '@react-native-community/datetimepicker'

export default function FromWhen({ navigation }) {
    const sym = navigation.getParam('sym');
    const notificationType = navigation.getParam('notificationType');
    const [FromDate, setDate] = useState(new Date());
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || FromDate;
      setDate(currentDate);
    };
    
    return (
      <View>
          
          <DateTimePicker
            value={FromDate}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
          <Button onPress={() => {
            navigation.navigate('UntilWhen', {FromDate , sym , notificationType})
            }} title="next"/>
      </View>
    );
}
