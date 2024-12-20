import { EditorState, State } from "./EditorState";
import { EditorConfig, IEditorSelection, ILanguageService } from "../types";
import { EditorDom } from "./EditorDom";
import { inputAddon } from "./InputAddon";
import { selectionAddon } from "./selectionAddon";
import { scrollAddon } from "./scrollAddon";
import { languageAddon } from "./languageAddon";

export class Editor {
  readonly editorDom;
  private _state: State;
  private onDidUpdates: Function[] = [];
  public languageService: ILanguageService | null = null;
  constructor(config: EditorConfig) {
    this._state = EditorState.create({
      doc: config.doc || "function",
    });
    if (config.onUpdate) this.onDidUpdates.push(config.onUpdate);
    this.editorDom = new EditorDom(this.state);
    document.querySelector("#app")!.appendChild(this.editorDom.containerDom);
    this.use(selectionAddon)
      .use(inputAddon)
      .use(scrollAddon)
      .use(languageAddon(config.language || "python"));
  }
  get state() {
    return this._state;
  }
  set state(_value) {
    throw new Error("state无法被直接修改!");
  }
  // 有时候选区的计算需要等到state更新后,比如输入,所以这里使用回调函数的形式
  applyChange(
    statePartial: Partial<State>,
    selCallback?: (e: Editor) => IEditorSelection
  ) {
    this._state = EditorState.update(this.state, statePartial, (newState) => {
      if (selCallback) {
        return EditorState.update(newState, {
          selection: selCallback(this),
        });
      }
      return newState;
    });
    for (let i = 0; i < this.onDidUpdates.length; i++) {
      this.onDidUpdates[i](this);
    }
  }
  addUpdate(update: (editor: Editor) => void) {
    this.onDidUpdates.push(update);
  }
  use(addon: (e: Editor) => Editor) {
    addon(this);
    return this;
  }
}
