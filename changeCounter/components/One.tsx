import Denomination from '@/app/model/denomination';
import { addValue } from '@/app/model/adjustDenominations';
import { Alert, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type OneProps = {
  denomination: Denomination;
  setDenomination: (d: Denomination) => void;
};

export function One({ denomination, setDenomination }: OneProps) {
  const addOne = () => {
    const result = addValue(1, denomination);
    if (!result) {
      Alert.alert('Invalid Mix', "Can't make a dollar from current coin mix");
      return;
    }
    setDenomination(result);
  };

  const removeOne = () => {
    let workingSet: Denomination = { ...denomination };
    if (workingSet.ones >= 1) {
      workingSet.ones -= 1;
      workingSet.quarters += 4;
      setDenomination(workingSet);
    } else {
      Alert.alert('Not enough money', 'No ones to remove');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={addOne}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <View style={styles.valueBox}>
        <Text style={styles.valueText}>{denomination.ones}</Text>
        <Text style={styles.labelText}>$1</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={removeOne}>
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
    backgroundColor: '#607D8B',
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
