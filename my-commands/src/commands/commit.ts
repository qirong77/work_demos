import chalk from "chalk";
import { registerCommand } from "../common/registerCommond";
import { getExecString, runExecSync } from "../common/getExecString";
import inquirer from "inquirer";
import { logError } from "../common/log";
registerCommand({
  id: "cm",
  desc: "执行git提交,qr commit 信息",
  hadler: () => {
    let commitMessage = process.argv[3];

    if (!commitMessage) {
      const questions = [
        {
          type: "list",
          name: "action",
          message: "请选择一个操作：",
          choices: [
            "init: 初始化项目",
            "feat: 功能开发",
            "fix: 解决bug",
            "refactor: 重构代码",
            "merge : 解决冲突",
            "release: 发布",
            "test: 增加测试用例",
            "docs: 修改文档",
            "chore: 构建过程或辅助工具的变动",
            "perf: 性能优化",
          ],
        },
      ];
      inquirer.prompt(questions).then((answers) => {
        commitMessage = answers.action;
        runGitAddAllAndCommit();
      });
      return;
    }
    runGitAddAllAndCommit();
    function runGitAddAllAndCommit() {
      const hasConflict = getExecString("git diff --name-only --diff-filter=U");
      if (hasConflict) {
        logError("出现冲突: " + hasConflict);
        return;
      }
      runExecSync(`git add . && git commit -m "${commitMessage}"`);
      runExecSync('git push')
    }
  },
});
