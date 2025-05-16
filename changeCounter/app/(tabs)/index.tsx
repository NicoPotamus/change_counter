import { Image } from 'expo-image';
import { Platform, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { useState, useEffect } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import type Denomination from '../model/denomination'; 



export default function HomeScreen() {

  const [bill, setBill] = useState(0);
  const [cashGiven, setCashGiven] = useState(0);

  const [denominations, setDenominations] = useState({
    hundreds: 0,
    fifties: 0,
    twenties: 0,
    tens: 0,
    fives: 0,
    ones: 0,
    quarters: 0,
    dimes: 0,
    nickels: 0,
    pennies: 0
  });

    const calculateDenominations = (valueDifference: number) => {

      let workingValue = valueDifference;

      const hundreds = Math.floor(workingValue / 100);
      workingValue -= hundreds * 100;

      const fifties = Math.floor(workingValue / 50);
      workingValue -= fifties * 50;

      const twenties = Math.floor(workingValue / 20);
      workingValue -= twenties * 20;

      const tens = Math.floor(workingValue / 10);
      workingValue -= tens * 10;

      const fives = Math.floor(workingValue / 5);
      workingValue -= fives * 5;

      const ones = Math.floor(workingValue / 1);
      workingValue -= ones * 1;

      const quarters = Math.floor(workingValue / 0.25);
      workingValue -= quarters * 0.25;

      const dimes = Math.floor(workingValue / 0.1);
      workingValue -= dimes * 0.1;

      const nickels = Math.floor(workingValue / 0.05);
      workingValue -= nickels * 0.05;

      const pennies = Math.floor(workingValue / 0.01);
      workingValue -= pennies * 0.01;

      return {
        hundreds,
        fifties,
        twenties,
        tens,
        fives,
        ones,
        quarters,
        dimes,
        nickels,
        pennies
      }
  };

  const addhundred = (denomination : Denomination) => {
    var workingSet : Denomination = denomination;

    if (workingSet.fifties >= 2){
      workingSet.fifties -= 2;
      workingSet.hundreds += 1;
    }
    else if (workingSet.twenties >= 5){
      workingSet.twenties -= 5;
      workingSet.hundreds += 1;
    }
    else if (workingSet.tens >= 10){
      workingSet.tens -= 10;
      workingSet.hundreds += 1;
    }
    else if (workingSet.fives >= 20){
      workingSet.fives -= 20;
      workingSet.hundreds += 1;
    }
    else if (workingSet.ones >= 100){
      workingSet.ones -= 100;
      workingSet.hundreds += 1;
    }
    else {
      //TODO: Add a message to the user that they don't have enough money to add a hundred
      Alert.alert("Not enough money", "You don't have enough money to add a hundred");
    }
    return workingSet;
  }

  return {}

}
