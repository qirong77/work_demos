import { Editor } from ".";

import { IEditorSelection, IEditorLine } from "../types";

export class EditorState {
  static getLineAt(editor: Editor, at: number) {
    return editor.state.editorLines[at];
  }
  static getLineTextAt(editor: Editor, at: number) {
    return editor.state.editorLines[at]?.text || "";
  }
  static getLineTextBefore(editor: Editor, at?: number, offset?: number) {
    at ||= editor.state.selection.startLine;
    offset ||= editor.state.selection.startOffset;
    return editor.state.editorLines[at]?.text.slice(0, offset) || "";
  }
  static getLineTextAft(editor: Editor, at?: number, offset?: number) {
    at ||= editor.state.selection.startLine;
    offset ||= editor.state.selection.startOffset;
    return editor.state.editorLines[at]?.text.slice(offset) || "";
  }
  static textToEditorLine(text: string) {
    return text.split("\n").map((t) => ({
      text: t,
    }));
  }
  static getViewLines(state: State) {
    return state.editorLines.slice(
      state.scrollInfo.startLine,
      state.scrollInfo.startLine + 20
    );
  }
  static spliteLine(editor: Editor) {
    const { startLine } = editor.state.selection;
    const { editorLines } = editor.state;
    const textBefore = EditorState.getLineTextBefore(editor);
    const textAfter = EditorState.getLineTextAft(editor);
    const text = EditorState.getLineTextAt(editor, startLine);
    editorLines[startLine].text = textBefore;
    const newLines: IEditorLine[] = [];
    const indentAction = editor.languageService?.onEnterSupport.onEnter(
      3,
      startLine === 1 ? "" : EditorState.getLineTextAt(editor, startLine - 1),
      textBefore,
      textAfter
    );
    const indent = indentAction?.indentAction === 1 ? 1 : 0;
    const basicIndent = /^\s+/g.exec(text)?.[0].length || 0;
    // 按下enter之后会新增一行
    newLines.push({
      text:
        " ".repeat(
          basicIndent + indent * (editor.languageService?.indentUnit || 0)
        ) + textAfter,
    });
    // 如果当前行没有内容,就清空
    if (!EditorState.getLineTextAt(editor, startLine).trim()) {
      editorLines[startLine].text = "";
    }
    editorLines.splice(startLine + 1, 0, ...newLines);
    return editorLines;
  }
  static deleteLine(editor: Editor) {
    const { editorLines } = editor.state;
    const at = editor.state.selection.startLine;
    const textAfter = EditorState.getLineTextAft(editor);
    if (textAfter) {
      editorLines[at - 1].text = editorLines[at - 1].text + textAfter;
    }
    editorLines.splice(editor.state.selection.startLine, 1);
    return editorLines;
  }

  static updateLine(editor: Editor, text = "") {
    editor.state.editorLines[editor.state.selection.startLine].text = text;
    return editor.state.editorLines;
  }
  static create(config: { doc: string }): State {
    const editorLines = EditorState.textToEditorLine(config.doc);
    const viewLines = editorLines.slice(0, 20);
    return {
      ...basicState,
      editorLines,
      viewLines,
    };
  }
  static update(
    state: State,
    statePartial: Partial<State>,
    callback = (s: State) => s
  ): State {
    const newState = Object.assign(state, statePartial);
    newState.viewLines = EditorState.getViewLines(newState);
    // 卡顿差距明显
    // return callback(newState)
    return JSON.parse(JSON.stringify(callback(newState)));
  }
}
var basicState: State = {
  lineHeight: 20,
  maxLines: 20,
  selection: {
    startLine: 0,
    endLine: 0,
    startOffset: 0,
    endOffset: 0,
  },
  nativeSelection: {
    startLine: 0,
    endLine: 0,
    startOffset: 0,
    endOffset: 0,
  },
  editorLines: [],
  viewLines: [],
  scrollInfo: {
    scrollTop: 0,
    startLine: 0,
  },
};
export interface State {
  lineHeight: number;
  maxLines: number;
  selection: IEditorSelection;
  editorLines: IEditorLine[];
  viewLines: IEditorLine[];
  scrollInfo: {
    scrollTop: number;
    startLine: number;
  };
  nativeSelection: IEditorSelection;
}
