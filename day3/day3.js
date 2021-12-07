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
    console.log(data)
    let o2reading = lifeSupportRating(data, 0, 'o2')
    let co2reading = lifeSupportRating(data, 0, 'co2')

    console.log('Readings', o2reading, co2reading, bitCalc(o2reading), bitCalc(co2reading), bitCalc(o2reading) * bitCalc(co2reading))

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

// O2reading - most often returned value
// COSreading -- least often returned reading

const lifeSupportRating = (data, bit = 0, readingType) => {

    let bits = data[0].length

    // iterate over bits

    let { gamma, epsilon } = bitCount(data, bit)

    let filter
    // default is 0 if they are equal
    switch (readingType) {
        // most common
        // default 1
        case 'o2':
            filter = epsilon > gamma ? '0' : '1'
        break;
        // least common
        // default 0
        case 'co2':
            filter = gamma < epsilon ? '1' : '0'
        break;
    }

    data = data.filter(record => record[bit] == filter)

    console.log('Life support rating: ', data);

    if (bit < bits && data.length > 1) {
        data = lifeSupportRating(data, bit + 1, readingType);
    }

    return typeof data == 'object' ? data[0] : data;
}

/**
 * 
 * @param {*} data  // array of data
 * @param {*} index  // most frequent bit
 * @returns 
 * 
 * returns distribution of bit count
 */
const bitCount = (data, bit) => {

    // Gamma = 1
    // Epsilon = 0

    // For each record, get the bit count
    let gamma = data.reduce((gamma, record) => {
        return gamma + Number(record[bit])
    }, 0)
    let epsilon = data.length - gamma
    console.log('gg', gamma, epsilon, data.length)
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