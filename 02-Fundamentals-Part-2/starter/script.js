const mark = {
    fullName: 'Mark Miller',
    weight: 78,
    height: 1.69,
    calcBMI: function () {
        this.bmi = this.weight / this.height ** 2;
        return this.bmi;
    }
};

const john = {
    fullName: 'John Smith',
    weight: 92,
    height: 1.95,
    calcBMI: function () {
        this.bmi = this.weight / this.height ** 2;
        return this.bmi;
    }
};

mark.calcBMI();
john.calcBMI();
console.log(mark.bmi)
console.log(john.bmi)