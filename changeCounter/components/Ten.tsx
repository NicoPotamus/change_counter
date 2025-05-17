import Denomination from '@/app/model/denomination';
import { addValue } from '@/app/model/adjustDenominations';
import { Alert, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type TenProps = {
  denomination: Denomination;
  setDenomination: (d: Denomination) => void;
};

export function Ten({ denomination, setDenomination }: TenProps) {
  const addTen = () => {
    const result = addValue(10, denomination);
    if (!result) {
      Alert.alert('Invalid Mix', "Can't make a ten from current bill mix");
      return;
    }
    setDenomination(result);
  };

  const removeTen = () => {
    let workingSet: Denomination = { ...denomination };
    if (workingSet.tens >= 1) {
      workingSet.tens -= 1;
      workingSet.fives += 2;
      setDenomination(workingSet);
    } else {
      Alert.alert('Not enough money', 'No tens to remove');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={addTen}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <View style={styles.valueBox}>
        <Text style={styles.valueText}>{denomination.tens}</Text>
        <Text style={styles.labelText}>10</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={removeTen}>
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
    backgroundColor: '#9C27B0',
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
