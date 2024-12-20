import { getExecString, runExecSync } from "../common/getExecString";
import { registerCommand } from "../common/registerCommond";

registerCommand({
  id: "mc",
  desc: "合并rc分支,并推送到远程",
  hadler: () => {
    mergeBranch();
  },
});
registerCommand({
  id: "mp",
  desc: "合并pre分支,并推送到远程",
  hadler: () => {
    mergeBranch("pre");
  },
});

function mergeBranch(barnch = "deploy/__rc__") {
  const branch = getExecString("git rev-parse --abbrev-ref HEAD");
  runExecSync("git checkout " + barnch);
  runExecSync("git pull --rebase");
  runExecSync("git merge " + branch);
  runExecSync("git push");
  runExecSync("git checkout " + branch);
  const branchFinal = getExecString("git rev-parse --abbrev-ref HEAD");
  console.log("当前分支:", branchFinal);
}
