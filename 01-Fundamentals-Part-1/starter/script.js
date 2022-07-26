// Coding Challenge #3

const dolphinScoreAverage = (96 + 108 + 89) / 3;
const koalaScoreAverage = (88 + 91 + 110) / 3; 

if (dolphinScoreAverage > koalaScoreAverage) {
  console.log('Dolphins are winners');
} else if (dolphinScoreAverage === koalaScoreAverage) {
  console.log('It \'s a draw');
} else {
  console.log('The Koalas win');
}





// const markWeight1 = 78; //kg
// const markWeight2 = 95; //kg

// const markHeight1 = 169; //cm
// const markHeight2 = 188; //cm

// const johnWeight1 = 92; //kg
// const johnWeight2 = 85; //kg

// const johnHeight1 = 195; //cm
// const johnHeight2 = 176; //cm

// function convertCentimetersToMeters(cm) {
//   return cm * 0.01;
// }

// function calculateBMI(height, weight) {
//   const heightInMeters = convertCentimetersToMeters(height);

//   const bmi = weight / (heightInMeters ** 2);
//   return bmi;
// }

// const markBMI1 = calculateBMI(markHeight1, markWeight1);
// const markBMI2 = calculateBMI(markHeight2, markWeight2);

// const johnBMI1 = calculateBMI(johnHeight1, johnWeight1);
// const johnBMI2 = calculateBMI(johnHeight2, johnWeight2);

// const markHigherBMI1 = markBMI1 > johnBMI1;
// const markHigherBMI2 = markBMI2 > johnBMI2;

// console.log(`[Test Data 1]: Mark BMI (${markBMI1.toFixed(2)}) higher than John (${johnBMI1.toFixed(2)}): ${markHigherBMI1}`);
// console.log(`[Test Data 1]: Mark BMI (${markBMI2.toFixed(2)}) higher than John (${johnBMI2.toFixed(2)}): ${markHigherBMI2}`);


// if (markBMI1 > johnBMI1) {
//   console.log(`[Test Data 1]: Mark BMI (${markBMI1.toFixed(2)}) higher than John (${johnBMI1.toFixed(2)})`);
// } else {
//   console.log(`[Test Data 1]: John's BMI (${johnBMI1.toFixed(2)}) higher than John (${markBMI1.toFixed(2)})`);
// }

// if (markBMI2 > johnBMI2) {
//   console.log(`[Test Data 1]: Mark BMI (${markBMI2.toFixed(2)}) higher than John (${johnBMI2.toFixed(2)})`);
// } else {
//   console.log(`[Test Data 1]: John's BMI (${johnBMI2.toFixed(2)}) higher than John (${markBMI2.toFixed(2)})`);
// }