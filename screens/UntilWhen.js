import React, { useState } from 'react';
import { View , Button , Text} from 'react-native';
import { BottonStyles } from '../styles/CommonUI'
import DateTimePicker from '@react-native-community/datetimepicker'

export default function stockProfile({ navigation }) {
    const sym = navigation.getParam('sym');
    const FromDate = navigation.getParam('FromDate');
    const notificationType = navigation.getParam('notificationType');
    const [UntilDate, setDate] = useState(new Date(Date.parse(new Date())+900000000));
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || UntilDate;
      setDate(currentDate);
    };
  
    return (
      <View>
          <DateTimePicker
            value={UntilDate}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
          <View style={BottonStyles.CommonBotton}>
            <Button 
              onPress={() => {
                navigation.navigate('NotificationInput', {FromDate , sym , UntilDate , notificationType})
              }} 
              title="next"
              color="white"
            />
          </View>
      </View>
    );
}
