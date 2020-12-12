import React from 'react';
import { View , StyleSheet , TouchableOpacity, Text, ScrollView} from 'react-native';
import { MaterialIcons,FontAwesome } from '@expo/vector-icons';

export default function ChooseNotificationType({ navigation }) {
    const sym = navigation.getParam('title');
    
    return (
      <ScrollView style={{flex: 1 , padding: 20}}>
          <TouchableOpacity onPress={() => navigation.navigate('FromWhen', { sym , notificationType:"Limit"})}>
              <View style={styles.notifiTypeBox}>
                <View style={styles.IconsBox}>
                    <MaterialIcons name="show-chart" size={70} color="green" />
                </View>
                <View style={styles.NotifiExplnation}>
                    <View style={styles.TitleBox}>
                        <Text style={{fontSize: 18, color: 'green'}}>
                            Limit
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.ExplnationBox}
                        allowFontScaling={true}
                        adjustsFontSizeToFit={true}
                        maxFontSizeMultiplier={10}
                        numberOfLines={2}
                        >
                            Set up notification for when price of this stock hit your maximum price.
                        </Text>
                    </View>
                </View>
              </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('FromWhen', { sym , notificationType:"Stop"})}>
              <View style={styles.notifiTypeBox}>
                <View style={styles.IconsBox}>
                    <MaterialIcons style={{transform:[{rotateY: '180deg'}]}} name="show-chart" size={70} color="red" />
                </View>
                <View style={styles.NotifiExplnation}>
                    <View style={styles.TitleBox}>
                        <Text style={{fontSize: 18, color: 'red'}}>
                            Stop
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.ExplnationBox}
                        allowFontScaling={true}
                        adjustsFontSizeToFit={true}
                        maxFontSizeMultiplier={10}
                        numberOfLines={2}
                        >
                            Set up notification for when price of this stock hit your mininum price.
                        </Text>
                    </View>
                </View>
              </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
              <View style={styles.notifiTypeBox}>
                <View style={styles.IconsBox}>
                    <FontAwesome style={{marginTop: 12.5}} name="newspaper-o" size={50} color="#00b3b3" />
                </View>
                <View style={styles.NotifiExplnation}>
                    <View style={styles.TitleBox}>
                        <Text style={{fontSize: 18, color: '#00b3b3'}}>
                            News
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.ExplnationBox}
                        allowFontScaling={true}
                        adjustsFontSizeToFit={true}
                        maxFontSizeMultiplier={10}
                        numberOfLines={2}
                        >
                            Set up notification for when a new news available for this stock.
                        </Text>
                    </View>
                </View>
              </View>
          </TouchableOpacity>
      </ScrollView>
    );
}


const styles = StyleSheet.create({
    notifiTypeBox: {
        width: '100%',
        height: 100,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#bfbfbf',
        marginBottom: 20,
        flexDirection: 'row'
    },
    IconsBox: {
        // marginTop: 10,
        // marginBottom: 10,
        margin: 5,
        flex: 1,
        left:0,
        padding: 10,
        borderRightWidth: 1 ,
        borderRightColor: 'black'
    },
    NotifiExplnation: {
        flex: 4,
        flexDirection: 'column'
    },
    TitleBox:{ 
        padding: 10
    },
    ExplnationBox: {
        paddingLeft: 10,
        paddingRight: 10
    }
});
