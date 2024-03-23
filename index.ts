import chalk from "chalk";
import inquirer from "inquirer";

const apiLink =
  "https://opentdb.com/api.php?amount=5&category=23&difficulty=easy&type=multiple";

let fetchData = async (data: string) => {
  let fetchQuiz: any = await fetch(data);
  let res = await fetchQuiz.json();
  return res.results;
};
let data = await fetchData(apiLink);

let startQuiz = async () => {
  let score: number = 0;
  let name = await inquirer.prompt({
    type: "input",
    name: "fname",
    message: "what is your name?",
  });
  for (let i = 0; i < 5; i++) {
    let answers = [...data[i].incorrect_answers, data[i].correct_answer];

    let ans = await inquirer.prompt({
      type: "list",
      name: "quiz",
      message: data[i].question,
      choices: answers.map((val: any) => val),
    });
    if (ans.quiz == data[i].correct_answer) {
      ++score;
      console.log(chalk.bold.italic.blue("correct"));
    } else if (ans.quiz != data[i].correct_answer) {
      console.log(
        `correct answer is ${chalk.bold.italic.red(data[i].correct_answer)}`
      );
    }
  }
  console.log(
    `Dear ${chalk.green.bold(name.fname)} your score is ${chalk.red.bold(
      score
    )} out of ${chalk.red.bold("5")}`
  );
};
startQuiz();
