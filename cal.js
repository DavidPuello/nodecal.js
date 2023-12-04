const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());

// Mean route
app.post('/mean', (req, res) => {
  try {
    const nums = parseNumbers(req.body.nums);
    const mean = calculateMean(nums);
    res.json({ operation: 'mean', value: mean });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Median route
app.post('/median', (req, res) => {
  try {
    const nums = parseNumbers(req.body.nums);
    const median = calculateMedian(nums);
    res.json({ operation: 'median', value: median });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Mode route
app.post('/mode', (req, res) => {
  try {
    const nums = parseNumbers(req.body.nums);
    const mode = calculateMode(nums);
    res.json({ operation: 'mode', value: mode });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

function parseNumbers(numsString) {
  if (!numsString) {
    throw new Error('nums are required');
  }

  const nums = numsString.split(',').map(num => {
    const parsedNum = parseFloat(num);
    if (isNaN(parsedNum)) {
      throw new Error(`${num} is not a number`);
    }
    return parsedNum;
  });

  return nums;
}

function calculateMean(nums) {
  const sum = nums.reduce((acc, num) => acc + num, 0);
  return sum / nums.length;
}

function calculateMedian(nums) {
  const sortedNums = nums.sort((a, b) => a - b);
  const middle = Math.floor(sortedNums.length / 2);

  if (sortedNums.length % 2 === 0) {
    return (sortedNums[middle - 1] + sortedNums[middle]) / 2;
  } else {
    return sortedNums[middle];
  }
}

function calculateMode(nums) {
  const frequencyMap = new Map();

  nums.forEach(num => {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  });

  let maxFrequency = 0;
  let mode = [];

  frequencyMap.forEach((frequency, num) => {
    if (frequency > maxFrequency) {
      maxFrequency = frequency;
      mode = [num];
    } else if (frequency === maxFrequency) {
      mode.push(num);
    }
  });

  return mode;
}

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
