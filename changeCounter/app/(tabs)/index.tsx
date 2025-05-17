import { Image } from 'expo-image';
import { Platform, StyleSheet, TextInput, ScrollView, Alert, Pressable } from 'react-native';
import { useState } from 'react';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Hundred } from '@/components/Hundred';
import { Fifty } from '@/components/Fifty';
import { Twenty } from '@/components/Twenty';
import { Ten } from '@/components/Ten';
import { Five } from '@/components/Five';
import { One } from '@/components/One';
import { Quarter } from '@/components/Quarter';
import { Dime } from '@/components/Dime';
import { Nickel } from '@/components/Nickel';
import { Penny } from '@/components/Penny';
import type Denomination from '../model/denomination';

export default function HomeScreen() {
  const [billText, setBillText] = useState('');
  const [cashText, setCashText] = useState('');
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
    pennies: 0,
    total: 0,
  });

  const calculateDenominations = (valueDifference: number) => {
    // Convert to cents to avoid floating point precision issues
    let workingValue = Math.round(valueDifference * 100);

    const hundreds = Math.floor(workingValue / 10000);
    workingValue -= hundreds * 10000;

    const fifties = Math.floor(workingValue / 5000);
    workingValue -= fifties * 5000;

    const twenties = Math.floor(workingValue / 2000);
    workingValue -= twenties * 2000;

    const tens = Math.floor(workingValue / 1000);
    workingValue -= tens * 1000;

    const fives = Math.floor(workingValue / 500);
    workingValue -= fives * 500;

    const ones = Math.floor(workingValue / 100);
    workingValue -= ones * 100;

    const quarters = Math.floor(workingValue / 25);
    workingValue -= quarters * 25;

    const dimes = Math.floor(workingValue / 10);
    workingValue -= dimes * 10;

    const nickels = Math.floor(workingValue / 5);
    workingValue -= nickels * 5;

    const pennies = Math.floor(workingValue / 1);
    workingValue -= pennies * 1;

    // Calculate total in cents and convert back to dollars
    const totalCents = (hundreds * 10000) +
                      (fifties * 5000) +
                      (twenties * 2000) +
                      (tens * 1000) +
                      (fives * 500) +
                      (ones * 100) +
                      (quarters * 25) +
                      (dimes * 10) +
                      (nickels * 5) +
                      (pennies * 1);
    const total = totalCents / 100;

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
      pennies,
      total: Number(total.toFixed(2)), // Round to 2 decimal places to avoid floating point issues
    };
  };

  const handleBillChange = (text: string) => {
    // Remove any non-numeric characters except decimal point
    const cleanedText = text.replace(/[^0-9.]/g, '');
    // Ensure only one decimal point
    const parts = cleanedText.split('.');
    const validText = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : cleanedText;
    
    if (Number(validText) >= 0) {
      setBillText(validText);
    }
  };

  const handleCashChange = (text: string) => {
    // Remove any non-numeric characters except decimal point
    const cleanedText = text.replace(/[^0-9.]/g, '');
    // Ensure only one decimal point
    const parts = cleanedText.split('.');
    const validText = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : cleanedText;
    
    if (Number(validText) >= 0) {
      setCashText(validText);
    }
  };

  const handleCalculate = () => {
    const cash = Number(cashText) || 0;
    const bill = Number(billText) || 0;

    if (cash < bill) {
      Alert.alert('Invalid Input', 'Cash amount must be greater than bill amount');
      return;
    }

    const change = cash - bill;
    setDenominations(calculateDenominations(change));
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/denominations/logo.png')}
          style={{ height: 200, width: 300, bottom: 0 , marginLeft:65, position: 'absolute' }}
        />
      }
    >
      <ThemedView style={{ padding: 16 }}>
        <ThemedText style={styles.title}>Change Counter</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Bill Amount"
          keyboardType="decimal-pad"
          value={billText}
          onChangeText={handleBillChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Cash Given"
          keyboardType="decimal-pad"
          value={cashText}
          onChangeText={handleCashChange}
        />
        <Pressable 
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.7 : 1 }
          ]} 
          onPress={handleCalculate}
        >
          <ThemedText style={styles.buttonText}>Calculate Change</ThemedText>
        </Pressable>
        <ThemedText style={styles.changeText}>
          Change Due: ${((Number(cashText) || 0) - (Number(billText) || 0)).toFixed(2)}
        </ThemedText>
        <ScrollView>
          <Hundred denomination={denominations} setDenomination={setDenominations} />
          <Fifty denomination={denominations} setDenomination={setDenominations} />
          <Twenty denomination={denominations} setDenomination={setDenominations} />
          <Ten denomination={denominations} setDenomination={setDenominations} />
          <Five denomination={denominations} setDenomination={setDenominations} />
          <One denomination={denominations} setDenomination={setDenominations} />
          <Quarter denomination={denominations} setDenomination={setDenominations} />
          <Dime denomination={denominations} setDenomination={setDenominations} />
          <Nickel denomination={denominations} setDenomination={setDenominations} />
          <Penny denomination={denominations} setDenomination={setDenominations} />
        </ScrollView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  changeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
