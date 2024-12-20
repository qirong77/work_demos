import { BSTNode } from "./BSTNode";

export const insertBSTNode = (
  node: BSTNode | undefined,
  target: number,
  parent: BSTNode | undefined
): BSTNode => {
  if (!node) {
    const newNode = new BSTNode(target);
    if (!parent) {
      console.log("插入根节点");
      node = newNode;
    } else {
      newNode.parent = parent;
      parent.value > target
        ? (parent.left = newNode)
        : (parent.right = newNode);
    }
    return newNode;
  }
  if (node.value > target) return insertBSTNode(node.left, target, node);
  else return insertBSTNode(node.right, target, node);
};
