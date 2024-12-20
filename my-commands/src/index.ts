#!/usr/bin/env node
import chalk from 'chalk';
import './commands/index'
import { commands } from "./common/registerCommond";

const key = process.argv[2];
if (commands.has(key)) {
  const command = commands.get(key);
  command.hadler();
} else {
  commands.forEach((com) => {
    console.log(`${chalk.red(com.id)}: ${chalk.green(com.desc)}`);
  });
}
