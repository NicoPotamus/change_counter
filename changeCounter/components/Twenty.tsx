import Denomination from '@/app/model/denomination';
import { addValue } from '@/app/model/adjustDenominations';
import { Alert, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type TwentyProps = {
  denomination: Denomination;
  setDenomination: (d: Denomination) => void;
};

export function Twenty({ denomination, setDenomination }: TwentyProps) {
  const addTwenty = () => {
    const result = addValue(20, denomination);
    if (!result) {
      Alert.alert('Invalid Mix', "Can't make a twenty from current bill mix");
      return;
    }
    setDenomination(result);
  };

  const removeTwenty = () => {
    let workingSet: Denomination = { ...denomination };
    if (workingSet.twenties >= 1) {
      workingSet.twenties -= 1;
      workingSet.tens += 2;
      setDenomination(workingSet);
    } else {
      Alert.alert('Not enough money', 'No twenties to remove');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={addTwenty}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <View style={styles.valueBox}>
        <Text style={styles.valueText}>{denomination.twenties}</Text>
        <Text style={styles.labelText}>20</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={removeTwenty}>
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
    backgroundColor: '#4CAF50',
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
