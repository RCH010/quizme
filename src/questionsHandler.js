import inquirer from 'inquirer';
import { readData, writeData } from './files.js';

import {fileURLToPath} from 'url'
import {dirname, join} from 'path'

// fileURLToPath(import.meta.url) --> __filename
const __dirname = dirname(fileURLToPath(import.meta.url))
const dataPath = join(__dirname, 'data.json')


export async function askQuestions() {
  const parsedData = await readData(dataPath);

  const target = parsedData[Math.floor(Math.random() * parsedData.length)]
  const {question, answer} = target

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'useranswer',
      message: question,
    }
  ])

  target.lastAnsweredCorrect = checkAnswer(answers.useranswer, answer)
  target.lastAsked = Date.now().toString();

  const newData = parsedData.filter(item => item.id !== target.id);
  newData.push(target)
  await writeData(dataPath, newData)
}

// This approach could have some big mistakes like capitalization, punctuation
// and so on... so, we will offload this job to the user
// ---------
// function checkAnswer(input, answer) {
//   if(input === answer) {
//     console.log('You got it right');
//     return true
//   } else {
//     console.log('Not this time');
//     return false
//   }
// }

async function checkAnswer(input, answer) {
  console.log('Your answer  ==> ', answer);
  console.log('The response ==> ', input);

  const { check } = await inquirer.prompt([
    {
      message: 'Did you get it right?',
      type: 'confirm',
      name: 'check'
    }
  ])

  return check;
}


export async function addQuestion() {
  // Start Dialogue
  console.log(`Hello, let's add a new question!`);
  // Ask me for a question
  // Ask me for the answer
  const responses = await inquirer.prompt([
    {type: 'input', name: 'targetQuestion', message: 'What is your question?'},
    {type: 'input', name: 'targetAnswer', message: 'What is your answer?'},
  ])

  // Store for future uses
  const data = await readData(dataPath);
  data.push({
    id: Date.now(),
    question: responses.targetQuestion,
    answer: responses.targetAnswer,
  })
  await writeData(dataPath, data)
}
