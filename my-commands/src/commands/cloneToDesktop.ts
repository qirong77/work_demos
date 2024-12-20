
import { registerCommand } from "../common/registerCommond";
import {  runExecSync } from "../common/getExecString";
import { logError } from "../common/log";
registerCommand({
  id: "cd",
  desc: '从github克隆到桌面',
  hadler: () => {
    const url = process.argv[3];
    if (!url) {
      logError("请输入克隆的url");
      return;
    }
    runExecSync(`cd ~/Desktop && git clone ${url}`);
  },
});
