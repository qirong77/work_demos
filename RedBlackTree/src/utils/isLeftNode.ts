import { BSTNode } from "../BST/BSTNode";
import { RBTNode } from "../RBT/RBTNode";

export const isLeftNode = (node: BSTNode | RBTNode) => {
  if (!node.parent) throw new Error("无法找到父节点");
  return node.parent.left === node;
};
