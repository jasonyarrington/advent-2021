#!javascript

const fs = require("fs")
const lodash = require("lodash")

var myArgs = process.argv.slice(2);

console.log(myArgs);

const path = myArgs == 'prod' ? "day3/input.txt" : "day3/example.txt"

fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
      }

    data = data.toString().split("\n");
    // console.log(data);

    let { gamma, epsilon } = fuelConsumption(data)
    console.log("g", gamma, epsilon)
    lifeSupportRating(data, gamma, epsilon)
})

const fuelConsumption = (data) => {

    let gamma = '';
    let epsilon = '';

    let dataLength = data.length;
    let bitsLength = data[0].length;

    let reducedData = [];

    // Foreach bit
    for (let bitIndex = 0; bitIndex < bitsLength; bitIndex++) {
        let gammaCount = data.reduce((gamma, b, index) => {
            let reading = Number(b[bitIndex]);
            // console.log(gamma, b, index, bitIndex, b[bitIndex]);
            return gamma + reading;
        }, 0)
        console.log(gammaCount);

        // If gamma count greater than half of total count
        gamma += gammaCount / dataLength > .5 ? String(1) : String(0)
        epsilon += gammaCount / dataLength < .5 ? String(1) : String(0)
    }

    console.log(gamma, epsilon);
    console.log(bitCalc(gamma), bitCalc(epsilon), bitCalc(gamma) * bitCalc(epsilon));
    console.log('Fuel consumption rating: ', bitCalc(gamma) * bitCalc(epsilon))

    return {
        gamma: gamma,
        epsilon: epsilon
    }
}

const lifeSupportRating = (data) => {

    let lifeSupport = 0;
    console.log('Life support rating: ', lifeSupport);
}

const commonBit = (data, index) => {

    let dataLength = data.length;
    let bitsLength = data[0].length;

    // Find most common value in the bit index, and reduce to that
    // Foreach bit
    for (let bitIndex = 0; bitIndex < bitsLength; bitIndex++) {
        let gammaCount = data.reduce((gamma, b, index) => {
            let reading = Number(b[bitIndex]);
            // console.log(gamma, b, index, bitIndex, b[bitIndex]);
            return gamma + reading;
        }, 0)
        console.log(gammaCount);

        // If gamma count greater than half of total count
        gamma += gammaCount / dataLength > .5 ? String(1) : String(0)
        epsilon += gammaCount / dataLength < .5 ? String(1) : String(0)
    }

    return { gamma, epsilon }

}

const bitCalc = (bit) => {

    let total = 0;
    let bitRate = 1;
    for (i = bit.length - 1; i >= 0; i--) {
        console.log(i)
        total += Number(bit[i]) * bitRate;
        bitRate = bitRate * 2;
    }

    return total
}