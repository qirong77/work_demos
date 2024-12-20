import { isLeftNode } from "../utils/isLeftNode";

export enum NODE_COLOR {
  BLACK = "black",
  RED = "red",
}
export class RBTNode {
  public color: NODE_COLOR = NODE_COLOR.BLACK;
  public parent: RBTNode | undefined;
  public left: RBTNode | NilNode = new NilNode(this);
  public right: RBTNode | NilNode = new NilNode(this);
  public value: number;
  constructor(value: number) {
    this.value = value;
    this.color = NODE_COLOR.RED
    this.left = new NilNode(this)
    this.right = new NilNode(this)

  }
  public isNilNode(): false {
    return false;
  }
  public setBlack(): void {
    this.color = NODE_COLOR.BLACK;
  }
  public setRed(): void {
    this.color = NODE_COLOR.RED;
  }
  public isRed() {
    return this.color === NODE_COLOR.RED;
  }
  public isBlack() {
    return this.color === NODE_COLOR.BLACK;
  }
  public getBrotherNode() {
    const parent = this.parent
    if(!parent) throw new Error('没有兄弟节点')
    return isLeftNode(this) ? parent.right : parent.left
  }
}

export class NilNode {
  public color = NODE_COLOR.BLACK;
  public parent: undefined | RBTNode;
  public isNilNode(): true {
    return true;
  }
  constructor(parent: RBTNode) {
    this.parent = parent;
  }
}
