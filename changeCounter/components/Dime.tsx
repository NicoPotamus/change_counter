import Denomination from '@/app/model/denomination';
import { addValue } from '@/app/model/adjustDenominations';
import { Alert, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

type DimeProps = {
  denomination: Denomination;
  setDenomination: (d: Denomination) => void;
};

export function Dime({ denomination, setDenomination }: DimeProps) {
  const addDime = () => {
    const result = addValue(0.1, denomination);
    if (!result) {
      Alert.alert('Invalid Mix', "Can't make a dime from current coin mix");
      return;
    }
    setDenomination(result);
  };

  const removeDime = () => {
    let workingSet: Denomination = { ...denomination };
    if (workingSet.dimes >= 1) {
      workingSet.dimes -= 1;
      workingSet.nickels += 2;
      setDenomination(workingSet);
    } else {
      Alert.alert('Not enough money', 'No dimes to remove');
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/denominations/dime.png')}
        style={styles.coinImage}
      />
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.button} onPress={addDime}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <View style={styles.valueBox}>
          <Text style={styles.valueText}>{denomination.dimes}</Text>
          <Text style={styles.labelText}>10¢</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={removeDime}>
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
    width: 35,
    height: 35,
    marginRight: 10,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#9E9E9E',
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
