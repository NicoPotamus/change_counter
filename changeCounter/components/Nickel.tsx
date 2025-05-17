import Denomination from '@/app/model/denomination';
import { addValue } from '@/app/model/adjustDenominations';
import { Alert, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

type NickelProps = {
  denomination: Denomination;
  setDenomination: (d: Denomination) => void;
};

export function Nickel({ denomination, setDenomination }: NickelProps) {
  const addNickel = () => {
    const result = addValue(0.05, denomination);
    if (!result) {
      Alert.alert('Invalid Mix', "Can't make a nickel from current coin mix");
      return;
    }
    setDenomination(result);
  };

  const removeNickel = () => {
    let workingSet: Denomination = { ...denomination };
    if (workingSet.nickels >= 1) {
      workingSet.nickels -= 1;
      workingSet.pennies += 5;
      setDenomination(workingSet);
    } else {
      Alert.alert('Not enough money', 'No nickels to remove');
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/denominations/nickel.png')}
        style={styles.coinImage}
      />
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.button} onPress={addNickel}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <View style={styles.valueBox}>
          <Text style={styles.valueText}>{denomination.nickels}</Text>
          <Text style={styles.labelText}>5¢</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={removeNickel}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
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
    minWidth: 160,
    elevation: 2,
  },
  controlsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#8D6E63',
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
