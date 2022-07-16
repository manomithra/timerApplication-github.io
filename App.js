import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import SecondsToHms from './SecondsToHms';

export default function App() {
  const [secondsText, onChangeSeconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [counterIndex, setCounterIndex] = useState(0);
  const [timerData, setTimerData] = useState([]);
  const [startCountdown, setStartCountdown] = useState(false);

console.log(secondsText)
  useEffect(() => {
    if (startCountdown) {
      const timer =
        seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);
      var timerArray = [...timerData];
      timerArray[counterIndex] = {
        ...timerArray[counterIndex],
        inputText: seconds,
      };
      timerArray[counterIndex] = {
        ...timerArray[counterIndex],
        counterObject: SecondsToHms(parseInt(seconds)),
      };

      if (seconds === 0) {
        setStartCountdown(false);
        timerArray[counterIndex] = {
          ...timerArray[counterIndex],
          counterStatus: 'START',
        };
      }
      setTimerData(timerArray);
      return () => clearInterval(timer);
    }
  }, [seconds, startCountdown]);

  const startPushToggle = (item, index) => {
    var updateArray = [...timerData];
    if (item.counterStatus == 'START') {
      setStartCountdown(true);
      updateArray[index] = { ...updateArray[index], counterStatus: 'PAUSE' };
      setCounterIndex(index);
      setSeconds(item.inputText);
    } else {
      setStartCountdown(false);
      updateArray[index] = { ...updateArray[index], counterStatus: 'START' };
      setCounterIndex(index);
      setSeconds(item.inputText);
    }
    setTimerData(updateArray);
  };

  const addElement = () => {
    var newArray = [
      ...timerData,
      { inputText: 0, counterObject: SecondsToHms(0), counterStatus: 'START' },
    ];
    setTimerData(newArray);
  };

  const counterObjectSet = (item, index) => {
    var counterArray = [...timerData];
    counterArray[index] = { ...counterArray[index], inputText: secondsText };
    counterArray[index] = {
      ...counterArray[index],
      counterObject: SecondsToHms(parseInt(secondsText)),
    };
    setTimerData(counterArray);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.cardView}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeSeconds}
          onEndEditing={() => counterObjectSet(item, index)}
          placeholder="Enter Seconds"
          keyboardType="numeric"
        />
        <View style={styles.rowView}>
          <View style={styles.circleView}>
            <Text style={styles.textputStyle}>
              {(item.counterObject.h <= 9
                ? '0' + item.counterObject.h
                : item.counterObject.h) +
                ':' +
                (item.counterObject.m <= 9
                  ? '0' + item.counterObject.m
                  : item.counterObject.m) +
                ':' +
                (item.counterObject.s <= 9
                  ? '0' + item.counterObject.s
                  : item.counterObject.s)}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              flex: 0.4,
              alignSelf: 'center',
              backgroundColor:
                item.counterStatus == 'START' ? 'green' : 'rgba(231,76,60,1)',
              marginTop: 20,
              marginLeft: 10,
              borderRadius: 10,
              padding: 10,
            }}
            onPress={() => startPushToggle(item, index)}>
            <Text style={{ color: '#ffffff', textAlign: 'center' }}>
              {item.counterStatus}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={timerData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={timerData}
      />

      <View style={{width:"40%",borderRadius: 5,height:40,justifyContent:"center",marginBottom:20,marginLeft:20,backgroundColor:"#eb3f05"}}>
        <TouchableOpacity onPress={() => addElement()}>
          <Text style={{textAlign:"center"}}>Add Timer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  cardView: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderColor: 'grey',
    borderRadius: 10,
  },
  textputStyle: {
    fontSize: 24,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  circleView: {
    flex: 0.6,
    marginTop: 20,
    marginLeft: 5,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 5,
    borderRadius: 10,
    borderColor: 'rgba(231,76,60,1)',
    borderWidth: 1,
  },
  rowView: {
    flexDirection: 'row',
    flex: 1,
  },
});
