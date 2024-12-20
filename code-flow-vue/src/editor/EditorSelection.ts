import { Editor } from ".";
import { IEditorSelection } from "../types";
import { EditorState } from "./EditorState";
export class EditorSelection {
  // span => div
  static rangeToIEditorSelection(
    selection: Selection,
    editor: Editor
  ): IEditorSelection | null {
    if (selection.rangeCount > 1) throw new Error("暂不支持多个选区!");
    const range = selection.getRangeAt(0);
    const startLineDom = getLineDomByRange(range.startContainer);
    const endLineDom = getLineDomByRange(range.endContainer);
    const startIndex = [...editor.editorDom.viewLinesDom.children].findIndex(
      (child) => child === startLineDom
    );
    const endIndex = [...editor.editorDom.viewLinesDom.children].findIndex(
      (child) => child === endLineDom
    );
    if (startIndex === -1 || endIndex === -1 || !startLineDom || !endLineDom) {
      throw new Error("选区更新失败!");
    }
    const startContainer = range.startContainer;
    const endContainer = range.endContainer;
    // chrome bug
    if (
      startContainer instanceof HTMLDivElement ||
      endContainer instanceof HTMLDivElement
    )
      return null;
    if (startIndex <= endIndex) {
      return {
        startLine: editor.state.scrollInfo.startLine + startIndex,
        startOffset: range.startOffset + findTokenOffset(startContainer),
        endLine: editor.state.scrollInfo.startLine + endIndex,
        endOffset: range.endOffset + findTokenOffset(range.endContainer),
      };
    } else {
      return {
        startLine: editor.state.scrollInfo.startLine + endIndex,
        startOffset: range.endOffset + findTokenOffset(range.endContainer),
        endLine: editor.state.scrollInfo.startLine + startIndex,
        endOffset: range.startOffset + findTokenOffset(startContainer),
      };
    }
    function getLineDomByRange(node: Node) {
      let target = node;
      while (true) {
        if (target instanceof HTMLDivElement) return target;
        if (!target.parentElement) return null;
        target = target.parentElement;
      }
    }
    function findTokenOffset(textNode: Node) {
      const lineEL = getLineDomByRange(textNode)!;
      const token = textNode.parentElement;
      let pos = 0;
      for (let i = 0; i < lineEL.children.length; i++) {
        const span = lineEL.children[i];
        if (span === token) {
          return pos;
        }
        pos += span.textContent!.length;
      }
      throw new Error("选区更新出现错误,可能是浏览器的兼容性问题!");
    }
  }
  static setDomSelection(newSel: IEditorSelection, editor: Editor) {
    requestAnimationFrame(() => {
      const selection = window.getSelection();
      const range = document.createRange();
      selection?.removeAllRanges();
      if (!selection) return;
      const [startOffset, startAnchor] = findTokenDom(
        newSel.startLine - editor.state.scrollInfo.startLine,
        newSel.startOffset
      );
      const [endOffset, endAnchor] = findTokenDom(
        newSel.endLine - editor.state.scrollInfo.startLine,
        newSel.endOffset
      );
      range.setStart(startAnchor, startOffset);
      range.setEnd(endAnchor, endOffset);
      selection!.addRange(range);
    });
    function findTokenDom(line: number, offset = 0) {
      const viewLines = editor.editorDom.viewLinesDom;
      const div = viewLines.children[line];
      if (!div) throw new Error("cant find div");
      let span: Element;
      let pos = 0;
      let tokenIndex = 0;
      for (;;) {
        const token = div.children[tokenIndex];
        if (!token) throw new Error("错误的选区:cant find token span");
        pos += token.textContent!.length;
        span = token;
        if (pos >= offset) {
          return [
            offset - (pos - token.textContent!.length),
            span.firstChild,
          ] as [number, Element];
        }
        tokenIndex += 1;
      }
    }
  }

  static nextChar(editor: Editor, sel?: IEditorSelection) {
    sel ||= editor.state.selection;
    const { startLine, startOffset, endLine, endOffset } = sel;
    const text = editor.state.editorLines[startLine].text;
    if (startOffset + 1 > text.length) {
      return {
        startLine: startLine + 1,
        endLine: endLine + 1,
        startOffset: 0,
        endOffset: 0,
      };
    }
    return {
      startLine,
      endLine,
      startOffset: startOffset + 1,
      endOffset: endOffset + 1,
    };
  }
  static nextChars(step: number) {
    return (editor: Editor, sel?: IEditorSelection) => {
      return new Array(step).fill(nextCharfix).reduce(
        (pre, fn) => {
          return fn(pre.editor, pre.selection);
        },
        { editor, selection: sel }
      ).selection;
    };
    function nextCharfix(editor: Editor, sel: IEditorSelection) {
      return {
        editor: editor,
        selection: EditorSelection.nextChar(editor, sel),
      };
    }
  }
  static endAt(editor: Editor, at = 0): IEditorSelection {
    return {
      startLine: at,
      endLine: at,
      startOffset: EditorState.getLineTextAt(editor, at).length,
      endOffset: EditorState.getLineTextAt(editor, at).length,
    };
  }
  // 下一个选区,跳过空字符
  static nextLineCharsWithout(editor: Editor) {
    const startLine = editor.state.selection.startLine + 1;
    const blankCount =
      /^\s+/g.exec(EditorState.getLineAt(editor, startLine).text)?.[0].length ||
      0;
    // 按下enter之后,因为splite,需要加1才能找到下一行
    return EditorSelection.nextChars(blankCount + 1);
  }
  static startAt(editor: Editor, at?: number): IEditorSelection {
    at ||= editor.state.selection.startLine;
    return {
      startLine: at,
      endLine: at,
      startOffset: 0,
      endOffset: 0,
    };
  }
  static preChar(editor: Editor, sel?: IEditorSelection): IEditorSelection {
    sel ||= editor.state.selection;
    if (sel.startOffset === 0) {
      return {
        startLine: sel.startLine - 1,
        endLine: sel.endLine - 1,
        startOffset: EditorState.getLineTextAt(editor, sel.startLine - 1)
          .length,
        endOffset: EditorState.getLineTextAt(editor, sel.startLine - 1).length,
      };
    }
    return {
      startLine: sel.startLine,
      endLine: sel.endLine,
      startOffset: sel.startOffset - 1,
      endOffset: sel.endOffset - 1,
    };
  }
  static eq(s1: IEditorSelection, s2: IEditorSelection) {
    return (
      s1.startLine === s2.startLine &&
      s1.endLine === s2.endLine &&
      s1.startOffset === s2.startOffset &&
      s1.endOffset === s2.endOffset
    );
  }
}
