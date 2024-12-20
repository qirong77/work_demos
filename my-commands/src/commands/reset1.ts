import { runExecSync } from "../common/getExecString";
import { registerCommand } from "../common/registerCommond";

registerCommand({
  id: "reset1",
  desc: "将上一次的commit进行回退,并保存在工作区中:git reset HEAD~1",
  hadler: () => {
    runExecSync("git reset HEAD~1");
  },
});
