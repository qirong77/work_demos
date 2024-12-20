import { registerCommand } from "../common/registerCommond";
import { COMMOND_CONFIG } from "../config";
import { execCommand } from "../common/execCommond";
import chalk from "chalk";
import { runNode18 } from "../common/runNode18";
import { readFileSync } from "fs";
import { logInfo } from "../common/log";
registerCommand({
  id: "run",
  desc: "执行当前Vscode激活的窗口的tab文件",
  hadler: () => {
    const fs = readFileSync(COMMOND_CONFIG.vscodeWindowStatusFilePath,'utf-8');
    const activeTab = JSON.parse(fs).activeTab as string; 
    if(!activeTab) {
      logInfo('当前没有激活的tab');
      return;
    }
    console.log(chalk.green(`准备执行文件: ${activeTab}`))
    if(activeTab.endsWith('.ts')) {
      // 如果报错: npm i -g tsx
      runNode18(`npx tsx ${activeTab}`);
      return
    }
    if(['.js','.mjs','cjs'].some(e => activeTab.endsWith(e))) {
      execCommand(`node ${activeTab}`);
      return
    }
  },
});

// function getWindowFiles(vscodeStatus = "") {
//   /* 
// |  Window (test.mjs — draft)
// |  Window (kwai-code-editor)
// |  Window (run.ts — my-commands)
// |  Window (aapl-line-slider-transposed.ts — G2-5)
// |  Window (index.vue — kuaishou-frontend-idp)
//   */
//   const windows = vscodeStatus
//     .split("\n")
//     .filter((line) => line.startsWith("|  Window"))
//     .map((line) => {
//       const start = `|  Window (`.length;
//       const end = line.length;
//       const [file, folder] = line.slice(start, end).split(" — ");
//       return {
//         file,
//         folder,
//       };
//     });
//   return windows;
// }

