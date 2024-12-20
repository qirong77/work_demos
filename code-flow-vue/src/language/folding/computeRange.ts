const foldingRangesLimitDefault = {
  limit: 5000,
  update: () => {},
};
export function computeRanges(
  model: TextModel,
  offSide = undefined,
  markers:
    | {
        start: RegExp;
        end: RegExp;
      }
    | undefined,
  foldingRangesLimit = foldingRangesLimitDefault
) {
  const tabSize = 4;
  const result = new RangesCollector(foldingRangesLimit);
  let pattern = undefined;
  if (markers) {
    pattern = new RegExp(`(${markers.start.source})|(?:${markers.end.source})`);
  }
  const previousRegions: {
    endAbove: number;
    indent: number;
    line: number;
  }[] = [];
  const line = model.getLineCount() + 1;
  previousRegions.push({ indent: -1, endAbove: line, line }); // sentinel, to make sure there's at least one entry
  for (let line = model.getLineCount(); line > 0; line--) {
    const lineContent = model.getLineContent(line);
    const indent = computeIndentLevel(lineContent, tabSize);
    let previous = previousRegions[previousRegions.length - 1];
    if (indent === -1) {
      if (offSide) {
        // for offSide languages, empty lines are associated to the previous block
        // note: the next block is already written to the results, so this only
        // impacts the end position of the block before
        previous.endAbove = line;
      }
      continue; // only whitespace
    }
    let m;
    if (pattern && (m = lineContent.match(pattern))) {
      // folding pattern match
      if (m[1]) {
        // start pattern match
        // discard all regions until the folding pattern
        let i = previousRegions.length - 1;
        while (i > 0 && previousRegions[i].indent !== -2) {
          i--;
        }
        if (i > 0) {
          previousRegions.length = i + 1;
          previous = previousRegions[i];
          // new folding range from pattern, includes the end line
          result.insertFirst(line, previous.line, indent);
          previous.line = line;
          previous.indent = indent;
          previous.endAbove = line;
          continue;
        } else {
          // no end marker found, treat line as a regular line
        }
      } else {
        // end pattern match
        previousRegions.push({ indent: -2, endAbove: line, line });
        continue;
      }
    }
    if (previous.indent > indent) {
      // discard all regions with larger indent
      do {
        previousRegions.pop();
        previous = previousRegions[previousRegions.length - 1];
      } while (previous.indent > indent);
      // new folding range
      const endLineNumber = previous.endAbove - 1;
      if (endLineNumber - line >= 1) {
        // needs at east size 1
        result.insertFirst(line, endLineNumber, indent);
        debugger;
      }
    }
    if (previous.indent === indent) {
      previous.endAbove = line;
    } else {
      // previous.indent < indent
      // new region with a bigger indent
      previousRegions.push({ indent, endAbove: line, line });
    }
  }
  return result;
}
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Returns:
 *  - -1 => the line consists of whitespace
 *  - otherwise => the indent level is returned value
 */
function computeIndentLevel(line = "", tabSize = 4) {
  let indent = 0;
  let i = 0;
  const len = line.length;
  while (i < len) {
    const chCode = line.charCodeAt(i);
    if (chCode === 32 /* CharCode.Space */) {
      indent++;
    } else if (chCode === 9 /* CharCode.Tab */) {
      indent = indent - (indent % tabSize) + tabSize;
    } else {
      break;
    }
    i++;
  }
  if (i === len) {
    return -1; // line only consists of whitespace
  }
  return indent;
}

class RangesCollector {
  _startIndexes: number[];
  _length;
  _endIndexes: number[];
  _indentOccurrences: any;
  _foldingRangesLimit: typeof foldingRangesLimitDefault;
  constructor(foldingRangesLimit: typeof foldingRangesLimitDefault) {
    this._startIndexes = [];
    this._endIndexes = [];
    this._indentOccurrences = [];
    this._length = 0;
    this._foldingRangesLimit = foldingRangesLimit;
  }
  insertFirst(startLineNumber: number, endLineNumber: number, indent: number) {
    const index = this._length;
    this._startIndexes[index] = startLineNumber;
    this._endIndexes[index] = endLineNumber;
    this._length++;
    if (indent < 1000) {
      this._indentOccurrences[indent] =
        (this._indentOccurrences[indent] || 0) + 1;
    }
  }
}

class TextModel {
  lines: string[] = [];
  constructor(str = "") {
    this.lines = str.split("\n");
  }
  getLineCount() {
    return this.lines.length;
  }
  getLineContent(idx: number) {
    return this.lines[idx - 1];
  }
  getLines() {
    return this.lines;
  }
}
