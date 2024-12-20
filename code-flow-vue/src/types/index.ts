import { OnEnterSupport } from "../language/onEnter/onEnterSupport";
import {monarchs} from '../language/basicLanguages/index'

export interface IEditorSelection {
  startLine: number;
  startOffset: number;
  endLine: number;
  endOffset: number;
}
export interface IEditorLine {
  text: string;
}
export type Attrs = { [name: string]: string };
export enum INPUT_TYPE {
  // 单行输入
  INSERT_TEXT = "insertText",
  // 回车键
  INSERT_PARAGRAPH = "insertParagraph",
  // 单个delete键
  DELETE_CONTENT_BACKWARD = "deleteContentBackward",
  // commend + delete
  DELETE_SOFT_LINE_BACKWARD = "deleteSoftLineBackward",
  INSERT_LINE_BREAN = "insertLineBreak",
  DELETE_WORD_BREAK = "deleteWordBackward",
}
export type Change = {
  type: INPUT_TYPE;
  selection: IEditorSelection;
  text?: string;
};

export type EditorConfig = {
  onUpdate?: Function;
  doc?: string;
  language?: keyof typeof monarchs;
};
export type ILanguageService = {
  indentUnit: number;
  onEnterSupport: OnEnterSupport
};
