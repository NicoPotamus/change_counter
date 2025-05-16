 import type { Denomination } from "./denominations";
 
 const addhundred = (denomination : Denomination) => {
    var workingSet : Denomination = denomination;

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