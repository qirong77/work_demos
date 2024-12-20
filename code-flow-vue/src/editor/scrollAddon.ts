import { Editor } from ".";

export const scrollAddon = (editor: Editor) => {
  editor.editorDom.editorDom.addEventListener("scroll", (e) => {
    const { scrollTop } = e.target as any;
    const scrollInfo = {
      startLine: parseInt((scrollTop / 20) as any),
      scrollTop,
    };
    editor.editorDom.viewLinesDom.style.top = scrollTop + "px";
    editor.applyChange({
      scrollInfo,
    });
  });
  editor.addUpdate(()=>{
    editor.editorDom.scrollBlankDom.style.height =
    editor.state.editorLines.length * editor.state.lineHeight + "px";
  })
  return editor
};
