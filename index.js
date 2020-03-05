const fs = require('fs');
const brain = require('brain.js');
const log = true;
const logPeriod = 10;
const iterations = 500;

const inputSection = '100';

console.log('Started');

// const net = new brain.NeuralNetwork(); 
const net = new brain.recurrent.LSTM();

// CSV First column is input (POS Section name) the rest are section names from criteria
const input = fs.readFileSync('sections.txt', 'utf8')
let lines = input.split('\n');
lines = lines.map(row => {
  row = row.split(',');
  const posSection = row.shift();
  // Normalize and sort sections
  const sections = row.map(section => section.toUpperCase().trim()).sort();
  return {
    input: posSection,
    output: sections.join(',')
  }
})
console.log('Train Input: ', lines);

net.train(lines, { log, logPeriod, iterations });

const output = net.run(inputSection);

console.log('Output: ', output);
