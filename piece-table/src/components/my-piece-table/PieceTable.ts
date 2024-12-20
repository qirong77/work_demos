enum SourceType {
    ORIGIN = "origin",
    ADD = "add",
  }
  
  export interface Piece {
    source: SourceType;
    start: number;
    length: number;
  }
  
  export class PieceTable {
    readonly originBuffer: string;
    addBuffer: string;
    piecesTable: Piece[];
    _sequenceOffsetToPieceIndexAndBufferOffset:number[] = []
    constructor(defaultText = "") {
      this.originBuffer = defaultText;
      this.addBuffer = "";
      this.piecesTable = [
        {
          source: SourceType.ORIGIN,
          start: 0,
          length: defaultText.length,
        },
      ];
    }
  /* 
  最后获取结果数组的时候,就是从头到底遍历每一个piece的
  */
    sequenceOffsetToPieceIndexAndBufferOffset = (offset: number) => {
      let remainingOffset = offset;
      for (let i = 0; i < this.piecesTable.length; i++) {
        const pieces = this.piecesTable[i];
        if (remainingOffset <= pieces.length) {
          console.log('<-')
          this._sequenceOffsetToPieceIndexAndBufferOffset = [i,remainingOffset]
          return [i, remainingOffset];
        }
        remainingOffset -= pieces.length;
      }
      throw new Error("offset 超出范围");
    };
  
    public insert = (str: string, offset: number) => {
      if (str.length === 0) {
        throw new Error("字符串不能为空");
      }
      const addBufferLength = this.addBuffer.length;
      this.addBuffer += str;
      const [pieceIndex, relativeBufferOffset] =
        this.sequenceOffsetToPieceIndexAndBufferOffset(offset);
      // 如果片段指向添加缓冲区的末尾，并且我们在其末尾插入，只需增加其长度
      const originPiece = this.piecesTable[pieceIndex];
      if (
        originPiece.source === SourceType.ADD &&
        relativeBufferOffset === originPiece.length &&
        addBufferLength == originPiece.start + originPiece.length
      ) {
        originPiece.length += str.length;
        return;
      }
  // 如果当前要插入的位置的指针指向
      const insertPieces: Piece[] = [
        {
          source: originPiece.source,
          start: originPiece.start,
          length: relativeBufferOffset,
        },
        {
          source: SourceType.ADD,
          start: addBufferLength,
          length: str.length,
        },
        {
          source: originPiece.source,
          start: originPiece.start + relativeBufferOffset,
          length: originPiece.length - relativeBufferOffset,
        },
      ].filter((item) => !!item.length);
      this.piecesTable.splice(pieceIndex, 1, ...insertPieces);
    };
  
    public delete = (offset: number, count: number) => {
      if (offset < 0) {
        throw new Error("offset 超出范围");
      }
      if (count <= 0) {
        throw new Error("count 参数错误, 不能删除小于等于0个");
      }
      const [initialAffectedPieceIndex, initialRelativeBufferOffset] =
        this.sequenceOffsetToPieceIndexAndBufferOffset(offset);
      const [finalAffectedPieceIndex, finalRelativeBufferOffset] =
        this.sequenceOffsetToPieceIndexAndBufferOffset(offset + count);
  
      // 如果删除发生在某一个片段的末尾或开头，只需调整长度即可
      if (initialAffectedPieceIndex === finalAffectedPieceIndex) {
        const piece = this.piecesTable[initialAffectedPieceIndex];
        // 从某一个片段的开头开始删除 count 个，并且 count 不会超过这个片段的长度
        if (initialRelativeBufferOffset === 0) {
          piece.start += count;
          piece.length -= count;
          return;
        }
        // 从某一个片段的某一个位置开始删除 count 个，并且 count 不会超过这个片段的长度
        else if (finalRelativeBufferOffset === piece.length) {
          piece.length -= count;
          return;
        }
      }
      const initialPiece = this.piecesTable[initialAffectedPieceIndex];
      const finalPiece = this.piecesTable[finalAffectedPieceIndex];
  
      const insertPieces: Piece[] = [
        {
          source: initialPiece.source,
          length: initialRelativeBufferOffset,
          start: initialPiece.start,
        },
        {
          source: finalPiece.source,
          length: finalPiece.length - finalRelativeBufferOffset,
          start: finalPiece.start + finalRelativeBufferOffset,
        },
      ].filter((item) => !!item.length);
  
      this.piecesTable.splice(
        initialAffectedPieceIndex,
        finalAffectedPieceIndex - initialAffectedPieceIndex + 1,
        ...insertPieces
      );
    };
  
    public getSequence = () => {
      let str = "";
      for (let i = 0; i < this.piecesTable.length; i++) {
        const pieces = this.piecesTable[i];
        const sourceStr =
          pieces.source === SourceType.ADD ? this.addBuffer : this.originBuffer;
        str += sourceStr.substring(pieces.start, pieces.start + pieces.length);
      }
      return str;
    };
  }
  
  // const doc = new PieceTable('123');
  // debugger
  // doc.insert('456', 3);
  
  // doc.delete(2, 1);
  // const sequence = doc.getSequence();
  // // sequence === '12456'
  // console.log(sequence)
  