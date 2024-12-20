import { BSTNode } from "../BST/BSTNode";

export function findRightSubTreeMin(node: BSTNode): BSTNode {
  if (!node.right) return node;
  let parent = node;
  const startNode = node.right;
  let leftNode = startNode.left;
  while (true) {
    if (!leftNode || !leftNode.left) break;
    leftNode = leftNode.left;
    parent = leftNode;
  }
  return leftNode || startNode;
}
