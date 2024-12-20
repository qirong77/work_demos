import { commands } from "./registerCommond";

import chalk from "chalk";
import { spawn, spawnSync } from "child_process";
// 持续的命令,例如npm run dev
export function execCommand(command = "") {
  console.log(chalk.yellow("执行命令: " + command));
  const childProcess = spawn(command, [], { shell: true, stdio: "inherit" });
  childProcess.on("exit", (code) => {
    if (code !== 0) {
      console.error(chalk.red(`Command "${command}" exited with non-zero exit code ${code}`));
    }
  });
}
// !!!!!注意!SpawSync似乎无法捕获错误,使用execSync
export function execCommandSync(command = "") {
  console.log(chalk.yellow("执行命令: " + command));
  try {
    spawnSync(command, [], { shell: true, stdio: "inherit" });
  } catch (error) {
    console.error(chalk.red(`执行命令出错: Command "${command}"`));
    throw new Error("出错!");
  }
}

