
import { getExecString, runExecSync } from "../common/getExecString";
import { registerCommand } from "../common/registerCommond";

registerCommand({
  id: "mm",
  desc: "合并最新的 master 分支",
  hadler: () => {
    const branch = getExecString("git rev-parse --abbrev-ref HEAD");
    runExecSync("git checkout master");
    runExecSync("git pull --rebase");
    runExecSync("git checkout " + branch);
    runExecSync("git merge master");
    const branchFinal = getExecString("git rev-parse --abbrev-ref HEAD");
    console.log("当前分支:", branchFinal);
  },
});