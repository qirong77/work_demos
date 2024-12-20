import { Editor } from ".";
import { EditorState } from "./EditorState";
import { EditorSelection } from "./EditorSelection";

export class EditorAction {
  static input(editor: Editor, char = "") {
    const { startLine, startOffset, endOffset } = editor.state.selection;
    const textBefore = EditorState.getLineTextAt(editor, startLine).slice(
      0,
      startOffset
    );
    const textAft = EditorState.getLineTextAt(editor, startLine).slice(
      endOffset
    );
    const rightBracket = "";
    const newText = textBefore + char + rightBracket + textAft;
    editor.applyChange(
      {
        editorLines: EditorState.updateLine(editor, newText),
      },
      EditorSelection.nextChar
    );
  }
  static deleteChar(editor: Editor) {
    const { startLine } = editor.state.selection;
    const textBefore = EditorState.getLineTextBefore(editor);
    const textAft = EditorState.getLineTextAft(editor);
    const newText = textBefore.slice(0, -1) + textAft;
    if (textBefore) {
      editor.applyChange(
        {
          editorLines: EditorState.updateLine(editor, newText),
        },
        EditorSelection.preChar
      );
      return;
    }
    if (startLine === 0) return;
    editor.applyChange({
      editorLines: EditorState.deleteLine(editor),
      selection: EditorSelection.preChar(editor),
    });
  }
  static enter(editor: Editor) {
    editor.applyChange({
      editorLines: EditorState.spliteLine(editor),
    },EditorSelection.nextLineCharsWithout(editor));
  }
  // commend + enter
  static deleteLine(editor: Editor) {
    if (
      !EditorState.getLineTextBefore(editor)
        .length
    ) {
      editor.applyChange({
        editorLines: EditorState.deleteLine(editor),
        selection: EditorSelection.preChar(editor),
      });
    } else {
      const { startLine, endOffset } = editor.state.selection;
      const startCodeLine = editor.state.editorLines[startLine];
      const textAft = startCodeLine.text.slice(endOffset);
      editor.applyChange(
        {
          editorLines: EditorState.updateLine(editor,textAft)
        },
        EditorSelection.startAt
      );
    }
  }
}
