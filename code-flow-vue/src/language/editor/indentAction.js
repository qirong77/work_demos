export var IndentAction;
(function (IndentAction) {
    /**
     * Insert new line and copy the previous line's indentation.
     * None：插入新行时不进行缩进，即新行的缩进与前一行相同。
     */
    IndentAction[IndentAction["None"] = 0] = "None";
    /**
     * Insert new line and indent once (relative to the previous line's indentation).
     * 插入新行时进行一次缩进，相对于前一行的缩进。
     */
    IndentAction[IndentAction["Indent"] = 1] = "Indent";
    /**
     * Insert two new lines:
     *  - the first one indented which will hold the cursor
     *  - the second one at the same indentation level
     *   IndentOutdent：插入两个新行：{ | }
     *   第一行进行缩进，并设置光标位置在该行。
     *   第二行与第一行具有相同的缩进级别。
     *   Outdent：插入新行时进行一次反缩进，相对于前一行的缩进。
     */
    IndentAction[IndentAction["IndentOutdent"] = 2] = "IndentOutdent";
    /**
     * Insert new line and outdent once (relative to the previous line's indentation).
     */
    IndentAction[IndentAction["Outdent"] = 3] = "Outdent";
})(IndentAction || (IndentAction = {}));
