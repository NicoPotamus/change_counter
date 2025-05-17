import Denomination from '@/app/model/denomination';
import { addValue } from '@/app/model/adjustDenominations';
import { Alert, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type FiftyProps = {
  denomination: Denomination;
  setDenomination: (d: Denomination) => void;
};

export function Fifty({ denomination, setDenomination }: FiftyProps) {
  const addFifty = () => {
    const result = addValue(50, denomination);
    if (!result) {
      Alert.alert('Invalid Mix', "Can't make a fifty from current bill mix");
      return;
    }
    setDenomination(result);
  };

  const removeFifty = () => {
    let workingSet: Denomination = { ...denomination };
    if (workingSet.fifties >= 1) {
      workingSet.fifties -= 1;
      workingSet.twenties += 2;
      workingSet.tens += 1;
      setDenomination(workingSet);
    } else {
      Alert.alert('Not enough money', 'No fifties to remove');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={addFifty}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <View style={styles.valueBox}>
        <Text style={styles.valueText}>{denomination.fifties}</Text>
        <Text style={styles.labelText}>50</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={removeFifty}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
    justifyContent: 'center',
    minWidth: 160,
    elevation: 2,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  valueBox: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  valueText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  labelText: {
    fontSize: 16,
    color: '#888',
  },
});
