import { homedir } from "os";
import { resolve } from "path";
export const COMMOND_CONFIG = {
  vscodeWindowStatusFilePath: resolve(homedir(), "Desktop", ".qirong-vscode-window-status.json"),
};
