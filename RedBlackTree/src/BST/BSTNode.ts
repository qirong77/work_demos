import { isLeftNode } from "../utils/isLeftNode";

export class BSTNode {
  public parent: BSTNode | undefined = undefined;
  public value: number;
  public left: BSTNode | undefined;
  public right: BSTNode | undefined;
  constructor(vlaue: number) {
    this.value = vlaue;
  }
  free() {
    if (!this.parent) throw new Error("当前节点没有父节点,不可删除");
    if (this.left || this.right) throw new Error("要删除的节点不是叶子节点");
    this.parent.left === this
      ? (this.parent.left = undefined)
      : (this.parent.right = undefined);
  }
  break() {
    if (!this.parent) throw new Error("不可在根节点进行break");
    isLeftNode(this)
      ? (this.parent.left = undefined)
      : (this.parent.right = undefined);
    this.parent = undefined;
    return this;
  }
  isLeaf() {
    return !this.left && !this.right
  }
}
