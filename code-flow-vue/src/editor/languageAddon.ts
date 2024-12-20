import { Editor } from ".";
import { OnEnterSupport } from "../language/onEnter/onEnterSupport";

export const languageAddon = (lang: string) => {
  return (editor: Editor) => {
    editor.languageService = {
      indentUnit: 4,
      onEnterSupport: new OnEnterSupport(lang),
    };
    return editor;
  };
};

