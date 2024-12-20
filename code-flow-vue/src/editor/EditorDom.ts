import { State } from "./EditorState";

export class EditorDom {
  containerDom
  editorDom
  viewLinesDom
  gutterDom
  scrollBlankDom
  constructor(state: State) {
    const container = this.createEditorContainer();
    this.containerDom = container
    const gutter = this.createGutterDom();
    this.gutterDom = gutter
    const editor = this.createEditorDom(state);
    this.editorDom = editor
    const viewLines = this.createViewLinesDom(state);
    this.viewLinesDom = viewLines
    const scrollBlankDom = this.createScrollBlankDom(state);
    this.scrollBlankDom = scrollBlankDom
    container.appendChild(gutter);
    container.appendChild(editor);
    editor.appendChild(scrollBlankDom);
    editor.appendChild(viewLines);
  }
  createEditorContainer() {
    const div = document.createElement("div");
    div.style.width = "600px";
    div.style.position = "relative";
    div.setAttribute("id", "editor-container");
    return div;
  }
  createEditorDom(state: State) {
    const div = document.createElement("div");
    div.setAttribute("id", "editor");
    div.style.width = "100%";
    div.style.position = "absolute";
    div.style.overflow = "scroll";
    div.style.border = "1px solid gray";
    div.style.fontFamily = `Menlo, Monaco, "Courier New", monospace`;
    div.style.height = state.lineHeight * state.maxLines + "px";
    div.style.textAlign = "left";
    return div;
  }
  createViewLinesDom(state: State) {
    const div = document.createElement("div");
    div.setAttribute("id", "view-lines");
    div.setAttribute("contenteditable", "true");
    div.style.position = "absolute";
    div.style.height = "100%";
    div.style.width = "100%";
    div.style.outline = 'none'
    div.style.lineHeight = state.lineHeight + 'px'
    div.style.top = state.scrollInfo.scrollTop + "px";
    return div;
  }
  createScrollBlankDom(state: State) {
    const div = document.createElement("div");
    div.style.height = state.editorLines.length * state.lineHeight + "px";
    return div;
  }
  createGutterDom() {
    const div = document.createElement("div");
    div.style.width = "50px";
    div.style.height = '100%'
    div.style.position = 'absolute'
    div.style.left = '-50px'
    div.setAttribute("id", "gutter");
    return div;
  }
}
