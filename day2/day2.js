#!javascript

const fs = require("fs")
const lodash = require("lodash")

const path = "day2/input.txt"

fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
      }

    data = data.toString().split("\n");
    data.forEach((value, index) => {
        let d = value.split(" ");
        data[index] = {
            'direction' : d[0],
            'value' : Number(d[1])
        }
    })


    // Part 1
    let horizontal = 0;
    let depth = 0;

    data.forEach((record) => {

        console.log(record);
        switch (record.direction) {
            case 'forward':
                horizontal += record.value;
                break;
            case 'down':
                depth = depth + record.value;
                break;
            case 'up':
                depth = depth - record.value;
              break;
            default:
              console.log(`Invalid direction`);
        }

        console.log(horizontal, depth);
    })

    // Part 2

    let aim = 0;
    horizontal = 0;
    depth = 0;

    data.forEach((record, index) => {
        console.log(record)
        switch(record.direction) {
            case 'forward':
                horizontal = horizontal + record.value;
                depth = depth + (aim * record.value);
            break;
            case 'down':
                aim = aim + record.value;
            break;
            case 'up':
                aim = aim - record.value;
            break;
        }
    })

    console.log(horizontal, depth, horizontal * depth);
})