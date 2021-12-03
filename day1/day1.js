#!javascript

const { O_DIRECTORY } = require("constants");
const fs = require("fs");
const lodash = require('lodash');

const path = "day1/input.txt";

fs.readFile(path, 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    var data = data.toString().split("\n")
    data.forEach((value, index) => {
      data[index] = Number(value);
    })

    console.log(data)
    console.log(data.length)

    let increaseCount = 0

    // console.log(typeof data);

    // for (let index = 1; index < data.length; index++) {
    //     let current = data[index];
    //     let prev = data[index-1];

    //     let increase = current > prev;
    //     if ( increase ) {
    //         increaseCount++
    //     }
    //     console.log(index, current, prev, increase, increaseCount);

    // }
    
    // console.log(increaseCount);

    let increaseCountWindow = 0;
    let sampleWindow = 3;
    let offset = sampleWindow;

    const sumOffset = (data, start, end) => {
      console.log(start, end, data.slice(start, end))
      return lodash.sum(data.slice(start, end))
    }

    for (let index = sampleWindow; index < data.length; index++ ) {
      let currentEnd = index + 1;
      let prevEnd = index;
      let current = sumOffset(data, currentEnd - offset, currentEnd);
      let prev = sumOffset(data, prevEnd - offset, prevEnd);
      
      let increase = current > prev;
      if ( increase ) {
        increaseCountWindow++
      }
      console.log(index, current, prev, increase, increaseCountWindow);

      console.log(increaseCountWindow);
    }




  })

console.log("Hello world");
