#! /usr/bin/env node
// Using a shebang/hashbang to execute this command
// And I made the index.js file executable (chmod +x index.js)

// I used the symbolic link to connect this file to the quizme keyword
// ln -s /Users/raulcastellanos/dev/otros/cli_tools_nodejs/index.js /usr/local/bin/quizme

import { addQuestion, askQuestions } from './src/questionsHandler.js';

const flags = [];

process.argv.forEach((arg) => {
  if (/^-/.test(arg)) {
    // If the argument starts with a dash (-)
    flags.push(arg.replace(/-/g, '')); // Remove all dashes
  }
});

if(flags.length > 0) {
  if (flags.includes('a') || flags.includes('add')) {
    addQuestion()
  } else {
    console.log('No valid flags where found.');
    console.log('use -a or --add to add a new question');
  }
} else {
  askQuestions()
}


