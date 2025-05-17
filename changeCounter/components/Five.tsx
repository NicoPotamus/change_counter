import Denomination from '@/app/model/denomination';
import { addValue } from '@/app/model/adjustDenominations';
import { Alert, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type FiveProps = {
  denomination: Denomination;
  setDenomination: (d: Denomination) => void;
};

export function Five({ denomination, setDenomination }: FiveProps) {
  const addFive = () => {
    const result = addValue(5, denomination);
    if (!result) {
      Alert.alert('Invalid Mix', "Can't make a five from current bill mix");
      return;
    }
    setDenomination(result);
  };

  const removeFive = () => {
    let workingSet: Denomination = { ...denomination };
    if (workingSet.fives >= 1) {
      workingSet.fives -= 1;
      workingSet.ones += 5;
      setDenomination(workingSet);
    } else {
      Alert.alert('Not enough money', 'No fives to remove');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={addFive}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <View style={styles.valueBox}>
        <Text style={styles.valueText}>{denomination.fives}</Text>
        <Text style={styles.labelText}>5</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={removeFive}>
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
    backgroundColor: '#FF5722',
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
