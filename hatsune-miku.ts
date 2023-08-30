import {promisify} from 'util';
import * as process from 'node:process';
import * as brain from 'brain.js';
import { open } from 'node:fs/promises';
import { LSTM } from 'brain.js/dist/recurrent/lstm';

// read hatsune miku lyrics
async function loadTrainingData(cb: (err?:string, value?:string[]) => void) {
    const trainingData: string[] = [];
    const file = await open('./corpus/hatsune-miku/lyrics/hatsune-miku-lyrics.txt');
    for await (const line of file.readLines()) {
        trainingData.push(line);
    }
    cb(undefined, trainingData);
}

// train the model
function train(lstm: LSTM, trainingData:string[]) {
  const result = lstm.train(trainingData, {
    iterations: 20, // this is a maximum
    log: (details: string) => console.log(details),
    errorThresh: 0.011,
  });

  console.log('Training result: ', result);
}

// run the model
function run(lstm: LSTM) {
  const run1: string = lstm.run('What');
  const run2: string = lstm.run('One');
  const run3: string = lstm.run('You');
  const run4: string = lstm.run('I');
  const run5: string = lstm.run('Wish');

  console.log(`run 1: What ${run1}`);
  console.log(`run 2: One ${run2}`);
  console.log(`run 3: You ${run3}`);
  console.log(`run 4: I ${run4}`);
  console.log(`run 5: Wish ${run5}`);
}

async function main() {
  const trainingData = await promisify(loadTrainingData)();
  if (trainingData!.length === undefined) {
    console.error("no training data...");
    process.exit(1);
  }
  const lstm = new brain.recurrent.LSTM();
  train(lstm, trainingData!);
  run(lstm);
}

main();