import Denomination from './denomination';

function calculateTotal(workingSet: Denomination) {
  // Calculate total in cents to avoid floating point precision issues
  let mixCents = 0;
  if (workingSet.hundreds > 0) {
    mixCents += workingSet.hundreds * 10000;
  }
  if (workingSet.fifties > 0) {
    mixCents += workingSet.fifties * 5000;
  }
  if (workingSet.twenties > 0) {
    mixCents += workingSet.twenties * 2000;
  }
  if (workingSet.tens > 0) {
    mixCents += workingSet.tens * 1000;
  }
  if (workingSet.fives > 0) {
    mixCents += workingSet.fives * 500;
  }
  if (workingSet.ones > 0) {
    mixCents += workingSet.ones * 100;
  }
  if (workingSet.quarters > 0) {
    mixCents += workingSet.quarters * 25;
  }
  if (workingSet.dimes > 0) {
    mixCents += workingSet.dimes * 10;
  }
  if (workingSet.nickels > 0) {
    mixCents += workingSet.nickels * 5;
  }
  if (workingSet.pennies > 0) {
    mixCents += workingSet.pennies * 1;
  }
  // Convert cents back to dollars with 2 decimal places
  const mix = mixCents / 100;
  workingSet.total = mix;
  return mix;
}

function getDenominationAttributeString(target: number): string {
  switch (target) {
    case 100:
      return 'hundreds';
    case 50:
      return 'fifties';
    case 20:
      return 'twenties';
    case 10:
      return 'tens';
    case 5:
      return 'fives';
    case 1:
      return 'ones';
    case 0.25:
      return 'quarters';
    case 0.1:
      return 'dimes';
    case 0.05:
      return 'nickels';
    case 0.01:
      return 'pennies';
    default:
      console.error('Invalid target denomination');
      return '';
  }
  }

  function addValue(target: number, denomination: Denomination) {
    let workingSet: Denomination = { ...denomination };
    const targetBill = getDenominationAttributeString(target);
    const saveWorkingBill = workingSet[targetBill];
    workingSet[targetBill] = 0;
    let total = 0;
    while (100 <= (target - total) && total < target && workingSet.hundreds > 0) {
      workingSet.hundreds -= 1;
      total += 100;
    }
    while (50 <= (target - total) && total < target && workingSet.fifties > 0) {
      workingSet.fifties -= 1;
      total += 50;
    }
    while (20 <= (target - total) && total < target && workingSet.twenties > 0) {
      workingSet.twenties -= 1;
      total += 20;
    }
    while (10 <= (target - total) && total < target && workingSet.tens > 0) {
      workingSet.tens -= 1;
      total += 10;
    }
    while (5 <= (target - total) && total < target && workingSet.fives > 0) {
      workingSet.fives -= 1;
      total += 5;
    }
    while (1 <= (target - total) && total < target && workingSet.ones > 0) {
      workingSet.ones -= 1;
      total += 1;
    }
    while (0.25 <= (target - total) && total < target && workingSet.quarters > 0) {
      workingSet.quarters -= 1;
      total += 0.25;
    }
    while (0.1 <= (target - total) && total < target && workingSet.dimes > 0) {
      workingSet.dimes -= 1;
      total += 0.1;
    }
    while (0.05 <= (target - total) && total < target && workingSet.nickels > 0) {
      workingSet.nickels -= 1;
      total += 0.05;
    }
    while (0.01 <= (target - total) && total < target && workingSet.pennies > 0) {
      workingSet.pennies -= 1;
      total += 0.01;
    }
    workingSet[targetBill] = saveWorkingBill + 1;
    workingSet.total = calculateTotal(workingSet);

    if (workingSet.total != denomination.total) {
      console.log(workingSet.total, denomination.total);
      console.error('Invalid Mix', "Can't make a money piece from current bill mix");
      return ;
    }
    else {
      return workingSet;
    }
  }

export { calculateTotal, getDenominationAttributeString, addValue };



