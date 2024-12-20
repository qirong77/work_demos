import { Editor } from ".";
import { IEditorSelection } from "../types";
import { EditorSelection } from "./EditorSelection";

export const selectionAddon = (editor: Editor) => {
  let nativeSelection: IEditorSelection = {
    startLine: 0,
    endLine: 0,
    startOffset: 0,
    endOffset: 0,
  };
  document.addEventListener("selectionchange", () => {
    const range = window.getSelection();
    if (
      !range ||
      document.activeElement !== editor.editorDom.viewLinesDom ||
      range.anchorNode instanceof HTMLDivElement
    )
      return;
    const newSel = EditorSelection.rangeToIEditorSelection(range, editor);
    if (newSel) {
      nativeSelection = newSel;
      editor.applyChange({ selection: newSel });
    }
  });
  function getNativeSel() {
    return nativeSelection
  }
  editor.addUpdate(() => {
    if (!EditorSelection.eq(getNativeSel(), editor.state.selection)) {
      EditorSelection.setDomSelection(editor.state.selection, editor);
    }
  });
  return editor;
};
