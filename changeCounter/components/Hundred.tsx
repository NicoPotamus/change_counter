import Denomination from "@/app/model/denomination";
import { Alert } from "react-native";

type HundredProps = {
  denomination: Denomination;

};
export function Hundred(denomination: Denomination) {
    const addhundred = (denomination : Denomination) => {
        let workingSet : Denomination = denomination;
    
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

      const removehundred = (denomination : Denomination) => {
        let workingSet : Denomination = denomination;
        if (workingSet.hundreds >= 1){
            workingSet.hundreds -= 1;
            workingSet.fifties += 2;
        }
        else {
            Alert.alert("Not enough money", "No hundreds to remove");
        }
        return workingSet;
      }


}