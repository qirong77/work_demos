import { homedir } from "os";
import { resolve } from "path";
export const CONFIG = {
  path: resolve(homedir(), "Desktop", ".qirong-vscode-window-status.json"),
};
