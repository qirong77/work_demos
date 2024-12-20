import chalk from "chalk";
import { execSync } from "child_process";
import { logInfo } from "./log";

export function getExecString(command = "") {
  try {
    return execSync(command).toString();
  } catch(error) {
    console.log(chalk.red("执行命令出错: ", command,'\n', error));
    throw new Error(chalk.red("执行命令出错: ", command));
  }
}

export function runExecSync(s='') {
  logInfo('执行命令: ' + s)
  execSync(s)
}
