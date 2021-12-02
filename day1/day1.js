#!javascript

const { O_DIRECTORY } = require("constants");
const fs = require("fs");

const path = "day1/input.txt";

fs.readFile(path, 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    var data = data.toString().split("\n")
    console.log(data)
    console.log(data.length)

    let increaseCount = 0

    console.log(typeof data);

    for (let index = 0; index < data.length; index++) {
        let current = Number(data[index]);
        let prev = Number(data[index-1]);
        if (index === 0) {
            continue;
        }

        let increase = current > prev;
        if ( increase ) {
            increaseCount++
        }

        console.log(index, current, prev, increase, increaseCount);

    }
    

    console.log(increaseCount);
  })

console.log("Hello world");
