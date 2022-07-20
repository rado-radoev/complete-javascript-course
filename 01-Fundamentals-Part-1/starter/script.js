const markWeight1 = 78; //kg
const markWeight2 = 95; //kg

const markHeight1 = 169; //cm
const markHeight2 = 188; //cm

const johnWeight1 = 92; //kg
const johnWeight2 = 85; //kg

const johnHeight1 = 195; //cm
const johnHeight2 = 176; //cm

function convertCentimetersToMeters(cm) {
    return cm * 0.01;
}

function calculateBMI(height, weight) {
    const heightInMeters = convertCentimetersToMeters(height);

    const bmi = weight / (heightInMeters ** 2);
    return bmi;
}

const markBMI1 = calculateBMI(markHeight1, markWeight1);
const markBMI2 = calculateBMI(markHeight2, markWeight2);

const johnBMI1 = calculateBMI(johnHeight1, johnWeight1);
const johnBMI2 = calculateBMI(johnHeight2, johnWeight2);

const markHigherBMI1 = markBMI1 > johnBMI1;
const markHigherBMI2 = markBMI2 > johnBMI2;

console.log(`[Test Data 1]: Mark BMI (${markBMI1.toFixed(2)}) higher than John (${johnBMI1.toFixed(2)}): ${markHigherBMI1}`);
console.log(`[Test Data 1]: Mark BMI (${markBMI2.toFixed(2)}) higher than John (${johnBMI2.toFixed(2)}): ${markHigherBMI2}`);
