import chalk from "chalk";

export function logInfo(s = "") {
  console.log(chalk.blue(s));
}
export function logError(s = "") {
  console.log(chalk.red(s));
}
export function logSuccess(s = "") {
  console.log(chalk.green(s));
}
export function logWarn(s = "") {
  console.log(chalk.yellow(s));
}
