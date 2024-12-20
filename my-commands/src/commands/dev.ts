import { registerCommand } from "../common/registerCommond";
import {  readFileSync } from "fs";
import { execCommand } from "../common/execCommond";
import chalk from "chalk";
registerCommand({
  id: "dev",
  desc: "执行npm run dev",
  // 后续可以使用npm路径替代
  hadler: () => {
    const currentPath = process.cwd();
    const packageJson = readFileSync("./package.json", "utf-8");
    const { scripts } = JSON.parse(packageJson);
    const commands = ['dev','serve','start'];
    const command = commands.find((command) => scripts[command])
    if(command) {
      execCommand(`npm --prefix ${currentPath} run ${command}`);
      // execCommand(`npm run ${command}`);
      return
    }
    chalk.red("未找到dev命令,请检查package.json文件");
    // execCommand(`. ~/.nvm/nvm.sh  && nvm use ${nodeVersion} && npm run dev`);
  },
});
