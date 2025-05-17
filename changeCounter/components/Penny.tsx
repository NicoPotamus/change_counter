import Denomination from '@/app/model/denomination';
import { addValue } from '@/app/model/adjustDenominations';
import { Alert, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

type PennyProps = {
  denomination: Denomination;
  setDenomination: (d: Denomination) => void;
};

export function Penny({ denomination, setDenomination }: PennyProps) {
  const addPenny = () => {
    const result = addValue(0.01, denomination);
    if (!result) {
      Alert.alert('Invalid Mix', "Can't make a penny from current coin mix");
      return;
    }
    setDenomination(result);
  };


  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/denominations/Penny.png')}
        style={styles.coinImage}
      />
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.button} onPress={addPenny}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <View style={styles.valueBox}>
          <Text style={styles.valueText}>{denomination.pennies}</Text>
          <Text style={styles.labelText}>1¢</Text>
        </View>
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
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#B98383',
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
