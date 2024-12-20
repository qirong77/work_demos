import { Editor } from ".";
import { INPUT_TYPE } from "../types";
import { EditorAction } from "./EditorAction";

export const inputAddon = (editor: Editor) => {
  editor.editorDom.editorDom.addEventListener("beforeinput", (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    switch (e.inputType) {
      case INPUT_TYPE.INSERT_TEXT: {
        EditorAction.input(editor, e.data);
        break;
      }
      case INPUT_TYPE.DELETE_WORD_BREAK: {
        break;
      }
      case INPUT_TYPE.INSERT_PARAGRAPH: {
        EditorAction.enter(editor);
        break;
      }
      case INPUT_TYPE.INSERT_LINE_BREAN: {
        EditorAction.enter(editor);
        break;
      }
      case INPUT_TYPE.DELETE_CONTENT_BACKWARD: {
        EditorAction.deleteChar(editor);
        break;
      }
      case INPUT_TYPE.DELETE_SOFT_LINE_BACKWARD: {
        EditorAction.deleteLine(editor);
        break;
      }
    }
  });
  return editor
};
