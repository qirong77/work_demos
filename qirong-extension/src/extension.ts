import * as vscode from "vscode";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { CONFIG } from "./common/config";
import { debounce } from "./common/debounce";
// 只在一个函数进行文件操作,防止冲突!
const debouceUpdateWindowStatusFile = debounce(updateWindowStatusFile, 1000);
export function activate(context: vscode.ExtensionContext) {
    vscode.window.onDidChangeActiveTextEditor(debouceUpdateWindowStatusFile);
}

function updateWindowStatusFile() {
    const activeTab = vscode.window.activeTextEditor?.document.uri.path || "";
    const workspace = vscode.workspace.workspaceFolders?.[0].uri.path || "";
    const hasData = existsSync(CONFIG.path);
    if (!activate || !workspace) return;
    try {
        if (!hasData) {
            writeFileSync(CONFIG.path, "{}", "utf-8");
        }
        const data = JSON.parse(readFileSync(CONFIG.path, "utf-8"));
        data.activeTab = activeTab;
        data[workspace] = activeTab;
        // vscode.window.showInformationMessage(`更新windowStatus${activeTab}`);
        writeFileSync(CONFIG.path, JSON.stringify(data));
    } catch (error) {
        vscode.window.showInformationMessage(`qirong-extension出错: ${error}`);
        writeFileSync(CONFIG.path, "{}", "utf-8");
    }
    vscode.window.showInformationMessage(`更新windowStatus${workspace + "\n" + activeTab}`);
}
